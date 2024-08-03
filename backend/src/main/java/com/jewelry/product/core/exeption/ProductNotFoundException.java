package com.jewelry.product.core.exeption;

import com.jewelry.common.exception.application.BaseApplicationException;

public class ProductNotFoundException extends BaseApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ProductNotFoundException(String productId) {
		super("Product " + productId + " is not found in data !");
	}

}
