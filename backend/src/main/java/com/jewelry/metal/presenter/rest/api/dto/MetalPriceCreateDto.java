package com.jewelry.metal.presenter.rest.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Value;

@Value
public class MetalPriceCreateDto {

	@PositiveOrZero(message = "Profit sell rate must be zero or positive")
	@Schema(description = "Percent rate of profit sell", example = "10.5")
	@NotNull
	private Double profitSell; // percent rate

	@PositiveOrZero(message = "Profit buy rate must be zero or positive")
	@Schema(description = "Percent rate of profit buy", example = "8.5")
	@NotNull
	private Double profitBuy; // percent rate


	@Positive(message = "Metal price spot must be positive")
	@Min(value = 1000, message = "The selling price must be upper from 1000 (VND)")
	@Schema(description = "Spot price of the metal in VND per gram", example = "500000.0")
	@NotNull
	private Double metalPriceSpot;


}
