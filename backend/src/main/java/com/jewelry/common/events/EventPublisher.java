package com.jewelry.common.events;

import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.events.UpdateProductEvent;
import com.jewelry.payment.ReturnProductEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.events.FetchMetalCompleteEvent;
import com.jewelry.metal.core.events.UpdateMetalCompleteEvent;
import com.jewelry.metal.infrastructure.metalapiclient.GoldPriceRate;
import com.jewelry.metal.infrastructure.metalapiclient.SilverPriceRate;

import java.util.List;

@Component
public class EventPublisher {

	@Autowired
	private ApplicationEventPublisher publisher;
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	//this will work as a manager of application events, send message of events to other listeners
	public void publishUpdateMetalPriceRate(final String message, boolean success, MetalGroup metalGroup, GoldPriceRate goldPriceRate, SilverPriceRate silverPriceRate) {
		publisher.publishEvent(new FetchMetalCompleteEvent(this, message, success, metalGroup, goldPriceRate, silverPriceRate));
	}
	
	public void publishUpdateMetalComplete(String message, MetalType metalType) {
		System.out.println("START PUBLISH UPDATE METAL COMPLETE");
		publisher.publishEvent(new UpdateMetalCompleteEvent(this, message, metalType));
	}

	public void updateProductStockQuantity(final String message,  List<InvoiceItem> invoiceItems) {
		publisher.publishEvent(new UpdateProductEvent(this, message, invoiceItems));
	}
	public void returnProductStockQuantity(final String message,  List<InvoiceItem> invoiceItems) {
		publisher.publishEvent(new ReturnProductEvent(this, message, invoiceItems));
	}
}
