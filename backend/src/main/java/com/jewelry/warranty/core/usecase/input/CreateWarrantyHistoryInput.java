package com.jewelry.warranty.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;

import java.time.LocalDateTime;

@Value
public class CreateWarrantyHistoryInput implements UseCase.InputValues{
    private String customerName;
    private String customerPhone;
    private Integer productId;
    private Integer warrantyProductId;
    private String repairRequiredNotes;
    private LocalDateTime returnDate;
    private Double repairCost;
    private String repairStatus;
    private String resultNotes;
    private Integer createdBy;
}
