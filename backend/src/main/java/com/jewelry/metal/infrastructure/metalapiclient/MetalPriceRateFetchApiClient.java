package com.jewelry.metal.infrastructure.metalapiclient;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.jewelry.common.constant.MetalGroup;
import com.jewelry.common.events.EventPublisher;
import com.jewelry.metal.core.exception.MetalPriceRateApiException;
import com.jewelry.metal.core.interfaces.IMetalPriceRateApiClient;

@Component
public class MetalPriceRateFetchApiClient implements IMetalPriceRateApiClient  {

	@Value("${goldpricez.api-key}")
	private String X_API_KEY_HEADER;
	private final String GOLD_PRICE_API_URL = "https://goldpricez.com/api/rates/currency/vnd/measure/gram";
	private final String SILVER_PRICE_API_URL = "https://goldpricez.com/api/rates/currency/vnd/measure/gram/metal/all";
	private RestTemplate restTemplate;
	private static final Logger log = LoggerFactory.getLogger(MetalPriceRateApiException.class);
	//private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
	private EventPublisher publisher;
	
	MetalPriceRateFetchApiClient(RestTemplate restTemplate, EventPublisher publisher ){
		this.restTemplate = restTemplate;
		this.publisher = publisher;
	}
	
	@Override
	public GoldPriceRate fetchGolPriceRate() throws IOException, MetalPriceRateApiException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-API-KEY", X_API_KEY_HEADER);
		HttpEntity<String> entity = new HttpEntity<String>(headers);

		ResponseEntity<String> response = null;
		try {
			response = restTemplate.exchange(this.GOLD_PRICE_API_URL, HttpMethod.GET, entity, String.class);
		} catch (RestClientException e) {
			e.printStackTrace();
		}
		if (response.getStatusCode() != HttpStatus.OK) {
			throw new MetalPriceRateApiException(
					"Failed to fetch gold price rate. Status code: " + response.getStatusCode());
		}

		String responseBody = response.getBody();
		if (responseBody == null || responseBody.isEmpty()) {
			throw new MetalPriceRateApiException(
					"Empty or null response body received while fetching gold price rate.");
		}

		ObjectMapper objectMapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(GoldPriceRate.class, new GoldPriceRateDeserialize());
		objectMapper.registerModule(module);

		try {
			int startIndex = responseBody.indexOf('"');
			int lastIndex = responseBody.lastIndexOf('"');
			if (startIndex != -1 && lastIndex != -1 && startIndex < lastIndex) 
				responseBody = responseBody.substring(startIndex + 1, lastIndex).replaceAll("\\\\", "");
			return objectMapper.readValue(responseBody, GoldPriceRate.class);
		} catch (JsonProcessingException ex) {
			ex.printStackTrace();
			throw new MetalPriceRateApiException("Failed to parse gold price rate response !");
		}
	}

	@Override
	public SilverPriceRate fetchSilverPriceRate() throws IOException, MetalPriceRateApiException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-API-KEY", X_API_KEY_HEADER);
		HttpEntity<String> entity = new HttpEntity<String>(headers);

		ResponseEntity<String> response = null;
		try {
			response = restTemplate.exchange(this.SILVER_PRICE_API_URL, HttpMethod.GET, entity, String.class);
		} catch (RestClientException e) {
			e.printStackTrace();
		}
		if (response.getStatusCode() != HttpStatus.OK) {
			throw new MetalPriceRateApiException(
					"Failed to fetch gold price rate. Status code: " + response.getStatusCode());
		}

		String responseBody = response.getBody();
		if (responseBody == null || responseBody.isEmpty()) {
			throw new MetalPriceRateApiException(
					"Empty or null response body received while fetching gold price rate.");
		}

		ObjectMapper objectMapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(SilverPriceRate.class, new SilverPriceRateDeserilaize());
		objectMapper.registerModule(module);

		try {
			int startIndex = responseBody.indexOf('"');
			int lastIndex = responseBody.lastIndexOf('"');
			if (startIndex != -1 && lastIndex != -1 && startIndex < lastIndex) 
				responseBody = responseBody.substring(startIndex + 1, lastIndex).replaceAll("\\\\", "");
			return objectMapper.readValue(responseBody, SilverPriceRate.class);
		} catch (JsonProcessingException ex) {
			ex.printStackTrace();
			throw new MetalPriceRateApiException("Failed to parse gold price rate response !");
		}
	}
	
	//@Scheduled(fixedRate = 5000)
    @Scheduled(cron = "0 0 0 * * *")//midnight
	public void fetchGoldCronJob() {
		try {
			GoldPriceRate goldPrice = this.fetchGolPriceRate();
			//log.info("The time fetch gold is now {} - GOLD USD/oz PRICE NOW:  {}", dateFormat.format(new Date()), goldPrice.getOuncePriceUsd() );
			if(goldPrice != null) {
				publisher.publishUpdateMetalPriceRate("Success", true, MetalGroup.GOLD, goldPrice, null);
			}
		}catch(Exception e) {
			log.info("Fetch gold api errors");
		}
	}
	
	//@Scheduled(fixedRate = 60000)
    @Scheduled(cron = "0 0 0 * * *") //midnight
	public void fetchSilverCronJob() {
		try {
			SilverPriceRate silvePrice = this.fetchSilverPriceRate();
			if(silvePrice != null) {
				publisher.publishUpdateMetalPriceRate("Success", true, MetalGroup.SILVER, null, silvePrice);
			}
			//log.info("The time fetch silver is now {} - SILVER USD/oz PRICE NOW:  {}", dateFormat.format(new Date()), silvePrice.getSilverOunceInVnd() / silvePrice.getUsdToVnd() );
		}catch(Exception e) {
			log.info("Fetch silver api errors");
		}
	}
	
	
	
	
	

}
