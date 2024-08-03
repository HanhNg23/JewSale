package com.jewelry.promotion.core.domain;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionCode {

    private Integer promotionCodeId;

    private String promotionName;

    private String code;

    private String description;

    private String discountType;

    private Double discountValue;

    private Double maxDiscountValue;

    private String discountFormula;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Integer usageLimit;

    private Integer usageCount;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Integer updatedBy;
}
