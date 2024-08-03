package com.jewelry.groupelement.core.service;

import java.util.Set;

import org.springframework.stereotype.Service;
import com.jewelry.groupelement.core.domain.GroupElement;
import com.jewelry.groupelement.core.exception.NotInGroupException;
import com.jewelry.groupelement.core.repository.GroupElementRepository;
import jakarta.transaction.Transactional;


@Service
public class GroupElementServiceImpl implements GroupElementService{

	private GroupElementRepository groupElementRepo;
	
	GroupElementServiceImpl(GroupElementRepository groupElementRepo){
		this.groupElementRepo = groupElementRepo;
	}
	
	@Override
	public GroupElement getElementInGroup(String elementValue, String groupName) {
		GroupElement groupElement = groupElementRepo.getElement(elementValue, groupName).orElse(null);
		if(groupElement == null) {
			throw new NotInGroupException(groupName, groupElementRepo.getElementsByGroupName(groupName));
		}
		return groupElement;
	}

	@Override
	@Transactional
	public GroupElement insertNewElementToGroup(String elementName, String groupName) {
		return groupElementRepo.insertNewElementToGroup(elementName, groupName);
	}

	@Override
	public Set<String> getElementsByGroupName(String groupName) {
		return groupElementRepo.getElementsByGroupName(groupName);
	}

}
