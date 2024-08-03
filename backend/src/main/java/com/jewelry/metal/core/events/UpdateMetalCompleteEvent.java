package com.jewelry.metal.core.events;

import org.springframework.context.ApplicationEvent;

import com.jewelry.metal.core.domain.MetalType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMetalCompleteEvent extends ApplicationEvent {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;
	private MetalType metalType;
	
	
	public UpdateMetalCompleteEvent(Object source, String message, MetalType metalType) {
		super(source);
		this.message = message;
		this.metalType = metalType;
		System.out.println("METAL HAS UPDATE: " + metalType.getMetalTypeName());
	}
	

}
