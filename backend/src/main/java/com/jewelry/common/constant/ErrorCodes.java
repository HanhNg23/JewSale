package com.jewelry.common.constant;

import lombok.Getter;

@Getter
public enum ErrorCodes {
    INVOICE_DOES_NOT_EXIST(200),
    WARRANTY_TYPE_DOES_NOT_EXIST(200),
    PRODUCT_DOES_NOT_EXIST(200),
    USER_DOES_NOT_EXIST(200),
    USER_DUPLICATE(201),
    INVALID_SEARCH_CRITERIA(202),
    INVOICE_PRODUCT_ALREADY_HAS_WARRANTY(203);
    private final int code;

    ErrorCodes(int code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return String.valueOf(code);
    }
}