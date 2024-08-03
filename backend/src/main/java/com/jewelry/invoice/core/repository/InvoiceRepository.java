package com.jewelry.invoice.core.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.invoice.core.domain.Invoice;

public interface InvoiceRepository {
	
	public Page<Invoice> getAllPInvoicesWithSearchSortFilter(
			String customerName,
			LocalDateTime transactionDateFrom,
			LocalDateTime transactionDateEnd,
			Set<TransactionStatus> transactionStatus,
			Pageable pageable);
	
	public Optional<Invoice> getInvoiceById(int invoiceId);
	
	public List<Invoice> getInvoicesByCustomerId(int customerId);
	
	public Invoice saveInvoice(Invoice invoice);
	
	public Invoice updateInvoice(Invoice invoice);
	
	public void deleteInvoice(int invoiceId);
	
}
