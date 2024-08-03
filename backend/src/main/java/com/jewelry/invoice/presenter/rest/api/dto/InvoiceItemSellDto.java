package com.jewelry.invoice.presenter.rest.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class InvoiceItemSellDto {

    @NotNull(message = "Product id is required")
    @Schema(description = "ID of the product")
    private Integer productId;

    @NotNull(message = "UnitMeasure is required")
    @Schema(description = "Unit measure of the product", example = "chiếc")
    private String unitMeasure;

    @Positive(message = "the quantity must be larger than 0")
    @Schema(description = "Quantity of the product", example = "1")
    private Float quantity;
}

