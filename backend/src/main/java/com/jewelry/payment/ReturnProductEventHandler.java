package com.jewelry.payment;

import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.repository.JpaProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReturnProductEventHandler implements ApplicationListener<ReturnProductEvent> {
    @Autowired
    private JpaProductRepository productRepository;
    @Override
    public void onApplicationEvent(ReturnProductEvent event) {

        List<InvoiceItem> invoiceItems = event.getInvoiceItems();
        invoiceItems.forEach(invoice->{
            ProductEntity p = productRepository.findById(invoice.getProductId()).get();
            p.setStockQuantity(p.getStockQuantity() + invoice.getQuantity());
            productRepository.save(p);
        });
    }
}
