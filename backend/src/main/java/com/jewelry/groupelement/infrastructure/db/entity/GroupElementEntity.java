package com.jewelry.groupelement.infrastructure.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "group_element", schema = "jewelry-sale-db")
public class GroupElementEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "element_id")
	private Integer elementId;
	
	@Column(name = "element_value")
	private String elementValue;
	
	@Column(name = "element_description")
	private String description;
	
	@Column(name = "is_type_group")
	private boolean isTypeGroup;
	
	@Column(name = "parent_group_id")
	private Integer parentGroupId;
	
}
