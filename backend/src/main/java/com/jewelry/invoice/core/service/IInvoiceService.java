package com.jewelry.invoice.core.service;

import com.jewelry.account.core.domain.Account;
import com.jewelry.invoice.core.domain.Invoice;

public interface IInvoiceService {
	
	
	public Account createCustomerAccountIfNotExistAndGetAccount(String customerPhonenumber, String customerFullname);

	public Invoice calculatInvoicePaymentSell(Invoice invoice);

	public Invoice calculatInvoicePaymentPurchase(Invoice invoice);
	
}
