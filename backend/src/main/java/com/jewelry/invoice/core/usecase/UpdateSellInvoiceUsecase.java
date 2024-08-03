package com.jewelry.invoice.core.usecase;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.service.IAccountService;
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
import com.jewelry.payment.PaymentService;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.service.IProductService;
import com.jewelry.promotion.core.domain.PromotionCode;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class UpdateSellInvoiceUsecase extends UseCase<UpdateSellInvoiceUsecase.InputValues, UpdateSellInvoiceUsecase.OutputValues> {

	private PaymentService paymentService;
	private InvoiceRepository invoiceRepo;
	private IAccountService accountService;
	private IProductService productService;
	private IInvoiceService invoiceService;
	

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
		
		//TODO: get the promotioncode
		
		//Check the product sale status --> get the unitprice --> calculate the subTotal;
		List<InvoiceItem> invoiceItems = this.checkValidInvoiceItemSell(input.getInvoiceItems());
		invoice.setInvoiceItems(invoiceItems);
		
		//TODO calculate the invoice total payment
		invoice = invoiceService.calculatInvoicePaymentSell(invoice);
		
		invoice.setStatus(TransactionStatus.PENDING_PAYMENT);
		invoice.setUpdatedAt(LocalDateTime.now());
		invoice.setTransactionDate(LocalDateTime.now());
		
		//review payment if has been created
		if(invoiceOriginal.getPaymentDetailsId() != null) {
			try {
				paymentService.cancelPaymentByInovoiceId(invoiceOriginal.getPaymentDetailsId());
			}catch (Exception e) {
			}
		}
		
		//check the payment method is in range
		if(PaymentMethod.valueOf(PaymentMethod.class, invoice.getPaymentMethod().name()) == null) {
			throw new InvoiceException("The payment method is not valid");
		}
		Invoice savedInvoice = null;
		try {
			savedInvoice = invoiceRepo.saveInvoice(invoice);
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
	
	private void checkAllowToUpdate(Invoice invoice) {
		//check transaction invoice status PENDING PAYMENT --> ALLOW UPDATE, CANCELLED --> NOT ALLOW TO UPDATE, PAID --> NOT ALLOW TO UPDATE
		//PENDING PAYMENT --> ALLOW UPDATE + PAYMENT TRANSACTION MUST SET TO NULL
		Invoice invoiceOriginal = invoiceRepo.getInvoiceById(invoice.getInvoiceId()).orElse(null);
		System.out.println("INVOICE ORIGNAL" + invoiceOriginal.getStatus());
		if(invoiceOriginal == null) {
			throw new InvoiceException("Invoice is not found in database !");
		}
		
		if(invoice.getTransactionType() != TransactionType.SELL) {
			throw new InvoiceException("This invoice is not a sell transaction");
		}
		
		if(invoiceOriginal.getTransactionType() != TransactionType.SELL)
			throw new InvoiceException("This original invoice is not a sell transaction");
		
		if(invoiceOriginal.getStatus().equals(TransactionStatus.PAID)) {
			throw new InvoiceException("The invoice has been paid successfully, can not update any more !");
		}
		
		if(invoiceOriginal.getStatus().equals(TransactionStatus.CANCELLED)) {
			throw new InvoiceException("The invoice has been cancelled, can not update any more !");
		}
		
	}
	



}
