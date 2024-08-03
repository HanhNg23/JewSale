package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import com.jewelry.product.core.domain.ProductPrice;
import com.jewelry.product.core.repository.ProductPriceRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductPriceEntity;

@Repository
public class ProductPriceRepositoryImpl implements ProductPriceRepository {
	private JpaProductPriceRepository productPriceRepo;
	private ModelMapper mapper = new ModelMapper();
	ProductPriceRepositoryImpl(JpaProductPriceRepository productPriceRepo){
		this.productPriceRepo = productPriceRepo;
	}
	
	
	@Override
	public Optional<ProductPrice> getProductPrice(int productId) {
		ProductPriceEntity productPriceEntity = productPriceRepo.findOneByProductId(productId).orElse(null);
		return productPriceEntity != null ? Optional.ofNullable(mapper.map(productPriceEntity, ProductPrice.class)) : Optional.empty();
	}

	@Override
	public ProductPrice saveProductPrice(ProductPrice productPrice) {
		ProductPriceEntity productPriceEntity = mapper.map(productPrice, ProductPriceEntity.class);
		ProductPriceEntity savedProductPriceEntity = productPriceRepo.save(productPriceEntity);
		return mapper.map(savedProductPriceEntity, ProductPrice.class);
	}


	@Override
	public List<ProductPrice> getAllProductPricesHasProductIdInSet(Set<Integer> productIds) {
		List<ProductPriceEntity> productPriceEntities = productPriceRepo.findAllProductIdInSet(productIds);
		List<ProductPrice> productPrices = productPriceEntities.parallelStream().map(x -> mapper.map(x, ProductPrice.class)).collect(Collectors.toList());
		return productPrices;
	}


	@Override
	public ProductPrice updateProductPriceByProductId(ProductPrice productPrice) {
		ProductPriceEntity originalProductPrice = productPriceRepo.findOneByProductId(productPrice.getProductId()).get();
		mapper.map(productPrice, originalProductPrice);
		ProductPriceEntity savedProductPriceEntity = productPriceRepo.save(originalProductPrice);
		return mapper.map(savedProductPriceEntity, ProductPrice.class);
	}

}
