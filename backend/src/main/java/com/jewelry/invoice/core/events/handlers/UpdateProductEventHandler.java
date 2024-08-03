package com.jewelry.invoice.core.events.handlers;

import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.events.UpdateProductEvent;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.repository.JpaProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UpdateProductEventHandler implements ApplicationListener<UpdateProductEvent> {
    @Autowired
    private JpaProductRepository productRepository;
    @Override
    public void onApplicationEvent(UpdateProductEvent event) {

        List<InvoiceItem> invoiceItems = event.getInvoiceItems();
        invoiceItems.forEach(invoice->{
            ProductEntity p = productRepository.findById(invoice.getProductId()).get();
            p.setStockQuantity(p.getStockQuantity() - invoice.getQuantity());
            productRepository.save(p);
        });
    }
}
