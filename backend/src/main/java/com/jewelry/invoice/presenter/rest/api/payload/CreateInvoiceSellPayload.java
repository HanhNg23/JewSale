package com.jewelry.invoice.presenter.rest.api.payload;

import java.util.List;

import com.jewelry.common.constant.PaymentMethod;
import com.jewelry.common.constant.TransactionType;
import com.jewelry.invoice.presenter.rest.api.dto.InvoiceItemSellDto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CreateInvoiceSellPayload {

	@NotNull(message = "Transaction Type is required SELL OR PURCHASE")
    @Schema(description = "Type of the transaction: bán ra, mua vào", example = "SELL")
    private TransactionType transactionType = TransactionType.SELL;

	@NotBlank(message = "Customer name is required")
	@Schema(description = "Fullname of customer", example = "Nguyen A")
	private String customerName;

	@NotBlank(message = "Customer phone is required")
	@Schema(description = "Customer phone number is required", example = "0908421897")
	@Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number")
	private String customerPhone;

    @NotEmpty(message = "Invoice items are required")
    @NotNull(message = "Invoice items are required")
    @Schema(description = "List of items in the invoice")
    @Valid
    private List<InvoiceItemSellDto> invoiceItems;

    @NotNull(message = "PaymentMethod is required")
    @Schema(description = "Method of payment")
    private PaymentMethod paymentMethod;


}
