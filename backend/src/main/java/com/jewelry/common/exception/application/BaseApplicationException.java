package com.jewelry.common.exception.application;

public abstract class BaseApplicationException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4434755731935487074L;

	public BaseApplicationException(String message) {
		super(message);
	}
}
