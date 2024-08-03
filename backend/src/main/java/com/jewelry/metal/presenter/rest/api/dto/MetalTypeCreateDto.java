package com.jewelry.metal.presenter.rest.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Value;

@Value
public class MetalTypeCreateDto {
	
	@NotNull(message = "Metal type name is required")
	@Schema(example = "Metal type name", description = "The name of metal")
	private String metalTypeName;

	@Positive(message = "The percentage of metal purity must be smaller or equal 100 and larger than 0")
	@Max(value = 100, message = "The max percentage of metal purity must be 100")
	@Schema(example = "99.99", description = "Percentage of purity")
	private Double metalPurity;

	@NotNull(message = "Metal group name name is required")
	@Schema(example = "vàng", description = "The metal group name")
	private String metalGroupName;
	
	@Schema(example = "false", description = "Allow metal auto update price through fetch api. Default is false")
	@NotNull
	private Boolean isAutoUpdatePrice;

	@Schema(example = "false", description = "Allow metal show price on monitor. Default is false")
	@NotNull
	private Boolean isOnMonitor;
}
