package com.jewelry.product.infrastructure.db.jpa.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jewelry.product.infrastructure.db.jpa.entity.ProductMaterialEntity;

public interface JpaProductMaterialRepository extends JpaRepository<ProductMaterialEntity, Integer>{
	
	@Query("SELECT pm FROM ProductMaterialEntity pm JOIN FETCH pm.product p WHERE p.productId = :productId")
	List<ProductMaterialEntity> findAllByProductId(@Param("productId") int productId);
	
	@Query("SELECT pm FROM ProductMaterialEntity pm WHERE pm.isMetal = TRUE")
	List<ProductMaterialEntity> findAllProductMaterialIsMetal();
	
	@Query("SELECT pm FROM ProductMaterialEntity pm WHERE pm.isMetal = FALSE")
	List<ProductMaterialEntity> findAllProductMaterialIsNotMetal();

}
