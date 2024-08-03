package com.jewelry.groupelement.infrastructure.db.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jewelry.groupelement.infrastructure.db.entity.GroupElementEntity;

public interface JpaGroupElementRepository extends JpaRepository<GroupElementEntity, Integer>{

	@Query("SELECT e FROM GroupElementEntity e WHERE e.elementValue = :groupName AND e.isTypeGroup = TRUE")
	GroupElementEntity findByGroupName(@Param("groupName") String groupName);
	
	@Query("SELECT e.elementValue FROM GroupElementEntity e WHERE e.parentGroupId = :groupId AND e.isTypeGroup = FALSE")
	Set<String> findAllByGroupNameId(@Param("groupId") int groupId);
	
	@Query("SELECT e FROM GroupElementEntity e WHERE e.elementValue = :elementValue AND e.isTypeGroup = FALSE AND e.parentGroupId = :groupId ")
	Optional<GroupElementEntity> findByElementNameAndGroupNameId(@Param("elementValue") String elementValue, @Param("groupId") int groupId);
	
	
}
