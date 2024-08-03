package com.jewelry.metal.core.service;

import java.util.Set;
import org.springframework.stereotype.Service;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.exception.MetalPriceNotFoundException;
import com.jewelry.metal.core.interfaces.IMetalService;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.core.repository.MetalTypeRepository;

@Service
public class MetalServiceImpl implements IMetalService{
	private MetalTypeRepository metalTypeRepo;
	private MetalPriceRateRepository metalPriceRateRepo;

	public MetalServiceImpl(MetalTypeRepository metalTypeRepo, MetalPriceRateRepository metalPriceRateRepo){
		this.metalTypeRepo = metalTypeRepo;
		this.metalPriceRateRepo = metalPriceRateRepo;
	}
	
	@Override
	public MetalType getMetalTypeByName(String metalTypeName) {
		MetalType metalType = metalTypeRepo.getMetalTypeByName(metalTypeName).orElse(null);
		if(metalType == null) {
			throw new MetalNotFoundException(metalTypeName);
		}
		return metalType;
	}

	@Override
	public MetalType getMetalType(int metalTypeId) {
		MetalType metal = metalTypeRepo.getMetalTypeById(metalTypeId).orElse(null);
		if(metal == null) {
			throw new MetalNotFoundException(String.valueOf(metalTypeId));
		}
		return metal;
	}

	@Override
	public Set<MetalType> getMetalTypesByMetalGroupName(String metalGroupName) {
		return metalTypeRepo.getAllMetalTypesByMetalGroupName(metalGroupName);
	}

	@Override
	public Set<String> getAllMetalTypeNames() {
		return metalTypeRepo.getAllMetalTypeNames();
	}

	@Override
	public MetalPriceRate currentMetalPriceRate(String metalTypeName) {
		MetalPriceRate metalPriceRate = metalPriceRateRepo.getCurrentMetalPriceRate(metalTypeName).orElse(null);
		if(metalPriceRate == null) 
			throw new MetalPriceNotFoundException(metalTypeName);
		return metalPriceRate;
	}

}
