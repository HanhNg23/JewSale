package com.jewelry.metal.core.domain;


public abstract class MetalFetchObject<T extends MetalFetchObject<T>>{	

	public abstract T getThis();

	public abstract Double getExchangeRateUsdToVnd();

	public abstract Double getInternationOuncePriceUsd();

	public abstract double getPriceGramInVnd();
	
}
