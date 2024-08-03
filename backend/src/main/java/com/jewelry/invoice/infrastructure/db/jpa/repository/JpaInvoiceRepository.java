package com.jewelry.invoice.infrastructure.db.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;

public interface JpaInvoiceRepository extends JpaRepository<InvoiceEntity, Integer>, JpaSpecificationExecutor<InvoiceEntity> {
	
	
	List<InvoiceEntity> findAllByCustomerId(int customerId);
}
