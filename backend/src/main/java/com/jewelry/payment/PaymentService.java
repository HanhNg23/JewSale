package com.jewelry.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
	
	@Autowired
	private PaymentController paymentController;
	
	public void cancelPaymentByInovoiceId(int invoiceId) {
		paymentController.cancelOrder(invoiceId);
	}

}
