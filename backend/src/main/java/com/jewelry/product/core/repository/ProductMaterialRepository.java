package com.jewelry.product.core.repository;

import java.util.List;
import java.util.Optional;

import com.jewelry.product.core.domain.ProductMaterial;


public interface ProductMaterialRepository {
	Optional<ProductMaterial> getProductMaterial(int productMaterialId);
	List<ProductMaterial>  getAllProductMaterialsIsMetalFalse();
	List<ProductMaterial> getAllProductMaterialsByProductId(int productId);
	List<ProductMaterial> getAllProductMaterialsIsMetalTrue();
	Optional<ProductMaterial> insertNewProductMaterialToProdut(ProductMaterial productId);
	Optional<ProductMaterial> updateProductMaterial(ProductMaterial productMaterialId);
	Optional<ProductMaterial> deleteProductMaterial(int productMaterialId);

}
