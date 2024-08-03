package com.jewelry.image.infrastructure.dn.jpa.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {
	private int imageId;
	
	private String entityId;
	
	private String entityName;
	
	private String imageUrl;
}
