package com.jewelry.metal.presenter.rest.api;

import java.util.concurrent.CompletableFuture;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.presenter.rest.api.dto.GoldPriceRateDto;
import com.jewelry.metal.presenter.rest.api.dto.SilverPriceRateDto;
import com.jewelry.metal.presenter.rest.api.payload.MetaUpdateRequest;
import com.jewelry.metal.presenter.rest.api.payload.MetalCreateRequest;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/metals")
@Tag(name = "Metal")
public interface MetalResource {
	
	@GetMapping("/all")
    CompletableFuture<ResponseEntity<?>> getAllMetalTypes();
	
	@GetMapping("/all/on-monitor")
    CompletableFuture<ResponseEntity<?>> getAllMetalTypesOnMonitor();
	
	@GetMapping("/{metal-type-name}")
	CompletableFuture<ResponseEntity<MetalType>> getMetalTypeInDetails(@PathVariable("metal-type-name") String metalTypeName);

	@GetMapping(value = "/gold-price-rate")
	CompletableFuture<ResponseEntity<GoldPriceRateDto>> getMetalGoldPriceRate();
	
	@GetMapping(value = "/stream/gold-price-rate")
	CompletableFuture<ResponseEntity<SseEmitter>> streamGoldPriceRate();
	
	@GetMapping("/silver-price-rate")
	CompletableFuture<ResponseEntity<SilverPriceRateDto>> getMetalSilverPriceRate();
	
	@GetMapping(value = "/stream/silver-price-rate")
	CompletableFuture<ResponseEntity<SseEmitter>> streamSilverPriceRate();
	
	@PostMapping("/metal")
    CompletableFuture<ResponseEntity<?>> insertNewMetal(@RequestBody MetalCreateRequest metalRequest);
	
	@PutMapping("/{metal-type-id}")
    CompletableFuture<ResponseEntity<?>> updateMetal(@PathVariable("metal-type-id") int metalTypeId, @RequestBody MetaUpdateRequest metalUpdateRequest);
	
	@DeleteMapping("/{metal-type-id}")
    CompletableFuture<ResponseEntity<?>> deleteMetal(@PathVariable("metal-type-id") int metalTypeId);

	
	
	
	
	
	

}
