package com.jewelry.warranty.infrastructure.db.jpa.entity;

import java.time.LocalDateTime;

import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "warranty_product")
public class WarrantyProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warranty_product_id")
    private Integer warrantyProductId;

    @Column(name = "product_id", nullable = false, length = 45)
    private Integer productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", referencedColumnName = "invoice_id", insertable = false, updatable = false)
    private InvoiceEntity invoice;

    @Column(name = "invoice_id", nullable = false, length = 45)
    private Integer invoiceId;

    @Column(name = "warranty_type_id", nullable = false)
    private Integer warrantyTypeId;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

}