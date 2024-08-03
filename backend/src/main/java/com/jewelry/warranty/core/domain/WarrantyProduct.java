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
public class WarrantyProduct {
    private Integer warrantyProductId;

    private Integer productId;

    private String productName;

    private Integer invoiceId;

    private String customerName;

    private Integer warrantyTypeId;

    private LocalDateTime startDate;

    private LocalDateTime endDate;
}

