package com.jewelry.metal.presenter.rest.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SilverPriceRateDto {

	private double silverOunceInVnd;

	private String gmtOuncePriceUsdUpdated;

	private double usdToVnd;

	private String gmtVndUpdated;

	private double gramToOunceFormula;

	private double silverGramInUsd;

	private double silverGramInVnd;
}
