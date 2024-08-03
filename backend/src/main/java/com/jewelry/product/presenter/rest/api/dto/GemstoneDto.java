package com.jewelry.product.presenter.rest.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GemstoneDto{
	@Nullable
	private Integer gemstoneId;
	
	@NotBlank(message = "Serial numeber of gemstone cannot be empty")
	@Pattern(regexp = "^G00\\d+$", message = "Serial number must start with 'G00' followed by digits")
	private String seriaNumber;
	
	@NotBlank(message = "Gemstone name cannot be empty")
	private String gemstoneName;
	
	@NotBlank(message = "Stone color cannot be empty")
	private String stoneColor;
	
	@NotBlank(message = "Stone cut cannot be empty")
	private String stoneCut;
	
	@NotBlank(message = "Stone clarity cannot be empty")
	private String stoneClarity;
	
	@Positive(message = "The carat weight must be greater 0")
	private Double caratWeight;
	
	@PositiveOrZero(message = "The gemstone price must be 0 or greater than 0")
	private Double gemstonePrice;
	
	@NotBlank(message = "The gemstone type must not be empty")
	private String gemstoneType;
	
	@Nullable
	private String certificateNo;
	
	@Nullable
	private String certificateType;
	
	@Positive(message = "The pieces of gemstone must greater than 0")
	private Integer pieces;
	 
	@PositiveOrZero
	@JsonIgnore
	private Float materialWeight = 1.0F;
	
	@PositiveOrZero
	@JsonIgnore
	@Nullable
	private Float materialSize;
	
	
}