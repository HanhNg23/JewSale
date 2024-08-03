package com.jewelry.metal.core.events.handlers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.events.FetchMetalCompleteEvent;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.metal.core.usecase.UpdateMetalUsecase;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.core.repository.ProductPriceRepository;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.service.ProductService;


@Component
public class FetchMetalCompleteHandler implements ApplicationListener<FetchMetalCompleteEvent> {
	@Autowired
	private UpdateMetalUsecase updateMetalUsecase;
	@Autowired
	private MetalTypeRepository metalTypeRepo;
	@Autowired
	private MetalPriceRateRepository metalPriceRateRepo;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductPriceRepository productPriceRepo;
	@Autowired
	private ProductMaterialRepository productMaterialRepo;
	
	private Logger log = LoggerFactory.getLogger(FetchMetalCompleteHandler.class);
	
	@Override
	public void onApplicationEvent(FetchMetalCompleteEvent event) {
		System.out.println("Receive Fetch API Gold Listener !" + event.getMessage() +  " METAL GROUP" + event.getMetalGroup());
		if (event.getMetalGroup().equals(MetalGroup.GOLD)) {
			if (event.isSuccess()) {
				this.updateMetalPriceRateForMetalTypeGold();
			}
		}
		else if (event.getMetalGroup().equals(MetalGroup.SILVER)) {
			if (event.isSuccess()) {
				this.updateMetalPriceRateForMetalTypeSilver();
			}
		}

	}
	
	private void updateMetalPriceRateForMetalTypeGold() {
		try {
			System.out.println("OK I AM IN UPDATE METAL GOLD");
			Set<MetalType> metalType = metalTypeRepo.getAllMetalTypesByMetalGroupName(MetalGroup.GOLD.getDisplayName());
			metalType.parallelStream().forEach(metal -> {
				MetalType currentMetal = metal;
				MetalPriceRate curentMetalPriceRate = metalPriceRateRepo.getCurrentMetalPriceRate(currentMetal.getMetalTypeName()).orElse(null);
				if(curentMetalPriceRate != null && currentMetal.isAutoUpdatePrice()) {
					MetalPriceRate newMetalPriceRateUpdate = 
							MetalPriceRate.builder()
							.profitBuy(curentMetalPriceRate.getProfitBuy())
							.profitSell(curentMetalPriceRate.getProfitSell())
							.build();
					UpdateMetalUsecase.OutputValues output = updateMetalUsecase.execute(new UpdateMetalUsecase.InputValues(metal.getMetalTypeId(), metal, newMetalPriceRateUpdate));
					if(output != null) {
						System.out.println("RESULT " + output.getMetalTypeName());
					}
					this.updateProductPriceWithMetalPrice();
				}else if(curentMetalPriceRate != null && !currentMetal.isAutoUpdatePrice()) {
					System.out.println("CANNOT UPDATE METAL " + metal.getMetalTypeName() + "BECAUSE THE IS AUTO = FALSE");
				}
			});
		} catch(Exception e) {
			e.printStackTrace();
			log.info("Error execute updateMetalUsecase at time {} ", LocalDateTime.now().toString());;
		}
	}
	
	private void updateMetalPriceRateForMetalTypeSilver() {
		try {
			System.out.println("OK I AM IN UPDATE SILVER");

			Set<MetalType> metalType = metalTypeRepo.getAllMetalTypesByMetalGroupName(MetalGroup.SILVER.getDisplayName());
			metalType.parallelStream().forEach(metal -> {
				MetalType currentMetal = metal;
				MetalPriceRate curentMetalPriceRate = metalPriceRateRepo.getCurrentMetalPriceRate(currentMetal.getMetalTypeName()).orElse(null);
				if(curentMetalPriceRate != null && currentMetal.isAutoUpdatePrice()) {
					MetalPriceRate newMetalPriceRateUpdate = 
							MetalPriceRate.builder()
							.profitBuy(curentMetalPriceRate.getProfitBuy())
							.profitSell(curentMetalPriceRate.getProfitSell())
							.build();
					UpdateMetalUsecase.OutputValues output =	updateMetalUsecase.execute(new UpdateMetalUsecase.InputValues(metal.getMetalTypeId(), metal, newMetalPriceRateUpdate));
					if(output != null) {
						System.out.println("RESULT " + output.getMetalTypeName());
					}
					this.updateProductPriceWithMetalPrice();
				}else if(curentMetalPriceRate != null && !currentMetal.isAutoUpdatePrice()) {
					System.out.println("CANNOT UPDATE METAL " + metal.getMetalTypeName() + "BECAUSE THE IS AUTO = FALSE");
				}
			});
		} catch(Exception e) {
			e.printStackTrace();
			log.info("Error execute updateMetalUsecase at time {} ", LocalDateTime.now().toString());;
		}
	}
	
	private void updateProductPriceWithMetalPrice() {
		List<ProductMaterial> productMaterialIsMetal = productMaterialRepo.getAllProductMaterialsIsMetalTrue();
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
