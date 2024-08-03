package com.jewelry.product.core.domain;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
	
	private Integer productId;
	
	private String name;
	
	private String description;
	
	private String productType;
	
	private String unitMeasure;
	
	private String saleStatus;
	
	private Integer stockQuantity;
		
	private LocalDateTime updatedAt;
	
	private Integer updatedBy;
	
	private List<ProductMaterial> productMaterials;
	
	private ProductPrice productPrice;
	
	private List<ProductImage> imageUrls;
	
}
