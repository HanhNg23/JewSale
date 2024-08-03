package com.jewelry.product.presenter.rest.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import com.jewelry.common.constant.Path;
import com.jewelry.common.utils.UploadUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import com.jewelry.common.usecase.UsecaseExecutor;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductImage;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.usecase.CreateProductUsecase;
import com.jewelry.product.core.usecase.DeleteProductUsecase;
import com.jewelry.product.core.usecase.GetAllFilterOptions;
import com.jewelry.product.core.usecase.GetAllProductsUsecase;
import com.jewelry.product.core.usecase.GetProductUsecase;
import com.jewelry.product.core.usecase.UpdateProductUsecase;
import com.jewelry.product.presenter.rest.api.payload.ProductRequest;
import com.jewelry.product.presenter.rest.api.payload.ProductRequestUpdate;

import lombok.AllArgsConstructor;

import org.springframework.web.multipart.MultipartFile;

@Component
@AllArgsConstructor
public class ProductController implements ProductResource{
	private UsecaseExecutor usecaseExecutor;
	private ModelMapper mapper;
	private GetAllProductsUsecase getAllProductsUsecase;
	private CreateProductUsecase createProductUsecase;
	private GetProductUsecase getProductUsecase;
	private GetAllFilterOptions getAllFilterOptions;
	private UpdateProductUsecase updateProductUsecase;
	private DeleteProductUsecase deleteProductUsecase;
	
	@Override
	public CompletableFuture<List<Product>> getAllProductsWithSearchSortFilter(
			Optional<String> searchKeyword,
			Optional<Set<String>> productType, 
			Optional<Set<String>> metalGroup, 
			Optional<Set<String>> metalTypes,
			Optional<Set<String>> gemstoneType, 
			Optional<Set<String>> saleStatus, 
			Optional<Sort.Direction> sortBy,
			Optional<Integer> pageNo,
			Optional<Integer> pageSize) {
		
		String searchKeywordInput = searchKeyword.orElse("");
		Set<String> productTypeInput = productType.orElse(Set.of());
		Set<String> metalGroupInput = metalGroup.orElse(Set.of());
		Set<String> metalTypeInput = metalTypes.orElse(Set.of());
		Set<String> gemstoneTypeInput = gemstoneType.orElse(Set.of());
		Set<String> saleStatusInput = saleStatus.orElse(Set.of("sẵn bán", "hết hàng", "ngừng kinh doanh"));
		Sort.Direction sortByInput = sortBy.orElse(Sort.Direction.ASC);
		int page = pageNo.orElse(0);
		int size = pageSize.orElse(9);
		
		return usecaseExecutor.execute(getAllProductsUsecase, new GetAllProductsUsecase.InputValues(
				searchKeywordInput, 
				productTypeInput,
				metalGroupInput, 
				metalTypeInput,
				gemstoneTypeInput, 
				saleStatusInput,
				sortByInput,
				page,
				size
				), (outputValues) -> outputValues.getProducts());
	}

	@Override
	public CompletableFuture<?> insertNewProduct(ProductRequest productRequest, List<MultipartFile> imgFiles) {
		System.out.println("Product : " + productRequest.toString());

		Product product = mapper.map(productRequest, Product.class);

		if(imgFiles != null) {
			List<ProductImage> imgPaths = new ArrayList<>();
			imgFiles.forEach(imgFile->{
				String imgPath = UploadUtils.storeImage(imgFile, Path.IMAGE_PATH);
				ProductImage image = ProductImage.builder().url(imgPath).build();
				imgPaths.add(image);
				System.out.println("IMAGE PATHS: " + imgPath);
			});
			product.setImageUrls(imgPaths);
		}
		
		List<ProductMaterial> productMaterials = new ArrayList<>();
		
		// Mapping gemstones to ProductMaterial list
		List<ProductMaterial> stoneMaterials = productRequest.getGemstones() != null ? productRequest.getGemstones().parallelStream().map(x -> {
		        ProductMaterial stoneMaterial = new ProductMaterial();
		        stoneMaterial.setGemStone(mapper.map(x, GemStone.class));
		        stoneMaterial.setMetal(false);
		        stoneMaterial.setMaterialWeight(x.getMaterialWeight());
		        stoneMaterial.setMaterialSize(Optional.ofNullable(x.getMaterialSize()).orElse(null));
		        return stoneMaterial;
		    }).collect(Collectors.toList()) 
		    : List.of();

		// Mapping metal types to ProductMaterial list
		List<ProductMaterial> metalMaterials = productRequest.getMetalTypes() != null ? productRequest.getMetalTypes().parallelStream().map(x -> {
		        ProductMaterial metalMaterial = new ProductMaterial();
		        metalMaterial.setMetalType(mapper.map(x, MetalType.class));
		        metalMaterial.setMaterialWeight(x.getMaterialWeight());
		        metalMaterial.setMetal(true);
		        metalMaterial.setMaterialSize(Optional.ofNullable(x.getMaterialSize()).orElse(null));
		        return metalMaterial;
		    }).collect(Collectors.toList()) 
		    : List.of();

		productMaterials.addAll(metalMaterials);
		productMaterials.addAll(stoneMaterials);
		product.setProductMaterials(productMaterials);
		
		System.out.println("PRODUCT : " + product.toString());
		
		return usecaseExecutor.execute(createProductUsecase, new CreateProductUsecase.InputValues(product), (outputValues) -> ResponseEntity.ok(outputValues.getProduct().getProductId()));
	}


	@Override
	public CompletableFuture<Product> getProductDetails(int id) {
		return usecaseExecutor.execute(getProductUsecase, new GetProductUsecase.InputValues(id), (output) -> output.getProduct());
	}

	@Override
	public CompletableFuture<?> getAllFilterOptions() {
		return usecaseExecutor.execute(getAllFilterOptions, new GetAllFilterOptions.InputValues(), 
				(outputValues) -> outputValues);
	}

	@Override
	public CompletableFuture<?> updateProduct(int id, ProductRequestUpdate productRequest, List<MultipartFile> imgFiles) {
		System.out.println("Product : " + productRequest.toString());

		Product product = mapper.map(productRequest, Product.class);

		if(imgFiles != null) {
			List<ProductImage> imgPaths = new ArrayList<>();
			imgFiles.forEach(imgFile->{
				String imgPath = UploadUtils.storeImage(imgFile, Path.IMAGE_PATH);
				ProductImage image = ProductImage.builder().url(imgPath).build();
				imgPaths.add(image);
				System.out.println("IMAGE PATHS: " + imgPath);
			});
			product.setImageUrls(imgPaths);
		
		}
		
		
		List<ProductMaterial> productMaterials = new ArrayList<>();
		
		// Mapping gemstones to ProductMaterial list
		List<ProductMaterial> stoneMaterials = productRequest.getGemstones() != null ? productRequest.getGemstones().parallelStream().map(x -> {
		        ProductMaterial stoneMaterial = new ProductMaterial();
		        stoneMaterial.setGemStone(mapper.map(x, GemStone.class));
		        stoneMaterial.setMetal(false);
		        stoneMaterial.setMaterialWeight(x.getMaterialWeight());
		        stoneMaterial.setMaterialSize(Optional.ofNullable(x.getMaterialSize()).orElse(null));
		        return stoneMaterial;
		    }).collect(Collectors.toList()) 
		    : List.of();

		// Mapping metal types to ProductMaterial list
		List<ProductMaterial> metalMaterials = productRequest.getMetalTypes() != null ? productRequest.getMetalTypes().parallelStream().map(x -> {
		        ProductMaterial metalMaterial = new ProductMaterial();
		        metalMaterial.setMetalType(mapper.map(x, MetalType.class));
		        metalMaterial.setMaterialWeight(x.getMaterialWeight());
		        metalMaterial.setMetal(true);
		        metalMaterial.setMaterialSize(Optional.ofNullable(x.getMaterialSize()).orElse(null));
		        return metalMaterial;
		    }).collect(Collectors.toList()) 
		    : List.of();

		productMaterials.addAll(metalMaterials);
		productMaterials.addAll(stoneMaterials);
		product.setProductMaterials(productMaterials);
		
		System.out.println("PRODUCT : " + product.toString());
		
		return usecaseExecutor.execute(updateProductUsecase, new UpdateProductUsecase.InputValues(id, product), (outputValues) -> ResponseEntity.ok(outputValues.getProduct().getProductId()));
	}

	@Override
	public CompletableFuture<?> deleteProduct(int id) {
		return usecaseExecutor.execute(deleteProductUsecase, new DeleteProductUsecase.InputValues(id), (outputValues) -> ResponseEntity.ok(outputValues));
	}






}
