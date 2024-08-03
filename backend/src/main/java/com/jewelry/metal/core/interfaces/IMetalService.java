package com.jewelry.metal.core.interfaces;

import java.util.Set;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.exception.MetalPriceNotFoundException;

public interface IMetalService {
	public MetalType getMetalTypeByName(String metalTypeName) throws MetalNotFoundException;
	public MetalType getMetalType(int metalTypeId) throws MetalNotFoundException;
	public Set<MetalType> getMetalTypesByMetalGroupName(String metalGroupName);
	public Set<String> getAllMetalTypeNames();
	public MetalPriceRate currentMetalPriceRate(String metalType) throws MetalPriceNotFoundException;

	
}
