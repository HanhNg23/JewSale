package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductImageEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductMaterialEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductPriceEntity;
import com.jewelry.product.service.ProductService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.GemstoneEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;

@Repository
@Transactional
public class ProductRepositoryImpl implements ProductRepository {
	private JpaProductRepository productRepo;
	private JpaProductPriceRepository productPriceRepo;
	private JpaGemstoneRepository gemstoneRepo;
	private MetalTypeRepository metalTypeRepo;
	private ModelMapper mapper;
	@PersistenceContext
    private EntityManager entityManager;
	
	public ProductRepositoryImpl(
			JpaProductRepository productRepo,
			JpaProductPriceRepository productPriceRepo,
			JpaGemstoneRepository gemstoneRepo,
			MetalTypeRepository metalTypeRepo,
			ModelMapper mapper) {
		this.productRepo = productRepo;
		this.mapper = mapper;
		this.productPriceRepo = productPriceRepo;
		this.gemstoneRepo = gemstoneRepo;
		this.metalTypeRepo = metalTypeRepo;
	}

	@Override
	public List<Product> getAllProductsWithSearchSortFilter(
			String searchKeyword,
			Set<String> productType,
			Set<String> metalGroup,
			Set<String> metalType,
			Set<String> gemstoneType,
			Set<String> saleStatus,
			Pageable pageable) {
		Specification<ProductEntity> spec = Specification.where(
				ProductSpecifications.hasSearchKeyword(searchKeyword)
						.and(ProductSpecifications.filterByProductType(productType))
						.and(ProductSpecifications.filterByMetalGroupType(metalGroup))
						.and(ProductSpecifications.filterByMetalType(metalType))
						.and(ProductSpecifications.filterByGemstoneName(gemstoneType))
						.and(ProductSpecifications.hasSaleStatus(saleStatus)));
		Page<ProductEntity> productEntities = productRepo.findAll(spec, pageable);
		if(productEntities != null && productEntities.getNumberOfElements() > 0) {
			List<Product> productsList = new ArrayList<Product>();
			productEntities.getContent().forEach(p -> {
				productsList.add(mapper.map(p, Product.class));
			});
			return productsList;
		}
		else return Collections.emptyList();		
	}

	@Override
	public Product getProductById(int id) {
		ProductEntity productEntity = productRepo.findById(id).orElse(null);
		return productEntity != null ? this.productMapperFull(productEntity) : null;
	}

	@Override
	@Transactional
	public Product saveProduct(Product product) {
		// Map Product to ProductEntity
		ProductEntity productEntity = mapper.map(product, ProductEntity.class);
		
		if(productEntity.getImages() != null && !productEntity.getImages().isEmpty()) {
			productEntity.getImages().forEach(image -> {
				image.setProduct(productEntity);
			});
		}
		
		// Ensure ProductPriceEntity is properly set and associated with ProductEntity
        ProductPriceEntity productPrice = productEntity.getProductPrice();
        if (productPrice != null) {
            productPrice.setProduct(productEntity); // Set the bidirectional relationship
        }
        productEntity.setProductPrice(productPrice);
		productEntity.getProductMaterials().parallelStream().forEach(item -> {
			item.setProduct(productEntity);
		});
		
		// Save ProductEntity and get the saved entity
		ProductEntity savedProductEntity = entityManager.merge(productEntity);
		String productNameIdentifier = ProductService.generateProductIdentifier(savedProductEntity.getName(), savedProductEntity.getProductId());
		savedProductEntity.setName(productNameIdentifier);
		return this.productMapperFull(savedProductEntity);
	}

	@Override
	public void deleteProduct(int productId) {
		ProductEntity productEntity = productRepo.findById(productId).get();

		//Delte gemstone seperately
		List<ProductMaterialEntity> gemstonesOriginal = productEntity.getProductMaterials().stream().parallel()
				.filter(x -> !x.isMetal()).toList();
		
		if (gemstonesOriginal != null && !gemstonesOriginal.isEmpty()) {
			Set<Integer> gemstoneIdsOriginalSet = gemstonesOriginal.parallelStream().map(x -> x.getMaterialId())
					.collect(Collectors.toSet());
			gemstoneRepo.deleteAllByIdsSet(gemstoneIdsOriginalSet);
		}
		
		productRepo.delete(productEntity);
	}

	@Override
	public Optional<ProductEntity> getProductByName(String productName) {
		return productRepo.findProductByName(productName.toLowerCase());
	}

	@Override
	@Transactional
	public Product updateProduct(Product product) {
			// Load the original product entity from the database
			ProductEntity productOriginal = productRepo.findById(product.getProductId()).get();
			
			// Get the original list of gemstones
			List<ProductMaterialEntity> gemstonesOriginal = productOriginal.getProductMaterials().stream()
					.filter(x -> !x.isMetal()).collect(Collectors.toList());
			
			// Delete the original gemstones that are not in the new list
			if (gemstonesOriginal != null && !gemstonesOriginal.isEmpty()) {
				Set<Integer> gemstoneIdsOriginalSet = gemstonesOriginal.stream().map(ProductMaterialEntity::getMaterialId).collect(Collectors.toSet());
				gemstoneRepo.deleteAllByIdsSet(gemstoneIdsOriginalSet);
			}
			
			// Update the list of product materials
			List<ProductMaterialEntity> currentMaterials = productOriginal.getProductMaterials();
	        List<ProductMaterialEntity> newMaterials = product.getProductMaterials().stream()
	                .map(mate -> {
	                    ProductMaterialEntity materialEntity = mapper.map(mate, ProductMaterialEntity.class);
	                    materialEntity.setProduct(productOriginal); // Ensure the product reference is set
	                    return materialEntity;
	                }).collect(Collectors.toList());
			currentMaterials.clear();
			currentMaterials.addAll(newMaterials);
			
			// Config product Image
			List<ProductImageEntity> currentImages = productOriginal.getImages();
			if (product.getImageUrls() != null) {
				List<ProductImageEntity> newImages = product.getImageUrls().parallelStream().map(image -> mapper.map(image, ProductImageEntity.class)).toList();
				if (newImages != null) {
					currentImages.clear();
					if (!newImages.isEmpty()) {
						currentImages.addAll(newImages);
						currentImages.parallelStream().forEach(image -> image.setProduct(productOriginal));
					}
				}
			}
			
			ProductPriceEntity newProductPriceEntity = mapper.map(product.getProductPrice(), ProductPriceEntity.class);
			ProductPriceEntity currentProductPrice = productPriceRepo.findOneByProductId(productOriginal.getProductId()).get();
			mapper.map(newProductPriceEntity, currentProductPrice);
			
			// Map the updated product fields to the original product entity
			mapper.map(product, productOriginal);
			productOriginal.setProductMaterials(currentMaterials);
			productOriginal.setImages(currentImages);
			productOriginal.setProductPrice(currentProductPrice);

			// Save the updated product entity
			ProductEntity savedProductEntity = productRepo.save(productOriginal);
			String productNameIdentifier = ProductService.generateProductIdentifier(savedProductEntity.getName(), savedProductEntity.getProductId());
		//	productRepo.updateProductNameWithProductId(productNameIdentifier, savedProductEntity.getProductId());
			// Map and return the updated product
			return this.productMapperFull(savedProductEntity);

	}

	@Override
	public List<Product> getAllProductInSet(Set<Integer> productIdsSet) {
		List<ProductEntity> productEntities = productRepo.findAllProductsInSet(productIdsSet);
		List<Product> products = productEntities.parallelStream().map(x -> this.productMapperFull(x)).collect(Collectors.toList());
		return products;
	}
	
	private Product productMapperFull(ProductEntity productEntity) {
		Product product = mapper.map(productEntity, Product.class);
		product.getProductMaterials().parallelStream().forEach(mate -> {
			if(mate.isMetal())
				mate.setMetalType(metalTypeRepo.getMetalTypeById(mate.getMaterialId()).get());
			else {
				GemstoneEntity gemstone = gemstoneRepo.findById(mate.getMaterialId()).orElse(null);
				if(gemstone != null)
					mate.setGemStone(mapper.map(gemstone, GemStone.class));
			}
		});
		return product;
	}

}
