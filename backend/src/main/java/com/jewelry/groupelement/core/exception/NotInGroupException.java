package com.jewelry.groupelement.core.exception;

import java.util.Set;

import com.jewelry.common.exception.application.BaseApplicationException;

public class NotInGroupException extends BaseApplicationException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NotInGroupException(String groupName, Set<String> groupElements) {
		super("The element must in the group " + groupName + " [" + String.join(", ", groupElements) + "]");
	}

}
