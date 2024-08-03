package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.Optional;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.repository.GemstoneRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.GemstoneEntity;

@Repository
public class GemstoneRepositoryImpl implements GemstoneRepository {
	private JpaGemstoneRepository gemstoneRepo;
	private ModelMapper mapper;

	public GemstoneRepositoryImpl(JpaGemstoneRepository jpaGemstoneRepository, ModelMapper mapper) {
		this.gemstoneRepo = jpaGemstoneRepository;
		this.mapper = mapper;
	}

	@Override
	public Optional<GemStone> getGemstoneByName(String gemstoneName) {
		GemstoneEntity gemstoneEntity = gemstoneRepo.findGemstone(gemstoneName).orElse(null);
		return gemstoneEntity != null ? Optional.ofNullable(mapper.map(gemstoneEntity, GemStone.class)) : Optional.empty();
	}
	
	@Override
	public Optional<GemStone> getGemstoneBySeriaNumber(String seriaNumber) {
		GemstoneEntity gemstoneEntity = gemstoneRepo.findGemstoneBySerialNumber(seriaNumber).orElse(null);
		return gemstoneEntity != null ? Optional.ofNullable(mapper.map(gemstoneEntity, GemStone.class)) : Optional.empty();
	}

	@Override
	public Set<String> getAllDistinctGemstoneName() {
		return gemstoneRepo.findGemstoneTypes();
	}

	@Override
	public GemStone saveNewGemstoneType(GemStone gemstone) {
		GemstoneEntity gemEntity = mapper.map(gemstone, GemstoneEntity.class);
		GemstoneEntity savedGemEntity = gemstoneRepo.save(gemEntity);
		return mapper.map(savedGemEntity, GemStone.class);
	}

	@Override
	public void deleteGemstoneType(GemStone gemstone) {
		gemstoneRepo.delete(mapper.map(gemstone, GemstoneEntity.class));
	}

	@Override
	public Optional<GemStone> getGemstoneById(int gemstoneId) {
		GemstoneEntity gemstoneEntity = gemstoneRepo.findById(gemstoneId).orElse(null);
		return gemstoneEntity != null ? Optional.ofNullable(mapper.map(gemstoneEntity, GemStone.class)) : Optional.empty();
	}

	@Override
	public void deleteAllGemstoneTypeHasIdInSet(Set<Integer> gemstoneIdsSet) {
		gemstoneRepo.deleteAllByIdsSet(gemstoneIdsSet);
	}
	
	
}
