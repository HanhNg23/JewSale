package com.jewelry.groupelement.core.repository;

import java.util.Optional;
import java.util.Set;

import com.jewelry.groupelement.core.domain.GroupElement;

public interface GroupElementRepository {
	public Set<String> getElementsByGroupName(String groupName);
	public Optional<GroupElement> getElement(String elementName, String groupName);
	public GroupElement insertNewElementToGroup(String elementName, String groupName); 

}
