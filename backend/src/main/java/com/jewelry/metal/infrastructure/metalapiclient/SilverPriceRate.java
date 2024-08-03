package com.jewelry.metal.infrastructure.metalapiclient;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jewelry.metal.core.domain.MetalFetchObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class SilverPriceRate extends MetalFetchObject<SilverPriceRate>{
	@JsonProperty("silver_ounce_in_vnd")
	private double silverOunceInVnd;
	
    @JsonProperty("gmt_ounce_price_usd_updated")
    private String gmtOuncePriceUsdUpdated;

    @JsonProperty("usd_to_vnd")
    private double usdToVnd;

    @JsonProperty("gmt_vnd_updated")
    private String gmtVndUpdated;

    @JsonProperty("gram_to_ounce_formula")
    private double gramToOunceFormula;

    @JsonProperty("silver_gram_in_usd")
    private double silverGramInUsd;

    @JsonProperty("silver_gram_in_vnd")
    private double silverGramInVnd;

	@Override
	public SilverPriceRate getThis() {
		return this;
	}

	@Override
	public Double getExchangeRateUsdToVnd() {
		return this.getUsdToVnd();
	}

	@Override
	public Double getInternationOuncePriceUsd() {
		return this.getSilverGramInVnd() / this.getGramToOunceFormula();
	}

	@Override
	public double getPriceGramInVnd() {
		return this.getSilverGramInVnd();
	}


}

