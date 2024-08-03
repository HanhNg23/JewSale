package com.jewelry.product.core.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Pageable;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;

public interface ProductRepository {

	public List<Product> getAllProductsWithSearchSortFilter(
			String searchKeyword,
			Set<String> productType,
			Set<String> metalGroup,
			Set<String> metalType,
			Set<String> gemstoneType,
			Set<String> saleStatus,
			Pageable pageable);
	
	public List<Product> getAllProductInSet(Set<Integer> productIdsSet);
	
	public Product getProductById(int productId);

	public Product saveProduct(Product product);
	
	public Product updateProduct(Product product);

	public void deleteProduct(int productId);

	public Optional<ProductEntity> getProductByName(String productName);

}
