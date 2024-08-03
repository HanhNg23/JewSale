package com.jewelry.warranty.core.usecase.output;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import lombok.Value;
import org.springframework.data.domain.Page;

@Value
public class SearchWarrantyProductOutput implements UseCase.OutputValues {
    private Page<WarrantyProduct> warrantyProductPage;
}
