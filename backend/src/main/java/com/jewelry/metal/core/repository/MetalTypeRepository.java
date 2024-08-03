package com.jewelry.metal.core.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import com.jewelry.metal.core.domain.MetalType;

public interface MetalTypeRepository {
	public Optional<MetalType> getMetalTypeByName(String metalTypeName);
	public Set<MetalType> getAllMetalTypesByMetalGroupName(String metalGroupName);
	public List<MetalType> getAllMetalTypes();
	public List<MetalType> getAllMetalTypesOnMonitor();
	public Set<String> getAllMetalTypeNames();
	public MetalType saveMetalType(MetalType metalType);
	public MetalType updateMetalType(MetalType metalType);
	public void deleteMetalType(MetalType metalType);
	public Optional<MetalType> getMetalTypeById(int metalTypeId);
	
}
