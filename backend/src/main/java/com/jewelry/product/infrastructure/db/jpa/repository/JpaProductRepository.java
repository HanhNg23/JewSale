/* (C)2024 */
package com.jewelry.product.infrastructure.db.jpa.repository;


import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;

public interface JpaProductRepository extends JpaRepository<ProductEntity, Integer>, JpaSpecificationExecutor<ProductEntity> {
		
	@Query("SELECT p FROM ProductEntity p WHERE LOWER(p.name) = LOWER(:productName)")
	Optional<ProductEntity> findProductByName(@Param("productName") String productName);
	
	@Query("SELECT p FROM ProductEntity p WHERE p.productId IN :productIds")
	List<ProductEntity> findAllProductsInSet(@Param("productIds") Set<Integer> productIds);

	@Modifying
	@Query("UPDATE ProductEntity p SET p.name = :productName WHERE p.productId = :producId")
	void updateProductNameWithProductId(@Param("productName") String formatedProductName, @Param("producId") int productId);
}
