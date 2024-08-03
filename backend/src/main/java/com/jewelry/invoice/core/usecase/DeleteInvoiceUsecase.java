package com.jewelry.invoice.core.usecase;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.exception.DomainNotFoundException;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.exception.InvoiceException;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.payment.PaymentService;

import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@Transactional
@AllArgsConstructor
public class DeleteInvoiceUsecase extends UseCase<DeleteInvoiceUsecase.InputValues, DeleteInvoiceUsecase.OutputValues> {

	private PaymentService paymentService;
	private InvoiceRepository invoiceRepo;

	@Override
	public OutputValues execute(InputValues input) {
		Invoice invoice = invoiceRepo.getInvoiceById(input.getInvoiceId()).orElseThrow(() -> new DomainNotFoundException("Not found the invoice id " + input.getInvoiceId()));
			if(!invoice.getStatus().equals(TransactionStatus.CANCELLED)) 
				throw new InvoiceException("Only delte invoice in the case the invoice status is cancelled");
		try {
			//review payment if has been created
			if(invoice.getPaymentDetailsId() != null) {
				try {
					paymentService.cancelPaymentByInovoiceId(invoice.getPaymentDetailsId());
				}catch (Exception e) {
				}
			}
			invoiceRepo.deleteInvoice(invoice.getInvoiceId());
		}catch(DataIntegrityViolationException ex) {
			Throwable rootCause = ex.getRootCause();
			if(rootCause instanceof ConstraintViolationException) {
				return new OutputValues(false, "Cannot delete invoice due to constraint violation");
			}
		}
		return new OutputValues(true, "Delete success");
	}
	
	@Value
	public static class InputValues implements UseCase.InputValues {
		int invoiceId;

	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		boolean isDeleteSuccess;
		String message;
	}
}
