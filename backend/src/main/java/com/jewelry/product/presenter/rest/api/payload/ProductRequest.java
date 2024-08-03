package com.jewelry.product.presenter.rest.api.payload;

import java.util.List;
import com.jewelry.product.presenter.rest.api.dto.GemstoneDto;
import com.jewelry.product.presenter.rest.api.dto.MetalTypeDto;
import com.jewelry.product.presenter.rest.api.dto.ProductPriceDto;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {

	@NotEmpty(message = "Product name is required !")
	@Size(min = 5, max = 255, message = "Title name must have length from 5 to 255")
    private String name;

	@Nullable
	private String description;

	@NotEmpty(message = "Product type is required !")
	private String productType;

	@NotEmpty(message = "Unitmeasure is required !")
	private String unitMeasure;

	@NotEmpty(message = "SaleStatus is required !")
	private String saleStatus;

	@PositiveOrZero(message = "The product quantity must equal or greater than 0")
	private Integer stockQuantity;

	@Nullable
	@Valid
	private List<GemstoneDto> gemstones;

	@Nullable
	@Valid
	private List<MetalTypeDto> metalTypes;

	@NotNull(message = "Product price cannot be null")
	@Valid
	private ProductPriceDto productPrice;


}

	
	
	
	
