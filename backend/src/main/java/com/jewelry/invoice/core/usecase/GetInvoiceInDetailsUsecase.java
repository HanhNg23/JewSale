package com.jewelry.invoice.core.usecase;

import org.springframework.stereotype.Service;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.exception.InvoiceException;
import com.jewelry.invoice.core.repository.InvoiceRepository;

import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class GetInvoiceInDetailsUsecase extends UseCase<GetInvoiceInDetailsUsecase.InputValues, GetInvoiceInDetailsUsecase.OutputValues> {
	
	private InvoiceRepository invoiceRepo;

	@Override
	public OutputValues execute(InputValues input) {
		Invoice invoice = invoiceRepo.getInvoiceById(input.getInvoiceId()).orElseThrow(() -> new InvoiceException("Not found the invoice id " + input.invoiceId));
		return new OutputValues(invoice);
	}
	
	@Value
	public static class InputValues implements UseCase.InputValues {
		private final int invoiceId;
	}
	
	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final Invoice invoice;
	}

}
