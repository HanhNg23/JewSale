package com.jewelry.metal.core.events;


import org.springframework.context.ApplicationEvent;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.metal.infrastructure.metalapiclient.GoldPriceRate;
import com.jewelry.metal.infrastructure.metalapiclient.SilverPriceRate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FetchMetalCompleteEvent extends ApplicationEvent {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;
	private boolean success;
	private MetalGroup metalGroup;
	private GoldPriceRate goldPriceRate;
	private SilverPriceRate silverPriceRate;
	
	public FetchMetalCompleteEvent(Object source, String message, boolean success, MetalGroup metalGroup, GoldPriceRate goldPriceRate, SilverPriceRate silverPriceRate) {
		super(source);
		this.message = message;
		this.success = success;
		this.metalGroup = metalGroup;
		this.goldPriceRate = goldPriceRate;
		this.silverPriceRate = silverPriceRate;
	}
	
	

	
	
}
