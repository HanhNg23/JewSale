package com.jewelry.warranty.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;
import org.springframework.data.domain.Pageable;

@Value
public class SearchWarrantyProductInput implements UseCase.InputValues{
    private Integer warrantyProductId;
    private String customer;
    private String product;
    private Pageable pageable;
}
