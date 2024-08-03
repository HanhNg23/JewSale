package com.jewelry.common.constant;

import lombok.Getter;

public enum TransactionStatus {

	PENDING_PAYMENT("Chưa thanh toán"),
	PAID("Đã thanh toán"),
	CANCELLED("Đã bị hủy");
	
	@Getter
	private String displayName;
	
	TransactionStatus(String displayName){
		this.displayName = displayName;
	}
}
