package com.jewelry.warranty.infrastructure.db.jpa.entity;

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
@Table(name = "warranty_history")
public class WarrantyProductHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warranty_history_id")
    private Integer warrantyHistoryId;

    @Column(name = "warranty_product_id", nullable = false)
    private Integer warrantyProductId;

    @Column(name = "repair_required_notes", length = 500)
    private String repairRequiredNotes;

    @Column(name = "return_date", nullable = false)
    private LocalDateTime returnDate;

    @Column(name = "repair_cost")
    private Double repairCost;

    @Column(name = "repair_status", nullable = false, length = 50)
    private String repairStatus;

    @Column(name = "result_notes", length = 500)
    private String resultNotes;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "created_by", nullable = false)
    private Integer createdBy;

}