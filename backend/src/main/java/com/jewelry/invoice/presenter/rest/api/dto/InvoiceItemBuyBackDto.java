package com.jewelry.invoice.presenter.rest.api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class InvoiceItemBuyBackDto {

	@NotNull(message = "Product id is required")
	@Schema(description = "ID of the product")
	private Integer productId;

	@NotNull(message = "UnitMeasure is required")
	@Schema(description = "Unit measure of the product", example = "chiếc")
	private String unitMeasure;

	@Positive(message = "The quantity must be larger than 0")
	@Schema(description = "Quantity of the product", example = "1")
	private Float quantity;

	@NotNull(message = " The invoice sell id is required.The id of the invoice sell which contain the product to buy back")
	@Schema(description = "The id of the invoice sell which contain the product to buy back")
	private Integer invoiceSellId;

	@NotNull(message = "The component is required ! The metal type name or the gemstone name of the product")
	@Schema(description = "The metal type name or the gemstone name of the product. If buy whole please set as \"trang sức\"")
	private String componentBuy;

	@NotNull
	@Schema(description = "The discount percentage", defaultValue = "0", example = "0")
	private Double discountPercentage;

	@NotNull
	@Schema(description = "The Unitprice", defaultValue = "0", example = "0")
	private Double unitPrice;
	
	@NotNull(message = "Set true if product buy back is metal")
	@Schema(description = "Is Metal",  example = "false")
	private Boolean isMetal;

}
