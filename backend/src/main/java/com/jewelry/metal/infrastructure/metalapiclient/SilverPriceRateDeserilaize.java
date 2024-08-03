package com.jewelry.metal.infrastructure.metalapiclient;

import java.io.IOException;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

public class SilverPriceRateDeserilaize extends JsonDeserializer<SilverPriceRate> {

	@Override
	public SilverPriceRate deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException, JacksonException {
		JsonNode rootNode = jsonParser.getCodec().readTree(jsonParser);

		SilverPriceRate silverPriceRate = new SilverPriceRate();
        silverPriceRate.setSilverOunceInVnd(Double.parseDouble(rootNode.get("silver_ounce_in_vnd").asText()));
        silverPriceRate.setGmtOuncePriceUsdUpdated(rootNode.get("gmt_ounce_price_usd_updated").asText());
        silverPriceRate.setUsdToVnd(Double.parseDouble(rootNode.get("usd_to_vnd").asText()));
        silverPriceRate.setGmtVndUpdated(rootNode.get("gmt_vnd_updated").asText());
        silverPriceRate.setGramToOunceFormula(Double.parseDouble(rootNode.get("gram_to_ounce_formula").asText()));
        silverPriceRate.setSilverGramInUsd(Double.parseDouble(rootNode.get("silver_gram_in_usd").asText()));
        silverPriceRate.setSilverGramInVnd(Double.parseDouble(rootNode.get("silver_gram_in_vnd").asText()));
		
        return silverPriceRate;

	}

}
