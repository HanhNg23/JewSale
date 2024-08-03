package com.jewelry.product.core.repository;

import java.util.Optional;
import java.util.Set;

import com.jewelry.product.core.domain.GemStone;

public interface GemstoneRepository {
	public Optional<GemStone> getGemstoneByName(String gemstoneName);
	public Set<String> getAllDistinctGemstoneName();
	public GemStone saveNewGemstoneType(GemStone gemstone);
	public void deleteGemstoneType(GemStone gemstone);
	public void deleteAllGemstoneTypeHasIdInSet(Set<Integer> gemstoneIdsSet);
	public Optional<GemStone> getGemstoneById(int gemstoneId);
	Optional<GemStone> getGemstoneBySeriaNumber(String seriaNumber);
	
}
