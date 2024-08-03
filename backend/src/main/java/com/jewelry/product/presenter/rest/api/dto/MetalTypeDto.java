package com.jewelry.product.presenter.rest.api.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MetalTypeDto{
	@Nullable
	private Integer metalTypeId;
	
	@NotBlank(message = "Metal type name is required")
	private String metalTypeName;
	
	@PositiveOrZero
	@Min(message = "Min value is 0", value = 0)
	@Max(message = "Max value is 1", value = 1)
	private Float metalPurity;
	
	@Nullable
	private String metalGroupName;
	
	@Positive(message = "The metal weight must be greater than 0")
	@NotNull
	private Float materialWeight;
	
	@PositiveOrZero
	@Nullable
	@JsonIgnore
	private Float materialSize;
}
