package com.jewelry.metal.presenter.rest.api.payload;

import com.jewelry.metal.presenter.rest.api.dto.MetalPriceUpdateDto;
import com.jewelry.metal.presenter.rest.api.dto.MetalTypeUpdateDto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class MetaUpdateRequest {

	@NotNull(message = "Metal type is required")
	@Valid
	MetalTypeUpdateDto metalType;
	
	@NotNull(message = "Metal price is required")
	@Valid
	MetalPriceUpdateDto metalPrice;
}
