package com.jewelry.invoice.core.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jewelry.product.core.domain.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceItem {
	
    private Integer invoiceItemId;
   
    private Integer invoiceId;
    
    @JsonBackReference
    private Invoice invoice;
    
    private Integer invoiceSellId; //track for the case the item belong to invoice purchase
    
    private Integer productId;

    private String productName;
    
    private Product product;
    
    private String componentBuy;
    
    private String unitMeasure;

    private Integer quantity;

    private Double unitPrice;

    private Double discountPercentage;

    private Double subTotal;
    
    private Boolean isMetal;
}
