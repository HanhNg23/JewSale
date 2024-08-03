package com.jewelry.product.presenter.rest.api.dto;


import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPriceDto{
	@Nullable
	private Integer productPriceId;
	
	@PositiveOrZero
	private Float totalMetalCost = 0F;

	@PositiveOrZero
	private Float totalGemstoneCost = 0F;

	@PositiveOrZero
	private Float laborCost;

	@PositiveOrZero
	@Min(message = "Min value is 0", value = 0)
	private Float markupPercentage;

	@PositiveOrZero
	private float salePrice;
}
