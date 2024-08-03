package com.jewelry.warranty.core.usecase.output;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;

@Value
public class CreateWarrantyTypeOutput implements UseCase.OutputValues {
    private Integer warrantyTypeId;
}
