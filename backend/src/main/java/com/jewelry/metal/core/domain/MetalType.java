package com.jewelry.metal.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MetalType {

	private Integer metalTypeId;

	private String metalTypeName;

	private Double metalPurity;

	private String metalGroupName;
	
	private boolean isAutoUpdatePrice;

	private boolean isOnMonitor;
	
	private MetalPriceRate currentMetalPriceRate;
}
