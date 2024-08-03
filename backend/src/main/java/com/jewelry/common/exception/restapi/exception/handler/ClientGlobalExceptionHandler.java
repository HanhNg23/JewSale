package com.jewelry.common.exception.restapi.exception.handler;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry.common.exception.DomainNotFoundException;
import com.jewelry.common.exception.application.BaseApplicationException;
import com.jewelry.groupelement.core.exception.NotInGroupException;
import com.jewelry.metal.core.exception.MetalException;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.exception.MetalPriceNotFoundException;
import com.jewelry.product.core.exeption.ProductException;
import com.jewelry.product.core.exeption.ProductNotFoundException;

@ControllerAdvice
@RestController
public class ClientGlobalExceptionHandler {
	

	@ExceptionHandler(BindException.class)
    public ResponseEntity<String> handleBindException(BindException ex) {
        List<FieldError> fieldErrors = ex.getFieldErrors();
        FieldError firstError = fieldErrors.get(0);
        String errorMessage = firstError.getDefaultMessage();
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
		
	@ExceptionHandler({NotInGroupException.class, ProductException.class, MetalException.class})
    public ResponseEntity<String> handleGroupException(BaseApplicationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
	
	@ExceptionHandler({ProductNotFoundException.class, MetalPriceNotFoundException.class, MetalNotFoundException.class, DomainNotFoundException.class})
    public ResponseEntity<String> handleDomainNotFoundException(BaseApplicationException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
	
	@ExceptionHandler({AccessDeniedException.class})
	 public ResponseEntity<String> handleAccessDeniedException(Exception ex) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
	    }
		
	
	
	
}
