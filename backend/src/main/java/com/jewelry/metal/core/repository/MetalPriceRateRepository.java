package com.jewelry.metal.core.repository;

import java.util.Optional;

import com.jewelry.metal.core.domain.MetalPriceRate;

public interface MetalPriceRateRepository {
	public Optional<MetalPriceRate> getCurrentMetalPriceRate(String metalTypeName);
	public MetalPriceRate saveMetalPriceRate(MetalPriceRate metalPriceRate);
	public MetalPriceRate updateMetalPriceRate(MetalPriceRate metalPriceRate);
}
