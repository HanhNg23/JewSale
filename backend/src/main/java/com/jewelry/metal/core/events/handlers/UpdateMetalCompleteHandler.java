package com.jewelry.metal.core.events.handlers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.events.UpdateMetalCompleteEvent;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.core.repository.ProductPriceRepository;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.service.IProductService;

@Component
public class UpdateMetalCompleteHandler implements ApplicationListener<UpdateMetalCompleteEvent> {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private IProductService productService;
	@Autowired
	private ProductPriceRepository productPriceRepo;
	@Autowired
	private ProductMaterialRepository productMaterialRepo;
	
	@Override
	public void onApplicationEvent(UpdateMetalCompleteEvent event) {
		System.out.println("I HAVE LISTEN EVENT");
		MetalType metalType = event.getMetalType();
		if(metalType != null) {
			List<ProductMaterial> productMaterialIsMetal = productMaterialRepo.getAllProductMaterialsIsMetalTrue().stream().filter(mate -> mate.getMaterialId().equals(metalType.getMetalTypeId())).toList();
			Set<Integer> productIds = productMaterialIsMetal.parallelStream().map(x -> x.getProductId()).distinct().collect(Collectors.toSet());
			List<Product> productsHasMetal = productRepository.getAllProductInSet(productIds);
			productsHasMetal.parallelStream().forEach(product -> {
				Product productToUpdatePrice = productRepository.getProductById(product.getProductId());
				ProductPrice productPrice = productService.getCalculatedProductPrice(productToUpdatePrice);
				productPrice.setProductId(productToUpdatePrice.getProductId());
				productPriceRepo.updateProductPriceByProductId(productPrice);
			});
		}
		
	}
}
