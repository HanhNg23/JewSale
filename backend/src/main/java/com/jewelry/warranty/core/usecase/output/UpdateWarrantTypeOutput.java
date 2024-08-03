package com.jewelry.warranty.core.usecase.output;

import com.jewelry.common.usecase.UseCase;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWarrantTypeOutput implements UseCase.OutputValues {
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
