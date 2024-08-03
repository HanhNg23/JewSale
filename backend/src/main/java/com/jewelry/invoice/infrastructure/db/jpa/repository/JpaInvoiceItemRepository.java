package com.jewelry.invoice.infrastructure.db.jpa.repository;

import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceItemEntity;


public interface JpaInvoiceItemRepository extends JpaRepository<InvoiceItemEntity, Integer> {
	
	public List<InvoiceItemEntity> findAllByInvoiceId(int invoiceId);
	
	@Query(value = "SELECT i FROM InvoiceItemEntity i WHERE i.invoiceId IN :invoiceIds")
	public List<InvoiceItemEntity> findAllByInvoiceIdsSet(@Param("invoiceIds") Set<Integer> invoiceIds);
	
	@Query(value = "SELECT i FROM InvoiceItemEntity i WHERE i.invoiceSellId IN :invoiceIds")
	public List<InvoiceItemEntity> findAllByInvoiceSellIdsSet(@Param("invoiceIds") Set<Integer> invoiceIds);
	
	

}
