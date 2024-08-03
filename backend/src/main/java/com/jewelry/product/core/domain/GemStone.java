package com.jewelry.product.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GemStone {
	private Integer gemstoneId;
	
	private String seriaNumber;
	
	private String gemstoneName;
	
	private String stoneColor;
	
	private String stoneCut;
	
	private String stoneClarity;
	
	private Double caratWeight;
	
	private Double gemstonePrice;
	
	private String gemstoneType;

	private String certificateNo;
	
	private String certificateType;
	
	private Integer pieces;
	 
	
	 
	
}
