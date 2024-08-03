package com.jewelry.product.core.usecase;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.metal.core.interfaces.IMetalService;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;
import com.jewelry.product.core.exeption.ProductException;
import com.jewelry.product.core.repository.GemstoneRepository;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.core.repository.ProductPriceRepository;
import com.jewelry.product.core.repository.ProductRepository;

import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class GetAllProductsUsecase extends UseCase<GetAllProductsUsecase.InputValues, GetAllProductsUsecase.OutputValues> {

	private ProductRepository productRepo;
	private MetalTypeRepository metalTypeRepo;
	private GemstoneRepository gemstoneRepo;
	private ProductMaterialRepository productMaterialRepo;
	private ProductPriceRepository productPriceRepo;
	private IMetalService metalService;
	
	@Override
	public OutputValues execute(InputValues input) {
		String searchKeywordOption = StringUtils.trimAll(input.searchKeyword.toLowerCase());
		Set<String> productTypeFilterOptions = input.productType.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> metalGroupFilterOptions = input.metalGroup.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> metalTypeFilterOptions = input.metalType.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> gemstoneTypeFilterOptions = input.gemstoneType.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Set<String> saleStatusFilterOption = input.saleStatus.parallelStream().map(x -> StringUtils.trimAll(x.toLowerCase())).collect(Collectors.toSet());
		Sort.Direction sortByOption = input.sortBy;
		if (input.pageNo < 0 || input.pageSize < 1)
			throw new ProductException("Page number starts with 1. Page size must not be less than 1");
		
		//sort by productId
		Sort sort;
		sort = Sort.by(Sort.Direction.ASC, "productId");
		if (sortByOption.equals(Sort.Direction.DESC))
			sort = Sort.by(Sort.Direction.DESC, "productId");
		
		Pageable sortedPage = input.pageNo == 0 ? PageRequest.of(0, input.pageSize, sort)
				  : PageRequest.of(input.pageNo - 1, input.pageSize, sort);
		
		List<Product> products = productRepo.getAllProductsWithSearchSortFilter(
				searchKeywordOption,
				productTypeFilterOptions,
				metalGroupFilterOptions,
				metalTypeFilterOptions,
				gemstoneTypeFilterOptions,
				saleStatusFilterOption,
				sortedPage);
		
		products.parallelStream().forEach(x -> {
			ProductPrice productPrice = productPriceRepo.getProductPrice(x.getProductId()).orElse(null);
			x.setProductPrice(productPrice);
			List<ProductMaterial> productMaterials = productMaterialRepo.getAllProductMaterialsByProductId(x.getProductId());

			productMaterials.parallelStream().forEach(pm -> {
				if(pm.isMetal()) {
					pm.setMetalType(metalTypeRepo.getMetalTypeById(pm.getMaterialId()).get());
					pm.getMetalType().setCurrentMetalPriceRate(metalService.currentMetalPriceRate(pm.getMetalType().getMetalTypeName()));
				}
				else {
					pm.setGemStone(gemstoneRepo.getGemstoneById(pm.getMaterialId()).get()); 
				}
			});
			x.setProductMaterials(productMaterials);
		});
		
		return new OutputValues(products);
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
			private final String searchKeyword;
			private final Set<String> productType;
			private final Set<String> metalGroup;
			private final Set<String> metalType;
			private final Set<String> gemstoneType;
			private final Set<String> saleStatus;
			private final Sort.Direction sortBy;
			private final Integer pageNo;
			private final Integer pageSize;	
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final List<Product> products;
	}

}
