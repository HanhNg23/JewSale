package com.jewelry.groupelement.core.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupElement {
	private Integer elementId;
	
	private String elementValue;
	
	private String description;
	
	private boolean isTypeGroup;
	
	private Integer parentGroupId;
}
