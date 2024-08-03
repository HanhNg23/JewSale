package com.jewelry.invoice.core.events;

import com.jewelry.invoice.core.domain.InvoiceItem;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.List;

@Getter
@Setter
public class UpdateProductEvent extends ApplicationEvent {
    private static final long serialVersionUID = 1L;

    private String message;
    private List<InvoiceItem> invoiceItems;

    public UpdateProductEvent(Object source, String message, List<InvoiceItem> invoiceItems) {
        super(source);
        this.message = message;
        this.invoiceItems = invoiceItems;
    }
}
