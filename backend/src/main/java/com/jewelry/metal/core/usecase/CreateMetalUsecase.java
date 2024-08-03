package com.jewelry.metal.core.usecase;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.jewelry.common.constant.GroupName;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.groupelement.core.domain.GroupElement;
import com.jewelry.groupelement.core.exception.NotInGroupException;
import com.jewelry.groupelement.core.service.GroupElementService;
import com.jewelry.metal.core.domain.MetalFetchObject;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalException;
import com.jewelry.metal.core.exception.MetalPriceRateApiException;
import com.jewelry.metal.core.interfaces.IMetalPriceRateApiClient;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.metal.infrastructure.metalapiclient.GoldPriceRate;
import com.jewelry.metal.infrastructure.metalapiclient.SilverPriceRate;

import jakarta.transaction.Transactional;
import lombok.Value;

@Service
@Transactional
public class CreateMetalUsecase extends UseCase<CreateMetalUsecase.InputValues, CreateMetalUsecase.OutputValues> {
	private IMetalPriceRateApiClient metalPriceRateApiClient;
	private MetalTypeRepository metalTypeRepo;
	private MetalPriceRateRepository metalPriceRateRepo;
	private GroupElementService groupElementService;
	
	public CreateMetalUsecase(
			IMetalPriceRateApiClient metalPriceRateApiClient,
			MetalTypeRepository metalTypeRepo,
			MetalPriceRateRepository metalPriceRateRepo,
			GroupElementService groupElementService) {
		this.metalPriceRateApiClient = metalPriceRateApiClient;
		this.metalTypeRepo = metalTypeRepo;
		this.metalPriceRateRepo = metalPriceRateRepo;
		this.groupElementService = groupElementService;
		
	}
		
	@Override
    public OutputValues execute(InputValues input) {
        MetalType metalType = input.getMetalType();
        MetalPriceRate currentMetalPriceRate = input.getMetalPriceRate();

        // Reformat metal type name and group name
        String metalTypeName = StringUtils.capitalizeFirstLetterSentence(metalType.getMetalTypeName());
        String metalGroupName = StringUtils.trimAll(metalType.getMetalGroupName()).toLowerCase();
        metalType.setMetalTypeName(metalTypeName);
        metalType.setMetalGroupName(metalGroupName);

        // Check for duplicate metal name
        boolean isDuplicatedName = metalTypeRepo.getMetalTypeByName(metalType.getMetalTypeName()).isPresent();
        if (isDuplicatedName)
            throw new MetalException("The metal name has already existed.");
        // Check and insert new element to group
		try {
			GroupElement element = groupElementService.getElementInGroup(metalType.getMetalGroupName(),
					GroupName.METAL_GROUP.getDisplayName());
			if (element == null) {
				groupElementService.insertNewElementToGroup(metalType.getMetalGroupName(),
						GroupName.METAL_GROUP.getDisplayName());
			}
		} catch (NotInGroupException e) {

		}
      
        // Fetch metal price rates from API
        fetchMetalPriceRateFromApi(metalType, currentMetalPriceRate);

        // Calculate selling and buying prices
        calculatePrices(currentMetalPriceRate);

        // Set effective date
        currentMetalPriceRate.setEffectiveDate(LocalDateTime.now());

        // Insert metal type and price rate into repository
        MetalType savedMetalType = metalTypeRepo.saveMetalType(metalType);
        currentMetalPriceRate.setMetalTypeId(savedMetalType.getMetalTypeId());
        metalPriceRateRepo.saveMetalPriceRate(currentMetalPriceRate);

        return new OutputValues(savedMetalType.getMetalTypeId(), savedMetalType.getMetalTypeName(), savedMetalType.getMetalGroupName());
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
	
	@Value
	public static class InputValues implements UseCase.InputValues {
		private final MetalType metalType;
		private final MetalPriceRate metalPriceRate;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final int metalTypeId;
		private final String metalTypeName;
		private final String metalGroupName;
	}



}
