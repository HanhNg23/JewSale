package com.jewelry.invoice.core.usecase;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.jewelry.common.constant.TransactionType;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.exception.InvoiceException;
import com.jewelry.invoice.core.repository.InvoiceItemRepository;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.product.core.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class GetProductsInInvoiceUsecase extends UseCase<GetProductsInInvoiceUsecase.InputValues, GetProductsInInvoiceUsecase.OutputValues> { 

	private InvoiceRepository invoiceRepo;
	private InvoiceItemRepository invoiceItemRepo;
	
	@Value
	public static class InputValues implements UseCase.InputValues {
			private final Integer invoiceId;
			private final String searchKeyword;
			private final Set<String> productType;
			private final Set<String> metalGroup;
			private final Set<String> metalType;
			private final Set<String> gemstoneType;
			private final Set<String> saleStatus;
			private final Sort.Direction sortBy;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final List<InvoiceItem> invoiceItems;
	}

	@Override
	public OutputValues execute(InputValues input) {
		String searchKeywordOption = StringUtils.trimAll(input.searchKeyword.toLowerCase());
		Set<String> productTypeFilterOptions = input.productType.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> metalGroupFilterOptions = input.metalGroup.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> metalTypeFilterOptions = input.metalType.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> gemstoneTypeFilterOptions = input.gemstoneType.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> saleStatusFilterOption = input.saleStatus.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Sort.Direction sortByOption = input.sortBy;

		
		Invoice invoice = invoiceRepo.getInvoiceById(input.getInvoiceId()).orElse(null);
		if(!invoice.getTransactionType().equals(TransactionType.SELL)) {
			throw new InvoiceException("This invoice id is not type of sell invoice");
		}
		
		List<InvoiceItem> invoiceItems = invoiceItemRepo.getAllInvoiceItemsByInvoiceId(input.getInvoiceId());
		   List<InvoiceItem> invoiceItemsAfterFilter = invoiceItems.parallelStream()
		            .filter(item -> {
		                Product product = item.getProduct();
		                if (product == null) {
		                    return false;
		                }

		                boolean matches = true;

		                if (!searchKeywordOption.trim().isEmpty()) {
		                    matches = matches && product.getName().toLowerCase().contains(searchKeywordOption);
		                }

		                if (!productTypeFilterOptions.isEmpty()) {
		                    matches = matches && productTypeFilterOptions.contains(product.getProductType().toLowerCase());
		                }

		                if (!saleStatusFilterOption.isEmpty()) {
		                    matches = matches && saleStatusFilterOption.contains(product.getSaleStatus().toLowerCase());
		                }

		                if (!metalGroupFilterOptions.isEmpty() || !metalTypeFilterOptions.isEmpty() || !gemstoneTypeFilterOptions.isEmpty()) {
		                    matches = matches && product.getProductMaterials().stream().anyMatch(material -> {
		                        if (material.isMetal() && material.getMetalType() != null) {
		                            return metalGroupFilterOptions.contains(material.getMetalType().getMetalGroupName().toLowerCase()) ||
		                                    metalTypeFilterOptions.contains(material.getMetalType().getMetalTypeName().toLowerCase());
		                        } else if (material.getGemStone() != null) {
		                            return gemstoneTypeFilterOptions.contains(material.getGemStone().getGemstoneType().toLowerCase());
		                        }
		                        return false;
		                    });
		                }

		                return matches;
		            })
		            .sorted((item1, item2) -> {
		                // Implement sorting logic based on sortByOption here, for example:
		                if (sortByOption == Sort.Direction.ASC) {
		                    return item1.getProduct().getProductId().compareTo(item2.getProduct().getProductId());
		                } else {
		                    return item2.getProduct().getProductId().compareTo(item1.getProduct().getProductId());
		                }
		            })
		            .collect(Collectors.toList());
		 return new OutputValues(invoiceItemsAfterFilter);
	}
	
	
	
	
}
	

