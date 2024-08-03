package com.jewelry.common.exception.restapi.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class ServerGlobalExceptionHandler {
	@ExceptionHandler(Exception.class) //include runtime exception and ioe exception
    public ResponseEntity<String> handleCheckedExceptions(Exception ex) {
		ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
	
	@ExceptionHandler(Error.class) 
    public ResponseEntity<String> handleErrors(Error ex) {
		ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
