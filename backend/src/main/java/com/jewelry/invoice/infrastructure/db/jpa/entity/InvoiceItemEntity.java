package com.jewelry.invoice.infrastructure.db.jpa.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "invoice_item")
public class InvoiceItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_item_id")
    private Integer invoiceItemId;
   
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "invoice_id", referencedColumnName = "invoice_id", insertable = false, updatable = false)
    private InvoiceEntity invoice;
    
    @Column(name = "invoice_id")
    private Integer invoiceId;
    
    @Column(name = "invoice_sell_id", nullable = true)
    private Integer invoiceSellId;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "product_id", referencedColumnName = "product_id", insertable = false, updatable = false)
    private ProductEntity product;
    
    @Column(name = "product_id")
    private Integer productId;
    
    @Column(name = "component_buy", nullable = false, length = 50)
    private String componentBuy;

    @Column(name = "unit_measure", nullable = false, length = 45)
    private String unitMeasure;

    @Column(name = "quantity", nullable = false)
    private Float quantity;

    @Column(name = "unit_price", nullable = false)
    private Double unitPrice;

    @Column(name = "discount_percentage", nullable = false)
    private Float discountPercentage;

    @Column(name = "sub_total", nullable = false)
    private Double subTotal;
    
    @Column(name = "is_metal", nullable = true)
    private Boolean isMetal;

}
