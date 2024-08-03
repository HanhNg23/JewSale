package com.jewelry.invoice.core.usecase;

import java.time.LocalDateTime;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.exception.InvoiceException;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class SearchSortFilterInvoicesUsecase
		extends UseCase<SearchSortFilterInvoicesUsecase.InputValues, SearchSortFilterInvoicesUsecase.OutputValues> {

	private InvoiceRepository invoiceRepo;
	

	
	@Override
	public OutputValues execute(InputValues input) {
		String keyworkName = StringUtils.trimAll(input.keyworkName.toLowerCase());
		LocalDateTime transactionDateFrom = input.transactionDateFrom;
		LocalDateTime transactionDateEnd = input.transactionDateEnd;
		Set<TransactionStatus> transactionStatus = input.getTransactionStatus();
		Sort.Direction sortByOption = input.sortBy;
		if(input.pageNo < 0 || input.pageSize < 1) 
			throw new InvoiceException("Page number starts with 1. Page size must not be less than 1");
		
		Sort sort;
		sort = Sort.by(Sort.Direction.ASC, "transactionDate");
		if (sortByOption.equals(Sort.Direction.DESC))
			sort = Sort.by(Sort.Direction.DESC, "transactionDate");
		
		Pageable sortedPage = input.pageNo == 0 ? PageRequest.of(0, input.pageSize, sort)
				  : PageRequest.of(input.pageNo - 1, input.pageSize, sort);
		
		Page<Invoice> invoices = null;
		invoices =	invoiceRepo.getAllPInvoicesWithSearchSortFilter(
				keyworkName,
				transactionDateFrom,
				transactionDateEnd,
				transactionStatus,
				sortedPage);
		
		
		return new OutputValues(invoices);
	}

	@Value
	@AllArgsConstructor
	public static class InputValues implements UseCase.InputValues {
		private final String keyworkName;
		private final LocalDateTime transactionDateFrom;
		private final LocalDateTime transactionDateEnd;
		private final Set<TransactionStatus> transactionStatus;
		private final Sort.Direction sortBy;
		private final int pageNo;
		private final int pageSize;	
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final Page<Invoice> invoices;
	}

}
