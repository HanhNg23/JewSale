package com.jewelry.invoice.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;

@Value
public class CreateWarrantyProductInput implements UseCase.InputValues {
    private Integer invoiceId;
}
