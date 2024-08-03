package com.jewelry.metal.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import lombok.Value;


@Service
public class GetAllMetalTypesOnMonitorUsecase extends UseCase<GetAllMetalTypesOnMonitorUsecase.InputValues, GetAllMetalTypesOnMonitorUsecase.OutputValues>{
	private MetalTypeRepository metalTypeRepo;
	private MetalPriceRateRepository metalPriceRateRepo;
	
	GetAllMetalTypesOnMonitorUsecase(
			MetalTypeRepository metalTypeRepo, 
			MetalPriceRateRepository metalPriceRateRepo) {
		this.metalTypeRepo = metalTypeRepo;
		this.metalPriceRateRepo = metalPriceRateRepo;
	}
	
	@Override
	public OutputValues execute(InputValues input) {
		List<MetalType> metalTypes = metalTypeRepo.getAllMetalTypesOnMonitor();
		metalTypes.parallelStream().forEach(metal -> {
			MetalPriceRate currentMetalPrice = metalPriceRateRepo.getCurrentMetalPriceRate(metal.getMetalTypeName()).orElse(null);
			if(currentMetalPrice != null)
				metal.setCurrentMetalPriceRate(currentMetalPrice);
		});
		
		return new OutputValues(metalTypes);
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final List<MetalType> metalTypes;
	}
	

}