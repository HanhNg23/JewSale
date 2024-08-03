package com.jewelry.metal.infrastructure.db.jpa.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jewelry.metal.infrastructure.db.jpa.entity.MetalTypeEntity;

public interface JpaMetalTypeRepository extends JpaRepository<MetalTypeEntity, Integer> {

	Optional<MetalTypeEntity> findByMetalTypeNameIgnoreCase(String metalTypeName);
	
	@Query("SELECT DISTINCT me.metalTypeName FROM MetalTypeEntity me")
	Set<String> findAllMetalTypeName();
	
	Set<MetalTypeEntity> findAllByMetalGroupName(String metalGroupName);
	
	List<MetalTypeEntity> findAll();
	
	List<MetalTypeEntity> findAllByIsOnMonitorTrue();
	
	@Query("SELECT DISTINCT me.metalGroupName FROM MetalTypeEntity me")
	Set<String> findAllDistinctMetalGroupNames();
	
	
	
}
