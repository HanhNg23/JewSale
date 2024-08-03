package com.jewelry.invoice.core.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import com.jewelry.invoice.core.domain.InvoiceItem;

public interface InvoiceItemRepository {
	
	public List<InvoiceItem> getAllInvoiceItemsByInvoiceId(int invoiceId);
	
	public List<InvoiceItem> getAllInvoiceItemsByInvoiceIdsSet(Set<Integer> invoiceIds);
	
	//This use to find all the invoice items buy back has the invoice sell is in the set
	public List<InvoiceItem> getAllInvoiceItemsByInvoiceSellIdsSet(Set<Integer> invoiceSellIdsInItemsBuyBack);
	
	public Optional<InvoiceItem> getInvoiceItemById(int invoiceItemId);
	
	public InvoiceItem saveInvoiceItem(InvoiceItem invoiceItem);
	
	public void deleteInvoiceItem(int invoiceItem);
	
	
	
}
