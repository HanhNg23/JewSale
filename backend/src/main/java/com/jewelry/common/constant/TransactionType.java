package com.jewelry.common.constant;

import lombok.Getter;

public enum TransactionType {

	SELL("bán ra"),
	PURCHASE("mua vào");
	
	@Getter
	private String displayName;
	
	TransactionType(String invoiceTypeRealName) {
		this.displayName = invoiceTypeRealName;
	}
}
