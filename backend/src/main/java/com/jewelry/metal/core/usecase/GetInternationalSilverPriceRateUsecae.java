package com.jewelry.metal.core.usecase;

import java.io.IOException;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.metal.core.exception.MetalException;
import com.jewelry.metal.core.exception.MetalPriceRateApiException;
import com.jewelry.metal.infrastructure.metalapiclient.MetalPriceRateFetchApiClient;
import com.jewelry.metal.infrastructure.metalapiclient.SilverPriceRate;
import lombok.Value;

@Service
public class GetInternationalSilverPriceRateUsecae extends
		UseCase<GetInternationalSilverPriceRateUsecae.InputValues, GetInternationalSilverPriceRateUsecae.OutputValues> {

	private MetalPriceRateFetchApiClient metalPriceRateFetchApiClient;

	GetInternationalSilverPriceRateUsecae(MetalPriceRateFetchApiClient metalPriceRateFetchApiClient) {
		this.metalPriceRateFetchApiClient = metalPriceRateFetchApiClient;
	}

	@Override
	public OutputValues execute(InputValues input) {
		try {
			SilverPriceRate silverPriceRate = Optional.ofNullable(metalPriceRateFetchApiClient.fetchSilverPriceRate())
					.orElse(null);
			return new OutputValues(silverPriceRate);
		} catch (MetalPriceRateApiException | IOException e) {
			throw new MetalException("Sorry Error to fetch api silver !");
		}
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final SilverPriceRate silverPriceRate;
	}

}
