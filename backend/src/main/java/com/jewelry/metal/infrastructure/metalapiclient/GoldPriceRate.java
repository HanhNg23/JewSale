package com.jewelry.metal.infrastructure.metalapiclient;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jewelry.metal.core.domain.MetalFetchObject;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class GoldPriceRate extends MetalFetchObject<GoldPriceRate>{
	@JsonProperty("ounce_price_usd")
    private double ouncePriceUsd;

    @JsonProperty("gmt_ounce_price_usd_updated")
    private String gmtOuncePriceUsdUpdated; //Gold Rate Updated according to GMT time

    @JsonProperty("usd_to_vnd")
    private double usdToVnd;

    @JsonProperty("gmt_vnd_updated")
    private String gmtVndUpdated;

    @JsonProperty("ounce_in_vnd")
    private double ounceInVnd;

    @JsonProperty("gram_to_ounce_formula")
    private double gramToOunceFormula;

    @JsonProperty("gram_in_usd")
    private double gramInUsd;

    @JsonProperty("gram_in_vnd")
    private double gramInVnd;

	@Override
	public GoldPriceRate getThis() {
		return this;
	}

	@Override
	public Double getExchangeRateUsdToVnd() {
		return this.getUsdToVnd();
	}

	@Override
	public Double getInternationOuncePriceUsd() {
		return this.getOuncePriceUsd();
	}

	@Override
	public double getPriceGramInVnd() {
		return this.getGramInVnd();
	}

	
}
