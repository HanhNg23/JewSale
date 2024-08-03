package com.jewelry.metal.presenter.rest.api;

import java.util.concurrent.CompletableFuture;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.jewelry.common.usecase.UsecaseExecutor;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.events.handlers.GoldPriceEventListner;
import com.jewelry.metal.core.events.handlers.SilverPriceEventListner;
import com.jewelry.metal.core.usecase.CreateMetalUsecase;
import com.jewelry.metal.core.usecase.DeleteMetalUsecase;
import com.jewelry.metal.core.usecase.GetAllMetalTypesOnMonitorUsecase;
import com.jewelry.metal.core.usecase.GetAllMetalsUsecase;
import com.jewelry.metal.core.usecase.GetInternationalGoldPriceRateUsecase;
import com.jewelry.metal.core.usecase.GetInternationalSilverPriceRateUsecae;
import com.jewelry.metal.core.usecase.GetMetalDetailsUsecase;
import com.jewelry.metal.core.usecase.UpdateMetalUsecase;
import com.jewelry.metal.presenter.rest.api.dto.GoldPriceRateDto;
import com.jewelry.metal.presenter.rest.api.dto.SilverPriceRateDto;
import com.jewelry.metal.presenter.rest.api.payload.MetaUpdateRequest;
import com.jewelry.metal.presenter.rest.api.payload.MetalCreateRequest;


@Component
public class MetalController implements MetalResource {
	private UsecaseExecutor usecaseExecutor;
	private CreateMetalUsecase createMetalUsecase;
	private GetAllMetalsUsecase getAllMetalUsecase;
	private GetMetalDetailsUsecase getMetalDetailsUsecase;
	private GetAllMetalTypesOnMonitorUsecase getAllMetalTypesOnMonitorUsecase;
	private UpdateMetalUsecase updateMetalUsecase;
	private GetInternationalGoldPriceRateUsecase internationalGoldPriceRateUsecase;
	private GetInternationalSilverPriceRateUsecae internationalSilverPriceRateUsecae;
	private DeleteMetalUsecase deleteMetalUsecase;
	private GoldPriceEventListner goldpricelistner;
	private SilverPriceEventListner silverpricelistner;
	private ModelMapper mapper;
	public MetalController(
			UsecaseExecutor usecaseExecutor, 
			CreateMetalUsecase createMetalUsecase,
			GetAllMetalsUsecase getAllMetalUsecas,
			GetMetalDetailsUsecase getMetalDetailsUsecase,
			GetAllMetalTypesOnMonitorUsecase getAllMetalTypesOnMonitorUsecase,
			UpdateMetalUsecase updateMetalUsecase,
			DeleteMetalUsecase deleteMetalUsecase,
			GetInternationalGoldPriceRateUsecase internationalGoldPriceRateUsecase,
			GetInternationalSilverPriceRateUsecae internationalSilverPriceRateUsecae,
			GoldPriceEventListner goldpricelistner,
			SilverPriceEventListner silverpricelistner,
			ModelMapper mapper) {
		this.usecaseExecutor = usecaseExecutor;
		this.createMetalUsecase = createMetalUsecase;
		this.getAllMetalUsecase = getAllMetalUsecas;
		this.getMetalDetailsUsecase = getMetalDetailsUsecase;
		this.getAllMetalTypesOnMonitorUsecase = getAllMetalTypesOnMonitorUsecase;
		this.updateMetalUsecase = updateMetalUsecase;
		this.deleteMetalUsecase = deleteMetalUsecase;
		this.internationalGoldPriceRateUsecase = internationalGoldPriceRateUsecase;
		this.internationalSilverPriceRateUsecae = internationalSilverPriceRateUsecae;
		this.goldpricelistner = goldpricelistner;
		this.silverpricelistner = silverpricelistner;
		this.mapper = mapper;
		
	}
	
	
	@Override
	public CompletableFuture<ResponseEntity<?>> insertNewMetal(MetalCreateRequest metalRequest) {
		MetalType metalTypeInfo = mapper.map(metalRequest.getMetalType(), MetalType.class);
		metalTypeInfo.setAutoUpdatePrice(metalRequest.getMetalType().getIsAutoUpdatePrice());
		metalTypeInfo.setOnMonitor(metalRequest.getMetalType().getIsOnMonitor());
		System.out.println("METAL TYPE INFO: " + metalTypeInfo.toString());
		MetalPriceRate metalPriceRateInfo = mapper.map(metalRequest.getMetalPrice(), MetalPriceRate.class);
		return usecaseExecutor.execute(this.createMetalUsecase, new CreateMetalUsecase.InputValues(metalTypeInfo, metalPriceRateInfo), 
				(outputValues) -> ResponseEntity.ok(outputValues));
	}


	@Override
	public CompletableFuture<ResponseEntity<?>> getAllMetalTypes() {
		return usecaseExecutor.execute(this.getAllMetalUsecase, new GetAllMetalsUsecase.InputValues(), (outputValues) ->  ResponseEntity.ok(outputValues.getMetalTypes()));
	}


	@Override
	public CompletableFuture<ResponseEntity<MetalType>> getMetalTypeInDetails(String metalTypeName) {
		return usecaseExecutor.execute(this.getMetalDetailsUsecase, new GetMetalDetailsUsecase.InputValues(metalTypeName), (outputValues) -> ResponseEntity.ok(outputValues.getMetalType()));
	}


	@Override
	public CompletableFuture<ResponseEntity<?>> getAllMetalTypesOnMonitor() {
		return usecaseExecutor.execute(this.getAllMetalTypesOnMonitorUsecase, new GetAllMetalTypesOnMonitorUsecase.InputValues(), (outputValues) ->  ResponseEntity.ok(outputValues.getMetalTypes()));
	}


	@Override
	public CompletableFuture<ResponseEntity<?>> updateMetal(int metalTypeId, MetaUpdateRequest metalUpdateRequest) {
		MetalType metalTypeInfo = mapper.map(metalUpdateRequest.getMetalType(), MetalType.class);
		MetalPriceRate metalPriceRateInfo = mapper.map(metalUpdateRequest.getMetalPrice(), MetalPriceRate.class);
		metalTypeInfo.setAutoUpdatePrice(metalUpdateRequest.getMetalType().getIsAutoUpdatePrice());
		metalTypeInfo.setOnMonitor(metalUpdateRequest.getMetalType().getIsOnMonitor());
		System.out.println("METAL TYPE INFO: " + metalTypeInfo.toString());
		return usecaseExecutor.execute(this.updateMetalUsecase, new UpdateMetalUsecase.InputValues(metalTypeId, metalTypeInfo, metalPriceRateInfo), 
				(outputValues) -> ResponseEntity.ok(outputValues));
	}

//	@Override
//	public Flux<ServerSentEvent<GoldPriceRateDto>> getMetalGoldPriceRate() {
//		return Flux.interval(Duration.ofSeconds(5))
//				.flatMap(sequence ->
//						Mono.fromFuture(
//								usecaseExecutor.execute(
//										this.internationalGoldPriceRateUsecase,
//										new GetInternationalGoldPriceRateUsecase.InputValues(),
//										outputs -> mapper.map(outputs.getGoldPriceRate(), GoldPriceRateDto.class)
//								)
//						).map(goldPriceRateDto ->
//								ServerSentEvent.<GoldPriceRateDto>builder()
//										.id(String.valueOf(sequence))
//										.event("gold-price-update")
//										.data(goldPriceRateDto)
//										.build()
//						)
//				);
//	}

	@Override
	public CompletableFuture<ResponseEntity<GoldPriceRateDto>> getMetalGoldPriceRate() {
		return usecaseExecutor.execute(this.internationalGoldPriceRateUsecase, new GetInternationalGoldPriceRateUsecase.InputValues(), (outputs) -> ResponseEntity.ok(mapper.map(outputs.getGoldPriceRate(), GoldPriceRateDto.class)));
	}

	@Override
	public CompletableFuture<ResponseEntity<SseEmitter>> streamGoldPriceRate(){
		SseEmitter emitter = new SseEmitter();
        goldpricelistner.addEmitter(emitter);
        
		return CompletableFuture
				.completedFuture(ResponseEntity.ok().header("Content-Type", "text/event-stream").body(emitter));
	}

	@Override
	public CompletableFuture<ResponseEntity<SilverPriceRateDto>> getMetalSilverPriceRate() {
		return usecaseExecutor.execute(this.internationalSilverPriceRateUsecae, new GetInternationalSilverPriceRateUsecae.InputValues(), (outputs) -> ResponseEntity.ok(mapper.map(outputs.getSilverPriceRate(), SilverPriceRateDto.class)));
	}
	
	@Override
	public CompletableFuture<ResponseEntity<SseEmitter>> streamSilverPriceRate(){
		SseEmitter emitter = new SseEmitter();
        silverpricelistner.addEmitter(emitter);
		return CompletableFuture
				.completedFuture(ResponseEntity.ok().header("Content-Type", MediaType.TEXT_EVENT_STREAM.toString()).body(emitter));
	}


	@Override
	public CompletableFuture<ResponseEntity<?>> deleteMetal(int metalTypeId) {
		return usecaseExecutor.execute(this.deleteMetalUsecase, new DeleteMetalUsecase.InputValues(metalTypeId), (outputs) -> ResponseEntity.ok(outputs));
	}


}
