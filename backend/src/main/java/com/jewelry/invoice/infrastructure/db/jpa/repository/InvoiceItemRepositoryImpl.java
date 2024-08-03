package com.jewelry.invoice.infrastructure.db.jpa.repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.repository.InvoiceItemRepository;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceItemEntity;
import com.jewelry.metal.core.interfaces.IMetalService;
import com.jewelry.product.core.repository.GemstoneRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Repository
@Transactional
@AllArgsConstructor
public class InvoiceItemRepositoryImpl implements InvoiceItemRepository   {
	private JpaInvoiceItemRepository invoiceItemRepo;
	private GemstoneRepository gemstoneRepo;
	private IMetalService metalService;
	private ModelMapper mapper;
	

	@Override
	public List<InvoiceItem> getAllInvoiceItemsByInvoiceId(int invoiceId) {
		List<InvoiceItemEntity> invoiceItemEntities = invoiceItemRepo.findAllByInvoiceId(invoiceId);
		List<InvoiceItem> invoiceItems = List.of();
		if(invoiceItemEntities != null && invoiceItemEntities.size() > 0) {
			invoiceItems = invoiceItemEntities.parallelStream().map(item ->{
				 InvoiceItem invoiceItem = mapper.map(item, InvoiceItem.class);
				 invoiceItem = this.mapperInvoiceWithChilds(invoiceItem);
				 return invoiceItem;
			}).collect(Collectors.toList());
		}
			return invoiceItems;
	}

	@Override
	public Optional<InvoiceItem> getInvoiceItemById(int invoiceItemId) {
		InvoiceItemEntity invoiceEntity = invoiceItemRepo.findById(invoiceItemId).orElse(null);
		 InvoiceItem invoiceItem = mapper.map(invoiceEntity, InvoiceItem.class);
		 invoiceItem = this.mapperInvoiceWithChilds(invoiceItem);
		return invoiceEntity != null ? Optional.of(invoiceItem) : Optional.empty();
	}

	@Override
	public InvoiceItem saveInvoiceItem(InvoiceItem invoiceItem) {
		InvoiceItemEntity itemEntity = mapper.map(invoiceItem, InvoiceItemEntity.class);
		InvoiceItemEntity savedItemEntity = invoiceItemRepo.save(itemEntity);
		return mapper.map(savedItemEntity, InvoiceItem.class);
	}

	@Override
	public void deleteInvoiceItem(int invoiceItem) {
		InvoiceItemEntity itemEntity = invoiceItemRepo.findById(invoiceItem).get();
		invoiceItemRepo.delete(itemEntity);
		
	}

	@Override
	public List<InvoiceItem> getAllInvoiceItemsByInvoiceIdsSet(Set<Integer> invoiceIds) {
		List<InvoiceItemEntity> invoiceItemEntities = invoiceItemRepo.findAllByInvoiceIdsSet(invoiceIds);
		if (invoiceItemEntities == null || invoiceItemEntities.isEmpty())
			return Collections.emptyList();

		return invoiceItemEntities.parallelStream().map(item -> {
			InvoiceItem itemBo = mapper.map(item, InvoiceItem.class);
			itemBo = this.mapperInvoiceWithChilds(itemBo);
			return itemBo;
		}).collect(Collectors.toList());
	}

	@Override
	public List<InvoiceItem> getAllInvoiceItemsByInvoiceSellIdsSet(Set<Integer> invoiceSellIdsInItemsBuyBack) {
		List<InvoiceItemEntity> invoiceItemEntities = invoiceItemRepo.findAllByInvoiceSellIdsSet(invoiceSellIdsInItemsBuyBack);
		if(invoiceItemEntities == null || invoiceItemEntities.isEmpty())
			return Collections.emptyList();
			
		return invoiceItemEntities.parallelStream().map(item -> {
			InvoiceItem itemBo = mapper.map(item, InvoiceItem.class);
			itemBo = this.mapperInvoiceWithChilds(itemBo);
			return itemBo;
		}).collect(Collectors.toList());
	}
	
	private InvoiceItem mapperInvoiceWithChilds(InvoiceItem invoice) {
			invoice.getProduct().getProductMaterials().forEach(mate -> {
				if (mate.isMetal()) {
					mate.setMetalType(metalService.getMetalType(mate.getMaterialId()));
					mate.getMetalType().setCurrentMetalPriceRate(
							metalService.currentMetalPriceRate(mate.getMetalType().getMetalTypeName()));
				} else {
					mate.setGemStone(gemstoneRepo.getGemstoneById(mate.getMaterialId()).orElse(null));
				}
			});
		return invoice;
	}
	
	

}
