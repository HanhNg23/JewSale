package com.jewelry.product.core.usecase;

import java.util.List;
import org.springframework.stereotype.Service;
import com.jewelry.common.usecase.UseCase;
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
public class GetProductUsecase extends UseCase<GetProductUsecase.InputValues, GetProductUsecase.OutputValues>{

	private ProductRepository productRepo;
	private MetalTypeRepository metalTypeRepo;
	private GemstoneRepository gemstoneRepo;
	private ProductMaterialRepository productMaterialRepo;
	private ProductPriceRepository productPriceRepo;
	private IMetalService metalService;
	
	@Override
	public OutputValues execute(InputValues input) {
		Product product = productRepo.getProductById(input.productId);
		if(product == null)
			throw new ProductException("Not found !");
		
		ProductPrice productPrice = productPriceRepo.getProductPrice(product.getProductId()).orElse(null);
		product.setProductPrice(productPrice);
		//TODO: x set image urls
		//TODO: x set accounts
		List<ProductMaterial> productMaterials = productMaterialRepo.getAllProductMaterialsByProductId(product.getProductId());
		productMaterials.parallelStream().forEach(pm -> {
			if(pm.isMetal()) {
				pm.setMetalType(metalTypeRepo.getMetalTypeById(pm.getMaterialId()).get());
				pm.getMetalType().setCurrentMetalPriceRate(metalService.currentMetalPriceRate(pm.getMetalType().getMetalTypeName()));
			}
			else {
				pm.setGemStone(gemstoneRepo.getGemstoneById(pm.getMaterialId()).get()); 
			}
		});
		product.setProductMaterials(productMaterials);
		return new OutputValues(product);
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
		private final int productId;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final Product product;
	}
}
