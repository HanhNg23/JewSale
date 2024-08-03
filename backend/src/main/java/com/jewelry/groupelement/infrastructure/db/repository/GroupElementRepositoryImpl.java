package com.jewelry.groupelement.infrastructure.db.repository;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import com.jewelry.groupelement.core.domain.GroupElement;
import com.jewelry.groupelement.core.repository.GroupElementRepository;
import com.jewelry.groupelement.infrastructure.db.entity.GroupElementEntity;

@Repository
public class GroupElementRepositoryImpl implements GroupElementRepository {
	
	private JpaGroupElementRepository groupElementRepo;
	private ModelMapper mapper = new ModelMapper();
	
	public GroupElementRepositoryImpl(JpaGroupElementRepository groupElementRepo) {
		this.groupElementRepo = groupElementRepo;
	}
	
	@Override
	public Set<String> getElementsByGroupName(String groupName) {
		GroupElementEntity elementEntity = groupElementRepo.findByGroupName(groupName);
		return elementEntity != null ? groupElementRepo.findAllByGroupNameId(elementEntity.getElementId()) :  new HashSet<>() ;
	}

	@Override
	public GroupElement insertNewElementToGroup(String elementName, String groupName) {
		GroupElementEntity parentElementEntity = groupElementRepo.findByGroupName(groupName);
		GroupElementEntity elementEntity = new GroupElementEntity();
		elementEntity.setElementValue(elementName);
		elementEntity.setParentGroupId(parentElementEntity.getElementId());
		elementEntity = groupElementRepo.save(elementEntity);
		return mapper.map(elementEntity, GroupElement.class);
	}

	@Override
	public Optional<GroupElement> getElement(String elementName, String groupName) {
		GroupElementEntity parentElementEntity = groupElementRepo.findByGroupName(groupName);
		Set<String> elements = groupElementRepo.findAllByGroupNameId(parentElementEntity.getElementId());
		if(elements.contains(elementName)) {
			GroupElementEntity elementEntity = groupElementRepo.findByElementNameAndGroupNameId(elementName, parentElementEntity.getElementId()).orElse(null);
			return Optional.of(mapper.map(elementEntity, GroupElement.class));
		}
		return Optional.empty();
	}

}
