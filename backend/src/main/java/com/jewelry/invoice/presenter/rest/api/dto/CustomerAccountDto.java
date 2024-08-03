package com.jewelry.invoice.presenter.rest.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.micrometer.common.lang.Nullable;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerAccountDto {
	@JsonProperty("customerId")
	@Nullable
    private Integer accountId;
	
	@JsonProperty("fullname")
	@NotNull(message = "Customer full name is required")
	@Schema(description = "Fullname of customer", example = "Nguyen A")
    private String fullname;
	
	@JsonProperty("phonenumer")
	@Pattern(regexp = "^(\\+84|0)\\d{9,10}$", message = "Invalid phone number. Vietnam phonenumber start with +84 or 0, followed the number length 9-10 numbers")
	@Schema(description = "Phone number of customer", example = "0909406782")
    private String phonenumber;
}