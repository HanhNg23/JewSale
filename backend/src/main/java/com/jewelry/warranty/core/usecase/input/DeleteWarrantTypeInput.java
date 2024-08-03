package com.jewelry.warranty.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;

@Value
public class DeleteWarrantTypeInput implements UseCase.InputValues{
    private Integer id;
}
