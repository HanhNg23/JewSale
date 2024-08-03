package com.jewelry.metal.infrastructure.db.jpa.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.metal.infrastructure.db.jpa.entity.MetalTypeEntity;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public class MetalTypeRepositoryImpl implements MetalTypeRepository {
	private JpaMetalTypeRepository metalTypeRepo;
	private ModelMapper mapper = new ModelMapper();
	
	public MetalTypeRepositoryImpl(JpaMetalTypeRepository metalTypeRepo) {
		this.metalTypeRepo = metalTypeRepo;
	}
	
	@Override
	public Optional<MetalType> getMetalTypeByName(String metalTypeName) {
		MetalTypeEntity metalTypeEntity = metalTypeRepo.findByMetalTypeNameIgnoreCase(metalTypeName).orElse(null);
		return metalTypeEntity != null ? Optional.ofNullable(mapper.map(metalTypeEntity, MetalType.class)) : Optional.empty();
	}

	@Override
	public Set<MetalType> getAllMetalTypesByMetalGroupName(String metalGroupName) {
		Set<MetalTypeEntity> metalTypeEntities = metalTypeRepo.findAllByMetalGroupName(metalGroupName);
		return metalTypeEntities.parallelStream().map(metal -> mapper.map(metal, MetalType.class)).collect(Collectors.toSet());
	}

	@Override
	public MetalType saveMetalType(MetalType metalType) {
		MetalTypeEntity metalTypeEntity = mapper.map(metalType, MetalTypeEntity.class);
		MetalTypeEntity savedMetalTypeEntity = metalTypeRepo.save(metalTypeEntity);
		return mapper.map(savedMetalTypeEntity, MetalType.class);
	}
	
	@Override
	public MetalType updateMetalType(MetalType metalType) {
		MetalTypeEntity originalMetalTypeEntity = metalTypeRepo.findById(metalType.getMetalTypeId()).get();
		mapper.map(metalType, originalMetalTypeEntity);
		System.out.println("METAL TYPE: " + metalType.toString());
		MetalTypeEntity updatedMetalTypeEntity = metalTypeRepo.save(originalMetalTypeEntity);
		return mapper.map(updatedMetalTypeEntity, MetalType.class);
	}

	@Override
	public void deleteMetalType(MetalType metalType) {
		MetalTypeEntity metalTypeEntity = metalTypeRepo.findById(metalType.getMetalTypeId()).orElse(null);
		metalTypeRepo.delete(metalTypeEntity);
	}

	@Override
	public Optional<MetalType> getMetalTypeById(int metalTypeId) {
		MetalTypeEntity metalTypeEntity = metalTypeRepo.findById(metalTypeId).orElse(null);
		return metalTypeEntity != null ? Optional.ofNullable(mapper.map(metalTypeEntity, MetalType.class)) : Optional.empty();
	}

	@Override
	public Set<String> getAllMetalTypeNames() {
		Set<String> metalTypeNames = metalTypeRepo.findAllMetalTypeName();
		return metalTypeNames;
	}

	@Override
	public List<MetalType> getAllMetalTypes() {	
		List<MetalTypeEntity> metalTypeEntities = metalTypeRepo.findAll();
		return metalTypeEntities.stream().map(metal -> mapper.map(metal, MetalType.class)).collect(Collectors.toList());
	}

	@Override
	public List<MetalType> getAllMetalTypesOnMonitor() {
		List<MetalTypeEntity> metalTypeEntities = metalTypeRepo.findAllByIsOnMonitorTrue();
		return metalTypeEntities.stream().map(metal -> mapper.map(metal, MetalType.class)).collect(Collectors.toList());
	}

	

}
