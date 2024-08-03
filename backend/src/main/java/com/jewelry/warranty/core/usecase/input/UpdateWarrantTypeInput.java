package com.jewelry.warranty.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import java.time.LocalDate;
import java.util.List;


@Setter
@Getter
public class UpdateWarrantTypeInput implements UseCase.InputValues {
    private Integer warrantyTypeId;
    private String warrantyName;
    private String specificConditions;
    private String repairInformation;
    private List<String> jewelryTypes;
    private List<String> metalGroups;
    private List<String> gemstoneGroups;
    private LocalDate effectiveDate;
    private Integer duration;
}
