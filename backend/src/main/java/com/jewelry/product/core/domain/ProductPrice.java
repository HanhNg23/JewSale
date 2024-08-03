package com.jewelry.product.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductPrice {
	private Integer productPriceId;
	
	private Integer productId;
			
	private Double totalMetalCost;
	
	private Double totalGemstoneCost;
	
	private Double laborCost;
	
	private Float markupPercentage;
	
	private Double salePrice;
}
