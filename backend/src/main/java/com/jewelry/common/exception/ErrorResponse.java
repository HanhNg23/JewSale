package com.jewelry.common.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse extends BaseDomainException {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private String message;
    private String code;

    public ErrorResponse(String message,int code) {
        super(message);
        this.message = message;
        this.code = String.valueOf(code);
    }
}