package com.jewelry.invoice.core.usecase.output;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import lombok.Value;

import java.util.List;

@Value
public class CreateWarrantyProductOutput implements UseCase.OutputValues{
    private List<WarrantyProduct> warrantyProduct;
}
