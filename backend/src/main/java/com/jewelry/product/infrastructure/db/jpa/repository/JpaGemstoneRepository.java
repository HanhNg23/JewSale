package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jewelry.product.infrastructure.db.jpa.entity.GemstoneEntity;

import jakarta.transaction.Transactional;

public interface JpaGemstoneRepository extends JpaRepository<GemstoneEntity, Integer>{
	
	@Query("SELECT g FROM GemstoneEntity g "
			+ "WHERE LOWER(g.gemstoneName) = LOWER(:gemstoneName) ")
	Optional<GemstoneEntity> findGemstone(
			@Param("gemstoneName") String gemstoneName);
	
	@Query("SELECT g FROM GemstoneEntity g "
			+ "WHERE LOWER(g.seriaNumber) = LOWER(:seriaNumber) ")
	Optional<GemstoneEntity> findGemstoneBySerialNumber(
			@Param("seriaNumber") String serialNumber);
	
	@Query("SELECT DISTINCT g.gemstoneName FROM GemstoneEntity g")
	Set<String> findGemstoneTypes();
	
	@Modifying
	@Transactional
	@Query("DELETE FROM GemstoneEntity g WHERE g.gemstoneId IN :gemstoneIds")
	void deleteAllByIdsSet(@Param("gemstoneIds") Set<Integer> ids);
 
}
