package com.jewelry.invoice.core.service;

import org.springframework.stereotype.Service;
import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.service.IAccountService;
import com.jewelry.common.constant.Role;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.exception.InvoiceException;

@Service
public class InvoiceService implements IInvoiceService {
	private IAccountService accountService;
	public InvoiceService(
			IAccountService accountService) {
		this.accountService = accountService;
	}
	
	@Override
	public Invoice calculatInvoicePaymentSell(Invoice invoice) {
		double totalAmount = invoice.getInvoiceItems().stream().mapToDouble(item -> item.getUnitPrice() * item.getQuantity()).sum();
		double totalAmountAfterDiscountOnProduct = invoice.getInvoiceItems().stream().mapToDouble(item -> item.getSubTotal()).sum();
		double amountProuductDiscount = totalAmount - totalAmountAfterDiscountOnProduct;
		//TODO: query promotion voucher discount on invoice
		double totalVoucherDiscount = 0;
		//TODO: recalculate net amount that include voucher discount
		double netAmount = totalAmount - amountProuductDiscount - totalVoucherDiscount;
		
		invoice.setTotalAmount(totalAmount);
		invoice.setTotalDiscount(amountProuductDiscount);
		invoice.setTotalVoucherDiscount(totalVoucherDiscount);
		invoice.setNetAmount(netAmount);
		
		return invoice;
	}
	
	@Override
	public Invoice calculatInvoicePaymentPurchase(Invoice invoice) {
		double totalAmount = invoice.getInvoiceItems().stream().mapToDouble(item -> {
			if(item.getIsMetal())
				return item.getUnitPrice() * item.getQuantity();
			else
				return item.getUnitPrice();
		}).sum();
		double totalAmountAfterDiscountOnProduct = invoice.getInvoiceItems().stream().mapToDouble(item -> item.getSubTotal()).sum();
		double amountProuductDiscount = totalAmount - totalAmountAfterDiscountOnProduct;
		//TODO: query promotion voucher discount on invoice
		double totalVoucherDiscount = 0;
		//TODO: recalculate net amount that include voucher discount
		double netAmount = totalAmount - amountProuductDiscount - totalVoucherDiscount;
		
		invoice.setTotalAmount(totalAmount);
		invoice.setTotalDiscount(amountProuductDiscount);
		invoice.setTotalVoucherDiscount(totalVoucherDiscount);
		invoice.setNetAmount(netAmount);
		
		return invoice;
	}
	
	public Account createCustomerAccountIfNotExistAndGetAccount(String customerPhonenumber, String customerFullname) {
			
			Account customerAccount = accountService.getCustomerAccountByPhonenumberAndFullname(customerPhonenumber,
					customerFullname);
			if(customerAccount != null) {
				//compare to make sure the unique constraint between customer phone and customer full name for account role customer
				if(!customerAccount.getFullname().equalsIgnoreCase(customerFullname) && customerAccount.getRole().equals(Role.CUSTOMER)) {
					throw new InvoiceException("There is already another customer fullname with the same phone number has already existed !");
				}
			}
			if (customerAccount == null) {
				customerAccount = new Account();
				customerAccount.setPhonenumber(customerPhonenumber);
				customerAccount.setFullname(customerFullname);
				customerAccount.setRole(Role.CUSTOMER);
				customerAccount = accountService.createCustomerAccount(customerAccount);
			}
			return customerAccount;
		}


}
