package com.jewelry.invoice.core.usecase;

import java.time.LocalDateTime;
import java.util.List;

import com.jewelry.common.events.EventPublisher;
import org.springframework.stereotype.Service;
import com.jewelry.account.core.domain.Account;
import com.jewelry.common.constant.DomainConstant;
import com.jewelry.common.constant.PaymentMethod;
import com.jewelry.common.constant.ProductSaleStatus;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.constant.TransactionType;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.exception.InvoiceException;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.invoice.core.service.IInvoiceService;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.service.IProductService;
import com.jewelry.promotion.core.domain.PromotionCode;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@Transactional
@AllArgsConstructor
public class CreateSellInvoiceUsecase extends UseCase<CreateSellInvoiceUsecase.InputValues, CreateSellInvoiceUsecase.OutputValues> {
	
	private InvoiceRepository invoiceRepo;
	private IProductService productService;
	private IInvoiceService invoiceService;
	private EventPublisher publisher;
	
	@Value
	public static class InputValues implements UseCase.InputValues {
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

		Invoice invoice = input.getInvoice();
		if (invoice.getTransactionType() != TransactionType.SELL)
			throw new InvoiceException("This is not a sell transaction");
		

		// check if customer has existed
		Account customerAccount = invoiceService.createCustomerAccountIfNotExistAndGetAccount(
				invoice.getCustomer().getPhonenumber(),
				invoice.getCustomer().getFullname());
		
		invoice.setCustomer(customerAccount);
		invoice.setCustomerId(customerAccount.getAccountId());
		
		//TODO: get the promotioncode
		
		//Check the product sale status --> get the unitprice --> calculate the subTotal;
		List<InvoiceItem> invoiceItems = this.checkValidInvoiceItemSell(input.getInvoiceItems());
		invoice.setInvoiceItems(invoiceItems);
		
		//TODO calculate the invoice total payment
		invoice = invoiceService.calculatInvoicePaymentSell(invoice);
		
		invoice.setStatus(TransactionStatus.PENDING_PAYMENT);
		invoice.setUpdatedAt(LocalDateTime.now());
		invoice.setTransactionDate(LocalDateTime.now());
		
		//check the payment method is in range
		if(PaymentMethod.valueOf(PaymentMethod.class, invoice.getPaymentMethod().name()) == null) {
			throw new InvoiceException("The payment method is not valid");
		}
		Invoice savedInvoice = null;
		try {
			savedInvoice = invoiceRepo.saveInvoice(invoice);
			publisher.updateProductStockQuantity("Product quantity updated successfully", 	savedInvoice.getInvoiceItems());

		}catch(Exception e) {
			e.printStackTrace();
			throw new InvoiceException(e.getMessage());
		}

		return new OutputValues(savedInvoice);
	}
	

	private List<InvoiceItem> checkValidInvoiceItemSell(List<InvoiceItem> invoiceItems) {
		if(invoiceItems == null | invoiceItems.isEmpty()) {
			throw new InvoiceException("The invoice items cannot be null");
		}
		
		invoiceItems.parallelStream().forEach(item -> {
			Product currentProduct = productService.getProductById(item.getProductId());
			if (currentProduct == null) {
				throw new InvoiceException("Product " + item.getProductId() + "is not found.");
			}
			if (!currentProduct.getSaleStatus().equalsIgnoreCase(ProductSaleStatus.INSTOCK.getDisplayName())) {
				throw new InvoiceException("The product id " + currentProduct.getProductId() + " has the sale status now is not in " + ProductSaleStatus.INSTOCK.getDisplayName());
			}
			item.setUnitPrice(currentProduct.getProductPrice().getSalePrice());
			//TODO: TEMPORARAY DISCOUNT PERCENTAGE
			double discountPercentageNow = 0;
			if(item.getDiscountPercentage() == null) {
				item.setDiscountPercentage(discountPercentageNow);
			}
			double amountDiscount = item.getUnitPrice() * item.getDiscountPercentage() / 100;
			item.setSubTotal((item.getUnitPrice() - amountDiscount) * item.getQuantity()); 
			item.setComponentBuy(DomainConstant.COMPONENT_BUY);
			item.setUnitMeasure(currentProduct.getUnitMeasure());
			item.setIsMetal(false);
		});
		return invoiceItems;
	}
}