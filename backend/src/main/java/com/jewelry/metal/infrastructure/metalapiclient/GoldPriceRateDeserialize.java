package com.jewelry.metal.infrastructure.metalapiclient;

import java.io.IOException;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

public class GoldPriceRateDeserialize extends JsonDeserializer<GoldPriceRate> {

	@Override
	public GoldPriceRate deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException, JacksonException {
		JsonNode rootNode = jsonParser.getCodec().readTree(jsonParser);
		
		GoldPriceRate goldPriceRate = new GoldPriceRate();
		goldPriceRate.setOuncePriceUsd(Double.parseDouble(rootNode.get("ounce_price_usd").asText()));
        goldPriceRate.setGmtOuncePriceUsdUpdated(rootNode.get("gmt_ounce_price_usd_updated").asText());
        goldPriceRate.setUsdToVnd(Double.parseDouble(rootNode.get("usd_to_vnd").asText()));
        goldPriceRate.setGmtVndUpdated(rootNode.get("gmt_vnd_updated").asText());
        goldPriceRate.setOunceInVnd(rootNode.get("ounce_in_vnd").asDouble());
        goldPriceRate.setGramToOunceFormula(rootNode.get("gram_to_ounce_formula").asDouble());
        goldPriceRate.setGramInUsd(rootNode.get("gram_in_usd").asDouble());
        goldPriceRate.setGramInVnd(rootNode.get("gram_in_vnd").asDouble());

        return goldPriceRate;
	}

}
