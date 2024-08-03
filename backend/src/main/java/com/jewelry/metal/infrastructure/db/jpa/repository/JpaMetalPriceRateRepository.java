package com.jewelry.metal.infrastructure.db.jpa.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.jewelry.metal.infrastructure.db.jpa.entity.MetalPriceRateEntity;

public interface JpaMetalPriceRateRepository extends JpaRepository<MetalPriceRateEntity, Integer> {

	@Query("SELECT m FROM MetalPriceRateEntity m JOIN FETCH m.metalType mt "
			+ "WHERE mt.metalTypeName = :metalTypeName "
			+ "AND m.effectiveDate = "
			+ "( "
			+ "SELECT MAX(mpr.effectiveDate) FROM MetalPriceRateEntity mpr "
			+ "WHERE mpr.metalType.metalTypeName = :metalTypeName "
			+ "AND mpr.effectiveDate <= :currentDate "
			+ ") ")
	Optional<MetalPriceRateEntity> findThelatesPriceOfMetal(@Param("metalTypeName") String metalTypeName, @Param("currentDate") LocalDateTime currentDate);


	
	
	
	
	
}
