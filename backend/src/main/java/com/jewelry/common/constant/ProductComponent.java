package com.jewelry.common.constant;

import lombok.Getter;

public enum ProductComponent {
	FULL("trang sức"),
	METAL("kim loại"),
	GEMSTONE("đá");
	
	@Getter
	private String displayName;
	
	ProductComponent(String displayName){
		this.displayName = displayName;
	}
	
	
}
