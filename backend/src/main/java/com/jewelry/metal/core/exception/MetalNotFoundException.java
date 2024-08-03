package com.jewelry.metal.core.exception;

import com.jewelry.common.exception.application.BaseApplicationException;

public class MetalNotFoundException extends BaseApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8779484564457916678L;

	public MetalNotFoundException(String metalName) {
		super("Not found the metal " + metalName);
		
	}

}
