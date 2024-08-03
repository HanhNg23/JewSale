package com.jewelry.warranty.core.domain;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WarrantyType {
    private Integer warrantyTypeId;

    private String warrantyName;

    private String specificConditions;

    private String repairInformation;

    private Integer duration;

    private LocalDate effectiveDate;

    private List<String> jewelryTypes;

    private List<String> metalGroups;

    private List<String> gemstoneGroups;
}
