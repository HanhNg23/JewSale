package com.jewelry.common.constant;

import lombok.Getter;

public enum GroupName {
	JEWELRY_TYPE("trang sức"),
	SALE_STATUE("sale status"),
	GEMSTONE_TYPE("gemstone"),
	GEMSTONE_CERT_TYPE("gem-cert-type"),
	METAL_GROUP("metal group");
	
	@Getter
	private String displayName;
	
	GroupName(String displayName) {
		this.displayName = displayName;
	}
}
