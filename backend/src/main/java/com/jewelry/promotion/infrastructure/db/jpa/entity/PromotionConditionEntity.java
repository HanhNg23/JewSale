package com.jewelry.promotion.infrastructure.db.jpa.entity;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "promotion_condition")
public class PromotionConditionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "condition_id")
    private int conditionId;

    @Column(name = "promtion_code_id")
    private String promotionCodeId;

    @Column(name = "condition_type", nullable = false, length = 45)
    private String conditionType;

    @Column(name = "condition_attribute", nullable = false, length = 45)
    private String conditionAttribute;

    @Column(name = "condition_operator", nullable = false, length = 45)
    private String conditionOperator;

    @Column(name = "value", nullable = false, length = 45)
    private String value;

}