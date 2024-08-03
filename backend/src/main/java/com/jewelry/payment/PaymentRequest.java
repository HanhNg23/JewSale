package com.jewelry.payment;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PaymentRequest {
    private Integer invoiceId;
    private String returnUrl;
    private String cancelUrl;
}
