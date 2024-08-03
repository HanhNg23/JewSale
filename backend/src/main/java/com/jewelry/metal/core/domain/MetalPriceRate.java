package com.jewelry.metal.core.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MetalPriceRate {
	
	private Integer metalPriceRateId;
	
	private Integer metalTypeId;
	
	private Double profitSell; //percent rate
	 
	private Double profitBuy; //percent rate
	
	private Double exchangeRate;
	
	private Double internationalPrice;
	
	private Double metalPriceSpot;
	
	private Double sellingPrice;
	
	private Double buyingPrice;
	
	private LocalDateTime effectiveDate;
	
}
