package com.jewelry.invoice.core.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jewelry.account.core.domain.Account;
import com.jewelry.common.constant.PaymentMethod;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.constant.TransactionType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Invoice {
	
    private Integer invoiceId;

    private LocalDateTime transactionDate;

    private TransactionType transactionType;

    private String customerName;

    private String customerPhone;
    
    private Account customer;
    
    private Integer customerId;
    
    private Account transactionClerk;
    
    private Integer transactionClerkId;

    private Double totalAmount;

    private Float taxPercent;

    private Double totalDiscount; //discount apply on invoice

    private Double totalVoucherDiscount;

    private Double netAmount;

    private Integer paymentDetailsId;

    private LocalDateTime updatedAt;

    private TransactionStatus status;

    @JsonManagedReference
    private List<InvoiceItem> invoiceItems;
    
    private PaymentMethod paymentMethod;
}
