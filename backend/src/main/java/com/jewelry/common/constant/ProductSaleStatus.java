package com.jewelry.common.constant;

import lombok.Getter;

public enum ProductSaleStatus {
	INSTOCK("sẵn bán"),
	OUT_OF_STOCKE("hết hàng"),
	STOP("ngừng kim doanh");
	
	@Getter
	private String displayName;
	
	ProductSaleStatus(String displayName){
		this.displayName = displayName;
	}
	
	
	

}
