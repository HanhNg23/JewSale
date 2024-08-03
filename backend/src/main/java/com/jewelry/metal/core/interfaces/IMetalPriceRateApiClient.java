package com.jewelry.metal.core.interfaces;

import java.io.IOException;
import com.jewelry.metal.core.domain.MetalFetchObject;
import com.jewelry.metal.core.exception.MetalPriceRateApiException;
import com.jewelry.metal.infrastructure.metalapiclient.GoldPriceRate;
import com.jewelry.metal.infrastructure.metalapiclient.SilverPriceRate;

public interface IMetalPriceRateApiClient {
	MetalFetchObject<GoldPriceRate> fetchGolPriceRate() throws IOException, MetalPriceRateApiException ;
	
	MetalFetchObject<SilverPriceRate> fetchSilverPriceRate() throws IOException, MetalPriceRateApiException ;
}
