package com.jewelry.common.constant;


import lombok.Getter;

public enum MetalGroup {
	GOLD("vàng"),
	SILVER("bạc");
	
	@Getter
	private String displayName;
	
	MetalGroup(String displayName) {
		this.displayName = displayName;
	}
	
	public static MetalGroup getFromRealName(String realName) {
		MetalGroup theMetal = null;
		for(MetalGroup metal : MetalGroup.values()) {
			if(metal.getDisplayName().equalsIgnoreCase(realName)) {
				theMetal = metal;
				break;
			}
		}
		return theMetal;
	}
}