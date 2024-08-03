package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductMaterialEntity;

@Repository
public class ProductMaterialRepositoryImpl implements ProductMaterialRepository {
	private JpaProductMaterialRepository productMaterialRepo;
	private ModelMapper mapper;
	
	public ProductMaterialRepositoryImpl(JpaProductMaterialRepository productMaterialRepo, ModelMapper mapper ) {
		this.productMaterialRepo = productMaterialRepo;
		this.mapper = mapper;
	}
	
	@Override
	public Optional<ProductMaterial> getProductMaterial(int productMaterialId) {
		ProductMaterialEntity productMaterialEntity = productMaterialRepo.findById(productMaterialId).orElse(null);
		return productMaterialEntity != null ? Optional.ofNullable(mapper.map(productMaterialEntity, ProductMaterial.class)) : Optional.empty();
	}

	@Override
	public List<ProductMaterial> getAllProductMaterialsByProductId(int productId) {
		List<ProductMaterialEntity> productMaterialEntities = productMaterialRepo.findAllByProductId(productId);
		List<ProductMaterial> productMaterials = productMaterialEntities.parallelStream().map(x -> mapper.map(x, ProductMaterial.class)).collect(Collectors.toList());
		return productMaterials;
	}

	@Override
	public Optional<ProductMaterial> insertNewProductMaterialToProdut(ProductMaterial productMaterial) {
		ProductMaterialEntity productMaterialEntity = mapper.map(productMaterial, ProductMaterialEntity.class);
		ProductMaterialEntity savedProductMaterialEntity = productMaterialRepo.save(productMaterialEntity);
		return Optional.ofNullable(mapper.map(savedProductMaterialEntity, ProductMaterial.class));
	}

	@Override
	public Optional<ProductMaterial> updateProductMaterial(ProductMaterial productMaterial) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public Optional<ProductMaterial> deleteProductMaterial(int productMaterialId) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}

	@Override
	public List<ProductMaterial> getAllProductMaterialsIsMetalTrue() {
		List<ProductMaterialEntity> productMaterialEntities = productMaterialRepo.findAllProductMaterialIsMetal();
		List<ProductMaterial> productMaterials = productMaterialEntities.parallelStream().map(x -> mapper.map(x, ProductMaterial.class)).collect(Collectors.toList());
		return productMaterials;
	}

	@Override
	public List<ProductMaterial> getAllProductMaterialsIsMetalFalse() {
		List<ProductMaterialEntity> productMaterialEntities = productMaterialRepo.findAllProductMaterialIsNotMetal();
		List<ProductMaterial> productMaterials = productMaterialEntities.parallelStream().map(x -> mapper.map(x, ProductMaterial.class)).collect(Collectors.toList());
		return productMaterials;
	}

}
