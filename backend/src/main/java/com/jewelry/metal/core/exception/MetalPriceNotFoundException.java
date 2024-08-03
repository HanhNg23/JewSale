package com.jewelry.metal.core.exception;

import com.jewelry.common.exception.application.BaseApplicationException;

public class MetalPriceNotFoundException extends BaseApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1104056124082971981L;

	public MetalPriceNotFoundException(String metalName) {
		super("Not found the price information of " + metalName);
	}

}
