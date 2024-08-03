package com.jewelry.invoice.infrastructure.db.jpa.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceItemEntity;
import com.jewelry.metal.core.interfaces.IMetalService;
import com.jewelry.product.core.repository.GemstoneRepository;

import lombok.AllArgsConstructor;

@Repository
@Transactional
@AllArgsConstructor
public class InvoiceRepositoryImpl implements InvoiceRepository {
	private JpaInvoiceRepository invoiceRepo;
	private JpaInvoiceItemRepository invoiceItemRepo;
	private GemstoneRepository gemstoneRepo;
	private IMetalService metalService;
	private ModelMapper mapper;
	

	@Override
	public Optional<Invoice> getInvoiceById(int invoiceId) {
		InvoiceEntity invoiceEntity = invoiceRepo.findById(invoiceId).orElse(null);

		if (invoiceEntity != null) {
			Invoice invoice = mapper.map(invoiceEntity, Invoice.class);
			invoice = mapperInvoiceWithChilds(invoice);
			return Optional.of(invoice);
		}

		return Optional.empty();
	}

	@Override
	public Invoice saveInvoice(Invoice invoice) {
		InvoiceEntity invoiceNew = mapper.map(invoice, InvoiceEntity.class);
		for (InvoiceItemEntity item : invoiceNew.getInvoiceItems()) {
			item.setInvoice(invoiceNew);
		}
		InvoiceEntity savedInvoiceEntity = invoiceRepo.save(invoiceNew);
		savedInvoiceEntity.getInvoiceItems().forEach(item -> {
			item.setInvoiceId(savedInvoiceEntity.getInvoiceId());
			invoiceItemRepo.save(item);
			
		});
		return mapper.map(savedInvoiceEntity, Invoice.class);
	}

	@Override
	public void deleteInvoice(int invoiceId) {
		InvoiceEntity invoiceEntity = invoiceRepo.findById(invoiceId).get();
		invoiceRepo.delete(invoiceEntity);
	}


	@Override
	public Page<Invoice> getAllPInvoicesWithSearchSortFilter(
			String customerName,
			LocalDateTime transactionDateFrom,
			LocalDateTime transactionDateEnd,
			Set<TransactionStatus> transactionStatus,
			Pageable pageable) {
		Specification<InvoiceEntity> spec = Specification.where(
				InvoiceSpecifications.hasCustomerOrStaffName(customerName)
				.or(InvoiceSpecifications.hasTransactionStatus(transactionStatus))
				.or(InvoiceSpecifications.betweenFromStartToEnd(transactionDateFrom, transactionDateEnd))
				);
		 Page<InvoiceEntity> invoiceEntities = invoiceRepo.findAll(spec, pageable);
		 invoiceEntities.get().forEach(x -> x.getInvoiceItems().stream().forEach(y -> y.getProduct().getProductMaterials()));
		 List<Invoice> invoiceList = new ArrayList<>();
		 invoiceEntities.getContent().forEach(p -> {
			 Invoice invoice = mapper.map(p, Invoice.class);
			 invoice = mapperInvoiceWithChilds(invoice);
			 invoiceList.add(invoice);
		 });
		 return new PageImpl<>(
				 invoiceList,
				 pageable,
				 invoiceEntities.getTotalElements());
	}


	@Override
	public List<Invoice> getInvoicesByCustomerId(int customerId) {
		List<InvoiceEntity> invoices = invoiceRepo.findAllByCustomerId(customerId);
		if(invoices != null && !invoices.isEmpty()) {
			return invoices.parallelStream().map(p -> {
				Invoice invoice = mapper.map(p, Invoice.class);
				 invoice = mapperInvoiceWithChilds(invoice);
				 return invoice;
				}).toList();
			}
		
		return Collections.emptyList();
	}


	@Override
	public Invoice updateInvoice(Invoice invoice) {
		InvoiceEntity originalInvoice = invoiceRepo.findById(invoice.getInvoiceId()).orElseThrow(() -> new NullPointerException("Orignal invoice is null !")) ;
		
		List<InvoiceItemEntity> updatedInvoiceItems = invoice.getInvoiceItems().parallelStream().map(item -> mapper.map(item, InvoiceItemEntity.class)).toList();
		
	    List<InvoiceItemEntity> originalInvoiceItems = originalInvoice.getInvoiceItems();
	    
	   Iterator<InvoiceItemEntity> iterator = originalInvoiceItems.iterator();
	    
	    while (iterator.hasNext()) {
	        InvoiceItemEntity existingItem = iterator.next();
	        boolean found = false;
	        for (InvoiceItemEntity updatedItem : updatedInvoiceItems) {
	            if (updatedItem.getProductId() == existingItem.getProductId() && updatedItem.getComponentBuy().equalsIgnoreCase(existingItem.getComponentBuy())) {
	                mapper.map(updatedItem, existingItem);
	                //remove the existing item after processing successfully
	                updatedInvoiceItems.remove(updatedItem);
	                found = true;
	                break;
	            }
	        }
	        if (!found) {
	        	iterator.remove(); //now iterator which reference to the list of original invoice item will remove the ones not exists in updatedInvoice items list
	        }
	    }
	    
	    originalInvoiceItems.addAll(updatedInvoiceItems); //add the rest in updatedInvoiceItems list
	    
		mapper.map(invoice, originalInvoice);
		originalInvoice.setInvoiceItems(originalInvoiceItems);
		
		InvoiceEntity savedInvoiceEntity = invoiceRepo.save(originalInvoice);
		
		return mapper.map(savedInvoiceEntity, Invoice.class);
	}
	
	private Invoice mapperInvoiceWithChilds(Invoice invoice) {
		invoice.getInvoiceItems().parallelStream().forEach(x -> {
			x.getProduct().getProductMaterials().forEach(mate -> {
				if (mate.isMetal()) {
					mate.setMetalType(metalService.getMetalType(mate.getMaterialId()));
					mate.getMetalType().setCurrentMetalPriceRate(
							metalService.currentMetalPriceRate(mate.getMetalType().getMetalTypeName()));
				} else {
					mate.setGemStone(gemstoneRepo.getGemstoneById(mate.getMaterialId()).orElse(null));
				}
			});
		});
		return invoice;
	}

}
