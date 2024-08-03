package com.jewelry.metal.core.usecase;

import org.springframework.stereotype.Service;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;

import lombok.Value;

@Service
public class GetMetalDetailsUsecase extends UseCase<GetMetalDetailsUsecase.InputValues, GetMetalDetailsUsecase.OutputValues> {

	private MetalTypeRepository metalTypeRepo;
	private MetalPriceRateRepository metalPriceRateRepo;
	
	GetMetalDetailsUsecase(
			MetalTypeRepository metalTypeRepo, 
			MetalPriceRateRepository metalPriceRateRepo) {
		this.metalTypeRepo = metalTypeRepo;
		this.metalPriceRateRepo = metalPriceRateRepo;
	}
	
	@Override
	public OutputValues execute(InputValues input) {
		MetalType metalType = metalTypeRepo.getMetalTypeByName(StringUtils.trimAll(input.metalTypeName)).orElse(null);
		if(metalType == null)
			throw new MetalNotFoundException(input.getMetalTypeName());
		metalType.setCurrentMetalPriceRate(metalPriceRateRepo.getCurrentMetalPriceRate(metalType.getMetalTypeName()).orElse(null));
		return new OutputValues(metalType);
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
		private String metalTypeName;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private MetalType metalType;
	}

}
