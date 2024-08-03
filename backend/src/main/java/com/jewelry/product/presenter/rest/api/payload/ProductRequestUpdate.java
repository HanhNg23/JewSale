package com.jewelry.product.presenter.rest.api.payload;

import java.util.List;

import com.jewelry.product.presenter.rest.api.dto.GemstoneDto;
import com.jewelry.product.presenter.rest.api.dto.MetalTypeDto;
import com.jewelry.product.presenter.rest.api.dto.ProductPriceDto;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestUpdate {
	@NotNull
	private Integer productId;
	
	@NotNull
	private String name;
	
	@Nullable
	private String description;

	@NotEmpty(message = "Product type is required !")
	private String productType;

	@NotEmpty(message = "Unitmeasure is required !")
	private String unitMeasure;

	@NotEmpty(message = "SaleStatus is required !")
	private String saleStatus;
	
	@NotNull
	@PositiveOrZero(message = "The product quantity must equal or greater than 0")
	@Min(value = 0)
	private Integer stockQuantity;
	
	@Nullable
	private List<GemstoneDto> gemstones;

	@Nullable
	private List<MetalTypeDto> metalTypes;

	@NotNull
	private ProductPriceDto productPrice;
	

}
