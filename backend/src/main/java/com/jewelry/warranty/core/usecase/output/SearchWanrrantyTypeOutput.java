package com.jewelry.warranty.core.usecase.output;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyType;
import lombok.Value;
import org.springframework.data.domain.Page;

@Value
public class SearchWanrrantyTypeOutput implements UseCase.OutputValues {
    private Page<WarrantyType> warrantyTypePage;
}