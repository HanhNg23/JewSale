package com.jewelry.metal.core.usecase;

import java.io.IOException;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.metal.core.exception.MetalException;
import com.jewelry.metal.core.exception.MetalPriceRateApiException;
import com.jewelry.metal.infrastructure.metalapiclient.GoldPriceRate;
import com.jewelry.metal.infrastructure.metalapiclient.MetalPriceRateFetchApiClient;

import lombok.Value;

@Service
public class GetInternationalGoldPriceRateUsecase extends
		UseCase<GetInternationalGoldPriceRateUsecase.InputValues, GetInternationalGoldPriceRateUsecase.OutputValues> {

	private MetalPriceRateFetchApiClient metalPriceRateFetchApiClient;
	
	GetInternationalGoldPriceRateUsecase(MetalPriceRateFetchApiClient metalPriceRateFetchApiClient){
		this.metalPriceRateFetchApiClient = metalPriceRateFetchApiClient;
	}
	
	@Override
	public OutputValues execute(InputValues input) {
		
		try {
			GoldPriceRate goldPriceRate = Optional.ofNullable(metalPriceRateFetchApiClient.fetchGolPriceRate()).orElse(null);
			System.out.println("GOLD PRICE RATE " + goldPriceRate.toString());
			return new OutputValues(goldPriceRate);
		} catch (MetalPriceRateApiException | IOException e) {
			throw new MetalException("Sorry Error to fetch api gold !");
		}	
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final GoldPriceRate goldPriceRate;
	}

}
