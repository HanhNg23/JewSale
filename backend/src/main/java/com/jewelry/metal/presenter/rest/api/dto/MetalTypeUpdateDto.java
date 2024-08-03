package com.jewelry.metal.presenter.rest.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class MetalTypeUpdateDto {
	
	@Schema(example = "vàng", description = "The metal group name")
	private String metalGroupName;
	
	@Schema(example = "false", description = "Allow metal auto update price through fetch api. Default is false")
	@NotNull
	private Boolean isAutoUpdatePrice;

	@Schema(example = "false", description = "Allow metal show price on monitor. Default is false")
	@NotNull
	private Boolean isOnMonitor;
}
