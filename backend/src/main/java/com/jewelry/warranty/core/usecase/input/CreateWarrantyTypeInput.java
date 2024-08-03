package com.jewelry.warranty.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;

@Value
public class CreateWarrantyTypeInput implements UseCase.InputValues {
    private String warrantyName;
    private String specificConditions;
    private String repairInformation;
    private List<String> jewelryTypes;
    private List<String> metalGroups;
    private List<String> gemstoneGroups;
    private LocalDate effectiveDate;
    private Integer duration;
}
