package com.jewelry.warranty.core.usecase.output;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;

@Value
public class DeleteWarrantTypeOutput implements UseCase.OutputValues{
    private String message;
}
