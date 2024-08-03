package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jewelry.product.infrastructure.db.jpa.entity.ProductPriceEntity;

public interface JpaProductPriceRepository extends JpaRepository<ProductPriceEntity, Integer> {

	@Query("SELECT pr FROM ProductPriceEntity pr JOIN FETCH pr.product p WHERE p.productId = :productId")
	Optional<ProductPriceEntity> findOneByProductId(@Param("productId") int productId);
	
	@Query("SELECT pr FROM ProductPriceEntity pr JOIN FETCH pr.product p WHERE p.productId IN :productIdsSet")
	List<ProductPriceEntity> findAllProductIdInSet(@Param("productIdsSet")Set<Integer> productIdsSet);
}
