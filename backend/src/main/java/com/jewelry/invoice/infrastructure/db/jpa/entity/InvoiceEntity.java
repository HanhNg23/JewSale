package com.jewelry.invoice.infrastructure.db.jpa.entity;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import com.jewelry.common.constant.PaymentMethod;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.constant.TransactionType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
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
@Table(name = "invoice")
public class InvoiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Integer invoiceId;

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @Column(name = "transaction_type", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_phone")
    private String customerPhone;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "account_id",  insertable = false, updatable = false)
    @JsonBackReference
    private AccountEntity customer;
    
    @Column(name = "customer_id")
    private Integer customerId;
    
    @ManyToOne
    @JoinColumn(name = "created_by", referencedColumnName = "account_id",  insertable = false, updatable = false)
    @JsonBackReference
    private AccountEntity transactionClerk;
    
    @Column(name = "created_by")
    private Integer transactionClerkId;

    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;

    @Column(name = "tax_percent", nullable = false)
    private Float taxPercent = 0.0F;

    @Column(name = "total_discount", nullable = false)
    private Double totalDiscount;

    @Column(name = "total_voucher_discount", nullable = false)
    private Double totalVoucherDiscount;

    @Column(name = "net_amount", nullable = false)
    private Double netAmount;
    
    @Column(name = "payment_method", nullable = false, length = 255)
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "payment_details_id")
    private Integer paymentDetailsId;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "status", nullable = false, length = 100)
    @Enumerated(EnumType.STRING)
    private TransactionStatus status;
    
    @OneToMany(mappedBy = "invoice", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<InvoiceItemEntity> invoiceItems;

    @PrePersist
    @PreUpdate
    private void setUpdateTime() {
        this.updatedAt = LocalDateTime.now();
    }
    
}
