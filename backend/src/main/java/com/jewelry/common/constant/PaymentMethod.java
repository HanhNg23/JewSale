package com.jewelry.common.constant;

import lombok.Getter;

public enum PaymentMethod {
	CASH("Tiền mặt"),
	EWALLET_VNPAY("Ví điện tử VNPAY");
	
	@Getter
	private String displayName;
	
	private PaymentMethod(String displayName) {
		this.displayName = displayName;
	}
}
