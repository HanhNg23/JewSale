package com.jewelry.metal.core.usecase;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import com.jewelry.common.constant.GroupName;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.common.events.EventPublisher;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.groupelement.core.domain.GroupElement;
import com.jewelry.groupelement.core.exception.NotInGroupException;
import com.jewelry.groupelement.core.service.GroupElementService;
import com.jewelry.metal.core.domain.MetalFetchObject;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalException;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.exception.MetalPriceRateApiException;
import com.jewelry.metal.core.interfaces.IMetalPriceRateApiClient;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.metal.infrastructure.metalapiclient.GoldPriceRate;
import com.jewelry.metal.infrastructure.metalapiclient.SilverPriceRate;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class UpdateMetalUsecase extends UseCase<UpdateMetalUsecase.InputValues, UpdateMetalUsecase.OutputValues> {
	private IMetalPriceRateApiClient metalPriceRateApiClient;
	private MetalTypeRepository metalTypeRepo;
	private MetalPriceRateRepository metalPriceRateRepo;
	private GroupElementService groupElementService;
	private EventPublisher eventPublish;
	private ModelMapper mapper;


	
	@Value
	public static class InputValues implements UseCase.InputValues {
		private final int metalTypeId;
		private final MetalType metalType;
		private final MetalPriceRate metalPriceRate;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final int metalTypeId;
		private final String metalTypeName;
		private final String metalGroupName;
	}

	@Override
	public OutputValues execute(InputValues input) {

		MetalType metalTypeToUpdate = metalTypeRepo.getMetalTypeById(input.metalTypeId).orElse(null);
		if (metalTypeToUpdate == null)
			throw new MetalNotFoundException("Not found metal id " + input.metalTypeId);
		MetalPriceRate metalPriceRateToUpdate = metalPriceRateRepo
				.getCurrentMetalPriceRate(metalTypeToUpdate.getMetalTypeName()).orElse(null);
		if (metalPriceRateToUpdate == null)
			throw new MetalException("Error to update metal price.");

		MetalType metalTypeInput = input.getMetalType();
		MetalPriceRate currentMetalPriceRateInput = input.getMetalPriceRate();

		mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

		mapper.map(metalTypeInput, metalTypeToUpdate);

		mapper.map(currentMetalPriceRateInput, metalPriceRateToUpdate);

		// Check and insert new element to group
		try {
			GroupElement element = groupElementService.getElementInGroup(metalTypeToUpdate.getMetalGroupName(),
					GroupName.METAL_GROUP.getDisplayName());
			if (element == null) {
				groupElementService.insertNewElementToGroup(metalTypeToUpdate.getMetalGroupName(),
						GroupName.METAL_GROUP.getDisplayName());
			}
		} catch (NotInGroupException e) {

		}

		// Fetch metal price rates from API
		fetchMetalPriceRateFromApi(metalTypeToUpdate, metalPriceRateToUpdate);

		// Calculate selling and buying prices
		calculatePrices(metalPriceRateToUpdate);

		// Set effective date
		metalPriceRateToUpdate.setEffectiveDate(LocalDateTime.now());

		// Insert metal type and price rate into repository
		MetalType updatedMetalType = null;
		try {
			updatedMetalType = metalTypeRepo.updateMetalType(metalTypeToUpdate);
			metalPriceRateRepo.updateMetalPriceRate(metalPriceRateToUpdate);
			this.eventPublish.publishUpdateMetalComplete("success", metalTypeToUpdate);
		}catch (Exception e) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            e.printStackTrace();
			throw e;
		}
		

		return new OutputValues(updatedMetalType.getMetalTypeId(), updatedMetalType.getMetalTypeName(),
				updatedMetalType.getMetalGroupName());
	}

	private void fetchMetalPriceRateFromApi(MetalType metalType, MetalPriceRate currentMetalPriceRate) {
		MetalGroup metalGroup = MetalGroup.getFromRealName(metalType.getMetalGroupName());
		if (metalGroup == null && metalType.isAutoUpdatePrice())
			throw new MetalException(
					"Unable to retrieve metal price information from the API client for the price update automation. Please set the price manually.");
		else if (metalGroup == null)
			updateMetalPriceRate(metalType, currentMetalPriceRate, null);
		else if (metalGroup != null) {
			switch (metalGroup) {
			case GOLD:
				GoldPriceRate goldPriceRate = fetchGoldPriceRate(metalType, currentMetalPriceRate);
				updateMetalPriceRate(metalType, currentMetalPriceRate, goldPriceRate);
				break;
			case SILVER:
				SilverPriceRate silverPriceRate = fetchSilverPriceRate(metalType, currentMetalPriceRate);
				updateMetalPriceRate(metalType, currentMetalPriceRate, silverPriceRate);
				break;
			default:
				if (metalType.isAutoUpdatePrice()) {
					throw new MetalException(
							"Unable to retrieve metal price information from the API client for the price update automation. Please set the price manually.");
				}
				break;
			} 
		} 
	}

	private GoldPriceRate fetchGoldPriceRate(MetalType metalType, MetalPriceRate currentMetalPriceRate) {
		try {
			GoldPriceRate currentGoldPriceRate = Optional
					.ofNullable(metalPriceRateApiClient.fetchGolPriceRate().getThis()).orElse(null);
			if (currentGoldPriceRate == null && metalType.isAutoUpdatePrice()) {
				throw new MetalException(
						"Unable to retrieve gold price information from the API client for the price update automation. Please set the price manually.");
			}
			return currentGoldPriceRate;
		} catch (MetalPriceRateApiException | IOException ex) {
			throw new MetalException("Error fetching gold price rate from API.");
		}
	}

	private SilverPriceRate fetchSilverPriceRate(MetalType metalType, MetalPriceRate currentMetalPriceRate) {
		try {
			SilverPriceRate currentSilverPriceRate = Optional
					.ofNullable(metalPriceRateApiClient.fetchSilverPriceRate().getThis()).orElse(null);
			if (currentSilverPriceRate == null && metalType.isAutoUpdatePrice()) {
				throw new MetalException(
						"Unable to retrieve silver price information from the API client for the price update automation. Please set the price manually.");
			}
			return currentSilverPriceRate;
		} catch (MetalPriceRateApiException | IOException ex) {
			throw new MetalException("Error fetching silver price rate from API.");
		}
	}

	private void updateMetalPriceRate(MetalType metalType, MetalPriceRate currentMetalPriceRate,
			MetalFetchObject<?> currentMetalFetch) {
		if (currentMetalFetch == null) {
			currentMetalPriceRate.setExchangeRate(null);
			currentMetalPriceRate.setInternationalPrice(null);
		} else {
			
			currentMetalPriceRate
					.setExchangeRate(Optional.ofNullable(currentMetalFetch.getExchangeRateUsdToVnd()).orElse(null));
			currentMetalPriceRate.setInternationalPrice(
					Optional.ofNullable(currentMetalFetch.getInternationOuncePriceUsd()).orElse(null));
		} 

		currentMetalPriceRate.setMetalPriceSpot(metalType.isAutoUpdatePrice()
				? currentMetalFetch.getPriceGramInVnd() * (metalType.getMetalPurity() / 100)
				: currentMetalPriceRate.getMetalPriceSpot());
	}

	private void calculatePrices(MetalPriceRate currentMetalPriceRate) {
		double sellingPrice = currentMetalPriceRate.getMetalPriceSpot() * (1 + currentMetalPriceRate.getProfitSell());
		double buyingPrice = sellingPrice / (1 + currentMetalPriceRate.getProfitBuy());
		currentMetalPriceRate.setSellingPrice(sellingPrice);
		currentMetalPriceRate.setBuyingPrice(buyingPrice);
	}


}
