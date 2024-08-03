package com.jewelry.common.exception;

public class BaseDomainException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BaseDomainException(String message) {
		super(message);
	}
}
