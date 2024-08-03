package com.jewelry.metal.core.events.handlers;

import java.time.LocalDateTime;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.metal.core.events.FetchMetalCompleteEvent;
import com.jewelry.metal.presenter.rest.api.dto.GoldPriceRateDto;

@Component
public class GoldPriceEventListner {
	 private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();
	 @Autowired
	 private ModelMapper mapper;;
	    @EventListener
	    @Async
	    public void handleFetchApiGoldCompleteEvent(FetchMetalCompleteEvent event) {
	    	if(event.isSuccess() && event.getMetalGroup().equals(MetalGroup.GOLD)) {
	    		 ExecutorService sseExecutor = Executors.newSingleThreadExecutor();
	 	        sseExecutor.execute(() -> {
	 	            emitters.forEach(emitter -> {
	 	                try {
	 	                    SseEmitter.SseEventBuilder sseEvent = SseEmitter.event()
	  	                    		.comment("At time " + LocalDateTime.now())
	 	                            .data(mapper.map(event.getGoldPriceRate(), GoldPriceRateDto.class))
	 	                            .name("FetchApiGoldCompleteEvent");
	 	                    emitter.send(sseEvent);
	 	                } catch (Exception e) {
	 	                    emitter.completeWithError(e);
	 	                    emitters.remove(emitter);
	 	                }
	 	            });
	 	            sseExecutor.shutdown();
	 	        });
	    		
	    	}
	       
	    }

	    public void addEmitter(SseEmitter emitter) {
	        this.emitters.add(emitter);
	        emitter.onCompletion(() -> this.emitters.remove(emitter));
	        emitter.onTimeout(() -> this.emitters.remove(emitter));
	        emitter.onError(e -> this.emitters.remove(emitter));
	    }
}
