package com.jewelry.payment;

import java.time.LocalDateTime;

import com.jewelry.common.constant.PaymentMethod;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "payment_details")
public class PaymentEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private int paymentId;

    @Column(name = "invoice_id", nullable = false)
    private int invoiceId;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "payment_method", nullable = false, length = 100)
    private String paymentMethod;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "status", nullable = false, length = 100)
    private String status;


    @Column(name = "transaction_date_time")
    private LocalDateTime transactionDateTime;

    private String reference;
    private Integer orderCode;
    private String checkoutUrl;
    private String qrCode;
    private String currency;

}
