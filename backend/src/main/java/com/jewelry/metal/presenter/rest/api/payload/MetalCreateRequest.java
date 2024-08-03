package com.jewelry.metal.presenter.rest.api.payload;

import com.jewelry.metal.presenter.rest.api.dto.MetalPriceCreateDto;
import com.jewelry.metal.presenter.rest.api.dto.MetalTypeCreateDto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class MetalCreateRequest {
	
	@NotNull(message = "Metal type object is required")
	@Valid
	MetalTypeCreateDto metalType;

	@NotNull(message = "Metal price object is required")
	@Valid
	MetalPriceCreateDto metalPrice;

}


