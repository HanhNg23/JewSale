package com.jewelry.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.hibernate.Hibernate;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import com.jewelry.JewelryBackendApplication;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceItemEntity;
import com.jewelry.invoice.infrastructure.db.jpa.repository.JpaInvoiceItemRepository;
import com.jewelry.invoice.infrastructure.db.jpa.repository.JpaInvoiceRepository;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.repository.JpaProductRepository;

@SpringBootTest(classes = JewelryBackendApplication.class)
@ExtendWith(SpringExtension.class)

public class ApplicationTest {

	@Autowired
	private JpaProductRepository productRepo;
	
	@Autowired
	private ProductRepository productRepoo;
	
	@Autowired
	private InvoiceRepository invoiceRepoo;
	
	@Autowired
	private JpaInvoiceRepository invoiceRepo;
	
	@Autowired
	private JpaInvoiceItemRepository invoiceItemRepo;
	
	
	@Autowired
	private ModelMapper mapper;
	
	
	//@Test
	void testTheInstanceOfMetalTypeRepoHasExisted() {
		ProductEntity productEntity = productRepo.findById(1).orElse(null);
		Product product = mapper.map(productEntity, Product.class);
		
		Product productcopy = productRepoo.getProductById(1);
		assertEquals(productEntity.getProductPrice().getProductPriceId(), product.getProductPrice().getProductPriceId());
		assertEquals(productEntity.getProductMaterials().size(), product.getProductMaterials().size());
		assertEquals(product.getProductId(), productcopy.getProductId());
		System.out.println("Product ====== " + product.toString());
		System.out.println("Product Copy ====== " + productcopy.toString());
		
	}
	
	@Test
	void testTheInoviceMapper() {
		InvoiceEntity invoiceEntity = invoiceRepo.findById(1).orElse(null);
		//Invoice invoice = invoiceRepoo.getInvoiceById(1).orElse(null);
		//List<InvoiceItemEntity> invoiceItemEntity = invoiceItemRepo.findAllByInvoiceId(1);

	//	invoiceEntity.setInvoiceItems(invoiceItemEntity);
		Invoice invoice = mapper.map(invoiceEntity, Invoice.class);
		
		assertEquals(invoiceEntity.getInvoiceId(), invoice.getInvoiceId());
		assertEquals(invoiceEntity.getInvoiceItems().size(), invoice.getInvoiceItems().size());
		
		System.out.println("Inovice ===== " + invoice.toString());
		
	}



}
