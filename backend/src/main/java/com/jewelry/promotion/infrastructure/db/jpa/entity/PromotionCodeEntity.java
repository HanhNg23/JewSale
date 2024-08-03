package com.jewelry.promotion.infrastructure.db.jpa.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "promotion_code")
public class PromotionCodeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_code_id")
    private Integer promotionCodeId;

    @Column(name = "promotion_name", nullable = false, length = 500)
    private String promotionName;

    @Column(name = "code", nullable = false, length = 200)
    private String code;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "discount_type", nullable = false, length = 45)
    private String discountType;

    @Column(name = "discount_value", nullable = false)
    private Double discountValue;

    @Column(name = "max_discount_value")
    private Double maxDiscountValue;

    @Column(name = "discount_formular", nullable = false, length = 500)
    private String discountFormula;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

    @Column(name = "usage_limit")
    private Integer usageLimit;

    @Column(name = "usage_count")
    private Integer usageCount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "updated_by", nullable = false)
    private Integer updatedBy;

}