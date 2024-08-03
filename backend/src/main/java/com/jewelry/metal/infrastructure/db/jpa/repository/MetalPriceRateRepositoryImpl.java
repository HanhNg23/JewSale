package com.jewelry.metal.infrastructure.db.jpa.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.repository.MetalPriceRateRepository;
import com.jewelry.metal.infrastructure.db.jpa.entity.MetalPriceRateEntity;

@Repository
public class MetalPriceRateRepositoryImpl implements MetalPriceRateRepository {

	private ModelMapper mapper = new ModelMapper();
	private JpaMetalPriceRateRepository metalPriceRateRepo;

	public MetalPriceRateRepositoryImpl(JpaMetalPriceRateRepository metalPriceRateRepo) {
		this.metalPriceRateRepo = metalPriceRateRepo;
	}

	@Override
	public Optional<MetalPriceRate> getCurrentMetalPriceRate(String metalType) {
		MetalPriceRateEntity metalPriceRateEntity = metalPriceRateRepo
				.findThelatesPriceOfMetal(metalType, LocalDateTime.now()).orElse(null);
		return metalPriceRateEntity != null ? Optional.ofNullable(mapper.map(metalPriceRateEntity, MetalPriceRate.class)) : Optional.empty();
	}

	@Override
	public MetalPriceRate saveMetalPriceRate(MetalPriceRate metalPriceRate) {
		MetalPriceRateEntity metalPriceRateEntity = mapper.map(metalPriceRate, MetalPriceRateEntity.class);
		metalPriceRateEntity = metalPriceRateRepo.save(metalPriceRateEntity);
		return mapper.map(metalPriceRateEntity, MetalPriceRate.class);
	}
	
	@Override
	public MetalPriceRate updateMetalPriceRate(MetalPriceRate metalPriceRate) {
		MetalPriceRateEntity metalPriceRateEntity = mapper.map(metalPriceRate, MetalPriceRateEntity.class);
		metalPriceRateEntity.setMetalPriceRateId(null);
		metalPriceRateEntity = metalPriceRateRepo.save(metalPriceRateEntity);
		return mapper.map(metalPriceRateEntity, MetalPriceRate.class);
	}

}
