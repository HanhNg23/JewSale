package com.jewelry.metal.presenter.rest.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GoldPriceRateDto {
	
	private double ouncePriceUsd;

    private String gmtOuncePriceUsdUpdated; //Gold Rate Updated according to GMT time

    private double usdToVnd;

    private String gmtVndUpdated;

    private double ounceInVnd;

    private double gramToOunceFormula;

    private double gramInUsd;

    private double gramInVnd;
}
