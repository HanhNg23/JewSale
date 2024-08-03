package com.jewelry.product.core.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.jewelry.product.core.domain.ProductPrice;

public interface ProductPriceRepository {
	Optional<ProductPrice> getProductPrice(int productId);
	List<ProductPrice> getAllProductPricesHasProductIdInSet(Set<Integer> productIds);
	ProductPrice saveProductPrice(ProductPrice productPrice);
	ProductPrice updateProductPriceByProductId(ProductPrice productPrice);
}
