package com.jewelry.groupelement.core.service;


import java.util.Set;
import org.springframework.stereotype.Service;
import com.jewelry.groupelement.core.domain.GroupElement;
import com.jewelry.groupelement.core.exception.NotInGroupException;

@Service
public interface GroupElementService {
	public GroupElement getElementInGroup(String elementValue, String groupName) throws NotInGroupException;
	public GroupElement insertNewElementToGroup(String elementName, String groupName);
	public Set<String> getElementsByGroupName(String groupName);


}
