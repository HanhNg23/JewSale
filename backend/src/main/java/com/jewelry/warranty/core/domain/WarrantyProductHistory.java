package com.jewelry.warranty.core.domain;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WarrantyProductHistory {
    private Integer warrantyHistoryId;

    private Integer warrantyProductId;

    private String repairRequiredNotes;

    private LocalDateTime returnDate;

    private Double repairCost;

    private String repairStatus;

    private String resultNotes;

    private LocalDateTime updatedAt;

    private LocalDateTime createdAt;

    private Integer createdBy;
}
