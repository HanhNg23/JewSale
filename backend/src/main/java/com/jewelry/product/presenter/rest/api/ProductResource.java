package com.jewelry.product.presenter.rest.api;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.presenter.rest.api.payload.ProductRequest;
import com.jewelry.product.presenter.rest.api.payload.ProductRequestUpdate;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
@Tag(name = "Product")
public interface ProductResource {
	
	@GetMapping("/all")
    CompletableFuture<List<Product>> getAllProductsWithSearchSortFilter(
			@RequestParam(required = false) Optional<String> searchKeyword,
			@RequestParam(required = false) Optional<Set<String>> productType,
			@RequestParam(required = false) Optional<Set<String>> metalGroup,
			@RequestParam(required = false) Optional<Set<String>> metalTypes,
			@RequestParam(required = false) Optional<Set<String>> gemstoneType,
			@RequestParam(required = false) Optional<Set<String>> saleStatus,
			@RequestParam(required = false, value = "sortBy", defaultValue = "DESC") Optional<Sort.Direction> sortBy,
			@RequestParam(required = false, value = "pageNo", defaultValue = "0") Optional<Integer> pageNo,
			@RequestParam(required = false, value = "pageSize", defaultValue = "9") Optional<Integer> pageSize);
	

	@PostMapping(value="/product", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	CompletableFuture<?> insertNewProduct(@RequestPart(required = true) @Validated ProductRequest productRequest, @RequestPart(required = false) List<MultipartFile> imgFiles);
	
	@GetMapping("/{id}")
    CompletableFuture<Product> getProductDetails(@PathVariable("id") int id);
	
	@GetMapping("/filter-options")
    CompletableFuture<?> getAllFilterOptions();
	
	@PutMapping(value =  "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	CompletableFuture<?> updateProduct(@PathVariable("id") int id, @RequestPart(required = true) @Validated ProductRequestUpdate productRequest, @RequestPart(required = false) List<MultipartFile> imgFiles);
	
	
	@DeleteMapping("/{id}")
    CompletableFuture<?> deleteProduct(@PathVariable("id") int id);

}
