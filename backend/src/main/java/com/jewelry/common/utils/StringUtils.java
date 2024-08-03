package com.jewelry.common.utils;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.stream.Collectors;

public class StringUtils {
	public static String trimAll(String str) {
		if (str == null)
			return null;
		return str.trim().replaceAll("\\s{2,}", " ");
	}

	public static String capitalizeFirstLetterOfEachWord(String input) {
		if (input == null || input.isEmpty())
			return input;
		return Arrays.stream(trimAll(input).split("\\s+"))
				.map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1).toLowerCase())
				.collect(Collectors.joining(" "));

	}
	
	public static String capitalizeFirstLetterSentence(String input) {
		if (input == null || input.isEmpty())
			return input;
		String trimAllInput = trimAll(input);
		StringBuilder stringbuilder = new StringBuilder(trimAllInput.length());
		stringbuilder.append(Character.toUpperCase(trimAllInput.charAt(0)));
		stringbuilder.append(trimAllInput.substring(1));
		return stringbuilder.toString();

	}
	
	


}
