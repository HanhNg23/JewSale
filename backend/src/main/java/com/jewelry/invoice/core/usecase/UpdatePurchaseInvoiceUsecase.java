package com.jewelry.invoice.core.usecase;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.service.IAccountService;
import com.jewelry.common.constant.DomainConstant;
import com.jewelry.common.constant.PaymentMethod;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.constant.TransactionType;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.exception.InvoiceException;
import com.jewelry.invoice.core.repository.InvoiceItemRepository;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.invoice.core.service.IInvoiceService;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.payment.PaymentService;
import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.repository.GemstoneRepository;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.service.ProductService;
import com.jewelry.promotion.core.domain.PromotionCode;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@Transactional
@AllArgsConstructor
public class UpdatePurchaseInvoiceUsecase extends UseCase<UpdatePurchaseInvoiceUsecase.InputValues, UpdatePurchaseInvoiceUsecase.OutputValues>{

	private PaymentService paymentService;
	private IAccountService accountService;
	private ProductService productService;
	private InvoiceRepository invoiceRepo;
	private InvoiceItemRepository invoiceItemRepository;
	private IInvoiceService invoiceService;
	private ProductMaterialRepository productMaterialRepo;
	private MetalTypeRepository metalTypeRepo;
	private GemstoneRepository gemstoneRepo;
	private MetalPriceRateRepository metalPriceRateRepo;
	

	@Value
	public static class InputValues implements UseCase.InputValues {
		private final int invoiceId;
		private final Invoice invoice;
		private final List<InvoiceItem> invoiceItems;                                                                                                                 
		private final List<PromotionCode> promotions;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final Invoice invoice;
	}

	@Override
	public OutputValues execute(InputValues input) {
		//check role access : STAFF, ADMIN
		if(input.getInvoice().getTransactionClerk() == null) {
			throw new InvoiceException("The current transaction clerk account is null !");
		}
		//check the id 
		if(input.getInvoice().getInvoiceId() != input.invoiceId) {
			throw new InvoiceException("Invoice id is not match to input id !");
		}
		
		//check conditions allow to update
		this.checkAllowToUpdate(input.getInvoice());

		Invoice invoice = input.getInvoice();
		Invoice invoiceOriginal = invoiceRepo.getInvoiceById(input.getInvoiceId()).orElse(null);
		
		//review customer account and previous customer account
		Account origianlCustomerAccount = accountService.getCustomerAccountByPhonenumberAndFullname(invoiceOriginal.getCustomerPhone(), invoiceOriginal.getCustomerName());
		//Check the original account has been store in any invoice transaction if not remove that stored account
		List<Invoice> customerInvoices = invoiceRepo.getInvoicesByCustomerId(origianlCustomerAccount.getAccountId());
		System.out.println("SIZE   ==== Customer Invoices: " + customerInvoices.size());
		if(customerInvoices == null || customerInvoices.isEmpty()) {
			accountService.deleteCustomerAccount(origianlCustomerAccount);
		}else if(customerInvoices.size() == 1 && customerInvoices.stream().findFirst().get().getInvoiceId().equals(invoiceOriginal.getInvoiceId()))
			accountService.deleteCustomerAccount(origianlCustomerAccount);	
		
		Account customerAccount = invoiceService.createCustomerAccountIfNotExistAndGetAccount(
								    invoice.getCustomer().getPhonenumber(),
									invoice.getCustomer().getFullname());// check if customer has existed
		invoice.setCustomer(customerAccount);
		invoice.setCustomerId(customerAccount.getAccountId());

		//validate product
		List<InvoiceItem> invoiceItems = this.checkValidInvoiceItemPurchase(invoiceOriginal, input.getInvoiceItems());
		invoice.setInvoiceItems(invoiceItems);

		//calculate the invoice total payment
		invoice = invoiceService.calculatInvoicePaymentPurchase(invoice);

		invoice.setStatus(TransactionStatus.PENDING_PAYMENT);
		invoice.setUpdatedAt(LocalDateTime.now());
		invoice.setTransactionDate(LocalDateTime.now());

		// review payment if has been created
		if (invoiceOriginal.getPaymentDetailsId() != null) {
			try {
				paymentService.cancelPaymentByInovoiceId(invoiceOriginal.getPaymentDetailsId());
			} catch (Exception e) {
			}
		}

		// check the payment method is in range
		if (PaymentMethod.valueOf(PaymentMethod.class, invoice.getPaymentMethod().name()) == null) {
			throw new InvoiceException("The payment method is not valid");
		}

		Invoice savedInvoice = null;
		try {
			savedInvoice = invoiceRepo.saveInvoice(invoice);
		} catch (Exception e) {
			e.printStackTrace();
			throw new InvoiceException(e.getMessage());
		}

		return new OutputValues(savedInvoice);
	}

	

	private List<InvoiceItem> checkValidInvoiceItemPurchase(Invoice invoiceOriginal, List<InvoiceItem> itemsBuyBack) {

		// Check product has been bought in this store
		// Check item product buy back is really belong to the involved invoice sell id
		// Check if the component buy is in the one of product materials or the whole
		// product
		// Check if the component buy && product && invoice sell id has been bought in
		// any InvoicePurchase
		// where the invoice buy back item has the invoice sell id is the same
		// Satisfy all the prerequisite above --> allow to buy back product component

		// Get all the invoice sellIds that the invoice items buy back input contain
		Set<Integer> invoiceSellIdsCollectionFrItemsBuyBack = itemsBuyBack.parallelStream().distinct()
				.map(x -> x.getInvoiceSellId()).collect(Collectors.toSet());
		// Get all the invoice sell items where the invoice is transaction sell and
		// invoiceId is in the set of invoiceSellIdsCollectionFrItemsBuyBack
		List<InvoiceItem> invoiceItemsOrigin = invoiceItemRepository
				.getAllInvoiceItemsByInvoiceIdsSet(invoiceSellIdsCollectionFrItemsBuyBack);
		// Get all the product involve to each the invoice item which belong to the
		// invoice transaction sell and the invoiceId is in the set
		// invoiceSellIdsCollectionFrItemsBuyBack
		List<Product> productsCanBuyBack = invoiceItemsOrigin.stream().map(x -> x.getProduct()).distinct()
				.collect(Collectors.toList());
		// Get all the invoice buy back items where the invoice is transaction purchase
		// and invoice sell id is in the set invoiceSellIdsCollectionFrItemsBuyBack
		List<InvoiceItem> invoiceItemsHasBeenBuyBack = invoiceItemRepository
				.getAllInvoiceItemsByInvoiceSellIdsSet(invoiceSellIdsCollectionFrItemsBuyBack).parallelStream().filter(x -> x.getInvoiceId() != invoiceOriginal.getInvoiceId()).toList();

		productsCanBuyBack.parallelStream().forEach(product -> {
			List<ProductMaterial> productMaterial = productMaterialRepo
					.getAllProductMaterialsByProductId(product.getProductId());
			productMaterial.parallelStream().forEach(mate -> {
				if (mate.isMetal()) {
					mate.setMetalType(metalTypeRepo.getMetalTypeById(mate.getMaterialId()).orElse(null));
					mate.getMetalType().setCurrentMetalPriceRate(metalPriceRateRepo
							.getCurrentMetalPriceRate(mate.getMetalType().getMetalTypeName()).orElse(null));
				}
				else
					mate.setGemStone(gemstoneRepo.getGemstoneById(mate.getMaterialId()).orElse(null));
			});
			product.getProductMaterials().clear();
			product.getProductMaterials().addAll(productMaterial);
		});
		// VALIDATE THE ITEM BUY BACK
		List<InvoiceItem> invoiceItemsAfterCheckSucces = itemsBuyBack.parallelStream()
				.map(item -> validateTheItemBuyBack(item, invoiceItemsOrigin, productsCanBuyBack,
						invoiceItemsHasBeenBuyBack, itemsBuyBack))
				.collect(Collectors.toList());

		// CONFIG ITEM UNITPRICE
		invoiceItemsAfterCheckSucces = invoiceItemsAfterCheckSucces.parallelStream().map(item -> {
			Product productOfItem = productsCanBuyBack.stream()
					.filter(x -> x.getProductId().equals(item.getProductId())).findFirst().get();
			InvoiceItem configPriceItem = configInvoiceItemPrice(item, productOfItem);
			System.out.println("INVOICE ITEM " + configPriceItem.toString());
			return configPriceItem;
		}).collect(Collectors.toList());

		return invoiceItemsAfterCheckSucces;
	}
	
	private InvoiceItem validateTheItemBuyBack(InvoiceItem item, List<InvoiceItem> invoiceItemsOrigin, List<Product> productsCanBuyBack, List<InvoiceItem> invoiceItemsHasBeenBuyBack, List<InvoiceItem> itemsBuyBack){
			
					int invoiceSellId = item.getInvoiceSellId();
					int productId = item.getProductId();
					String componentBuy = Optional.ofNullable(item.getComponentBuy()).orElseThrow(() -> new InvoiceException("The component buy of is required in all items buy back!"));

					//Check if product id, invoice sell id of this item is in the list of invoiceItemsOrigin
					InvoiceItem itemOrigin = invoiceItemsOrigin
							.parallelStream()
							.filter(x -> x.getInvoiceId() == invoiceSellId && x.getProductId() == productId)
							.findFirst()
							.orElseThrow(() -> new InvoiceException("There is no item that the invoice sell id " + invoiceSellId + " contain product " + productId));
					
					Product productInItemOrigin = productsCanBuyBack.stream().filter(x -> x.getProductId().equals(productId)).findFirst().orElse(null);
					//Check if the component buy of the product which involve to this item is the material can buy
					List<String> productComponentsCanBuy = productInItemOrigin.getProductMaterials()
							.parallelStream().map(mate -> {
								if (mate.isMetal())
									
									return mate.getMetalType().getMetalTypeName();
								else
									return mate.getGemStone().getSeriaNumber();
							}
							).collect(Collectors.toList());
					productComponentsCanBuy.add(DomainConstant.COMPONENT_BUY);
					productComponentsCanBuy.forEach(x -> System.out.println("Component: " + x));
					if(!productComponentsCanBuy.stream().anyMatch(component -> component.equalsIgnoreCase(componentBuy))) {
						throw new InvoiceException("The product id " + item.getProductId() + " does not contain any component material " + item.getComponentBuy());
					}
					
					//Check if the component buy, product id, invoice sell of this item is duplicated to another one in the items buy back
					long count = itemsBuyBack.stream()
							.filter(
									x -> x.getComponentBuy().equalsIgnoreCase(componentBuy) 
									&& 
									x.getProductId().equals(productId) 
									&& 
									x.getInvoiceSellId().equals(invoiceSellId)
									)
							.count();
					if(count != 1)
						throw new InvoiceException("Duplicated item buy back which product id is " + productId + " - component buy is " + componentBuy + " - sell invoice id is " + invoiceSellId);
					
				itemsBuyBack.stream().forEach(x -> {
					if(x.getComponentBuy().equals(DomainConstant.COMPONENT_BUY)) {
						throw new InvoiceException("Not allow to buy full the product id " + x.getProductId() + " from invoice sell id " + x.getInvoiceSellId() +". Only allow to buy component based on material name");
					}
				});
					
					
					//Check if the product id, component buy, sell id has been bought before from the list of sellInvoiceItems
					if(invoiceItemsHasBeenBuyBack != null && !invoiceItemsHasBeenBuyBack.isEmpty()){
						//check if product has been bought full before
						InvoiceItem itemHasBeenBoughtFull = invoiceItemsHasBeenBuyBack
								.parallelStream()
								.filter(
										x -> x.getComponentBuy().equalsIgnoreCase(DomainConstant.COMPONENT_BUY) 
										&& 
										x.getProductId().equals(productId) 
										&& 
										x.getInvoiceSellId().equals(invoiceSellId))
								.findFirst().orElse(null);
						if(itemHasBeenBoughtFull != null) {
							throw new InvoiceException("Can buy back because the product " + productId + " - sell id" + invoiceSellId + " has been bough full before!");
						}
						//The product has not been bought full before and now buy back the product component type material
						InvoiceItem itemHasBeenBoughtByMaterial = invoiceItemsHasBeenBuyBack
								.parallelStream()
								.filter(
										x -> x.getComponentBuy().equalsIgnoreCase(componentBuy) 
										&& 
										x.getProductId().equals(productId) 
										&& 
										x.getInvoiceSellId().equals(invoiceSellId))
								.findFirst().orElse(null);
						if(itemHasBeenBoughtByMaterial != null) {
							throw new InvoiceException("The item has been buy back, item which product id is " + productId + " - component buy name / gemstone serial number is " + componentBuy + " - sell invoice id is " + invoiceSellId);	
						}
					}		
					return item;
	}

	private InvoiceItem configInvoiceItemPrice(InvoiceItem item, Product productOfItem) {
		List<ProductMaterial> productMaterials = productOfItem.getProductMaterials();
		System.out.println("COMPONNENT: " + item.getComponentBuy());

		for (ProductMaterial mate : productOfItem.getProductMaterials()) {
			if (mate.isMetal() && mate.getMetalType().getMetalTypeName().equalsIgnoreCase(item.getComponentBuy())) {
				MetalType metalType = mate.getMetalType();

				item.setUnitPrice(metalType.getCurrentMetalPriceRate().getBuyingPrice());
				double discountPercentageNow = 0;
				if (item.getDiscountPercentage() == null) {
					item.setDiscountPercentage(discountPercentageNow);
				}
				double amountDiscount = item.getUnitPrice() * item.getDiscountPercentage() / 100;
				item.setSubTotal((item.getUnitPrice() - amountDiscount) * item.getQuantity());
				item.setUnitMeasure(DomainConstant.METAL_UNITMEASURE);
				break;
			} else if (mate.getGemStone().getSeriaNumber().equalsIgnoreCase(item.getComponentBuy())) {
				GemStone gemstone = mate.getGemStone();
				item.setUnitPrice(gemstone.getGemstonePrice());
//					if(item.getUnitPrice() == null) 
//						throw new InvoiceException("The componenet gemstone requires the unitprice input");
				double discountPercentageNow = 0;
				if (item.getDiscountPercentage() == null) {
					item.setDiscountPercentage(discountPercentageNow);
				}
				double amountDiscount = item.getUnitPrice() * item.getDiscountPercentage() / 100;
				item.setSubTotal((item.getUnitPrice() - amountDiscount)); //gemstone buy all not multiply by quantity
				item.setUnitMeasure(DomainConstant.GEMSTONE_UNITMEASURE);
				break;
			}
		}

		return item;
	}

	private void checkAllowToUpdate(Invoice invoice) {
		//check transaction invoice status PENDING PAYMENT --> ALLOW UPDATE, CANCELLED --> NOT ALLOW TO UPDATE, PAID --> NOT ALLOW TO UPDATE
		//PENDING PAYMENT --> ALLOW UPDATE + PAYMENT TRANSACTION MUST SET TO NULL
		Invoice invoiceOriginal = invoiceRepo.getInvoiceById(invoice.getInvoiceId()).orElse(null);
		System.out.println("INVOICE ORIGNAL" + invoiceOriginal.getStatus());
		if(invoiceOriginal == null) {
			throw new InvoiceException("Invoice is not found in database !");
		}
		
		if(invoice.getTransactionType() != TransactionType.PURCHASE) {
			throw new InvoiceException("This invoice is not a purchase transaction");
		}
		
		if(invoiceOriginal.getTransactionType() != TransactionType.PURCHASE)
			throw new InvoiceException("This original invoice is not a purchase transaction");
		
		if(invoiceOriginal.getStatus().equals(TransactionStatus.PAID)) {
			throw new InvoiceException("The invoice has been paid successfully, can not update any more !");
		}
		
		if(invoiceOriginal.getStatus().equals(TransactionStatus.CANCELLED)) {
			throw new InvoiceException("The invoice has been cancelled, can not update any more !");
		}
		
	}

}
