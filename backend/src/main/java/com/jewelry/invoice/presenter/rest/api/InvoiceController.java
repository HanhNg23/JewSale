package com.jewelry.invoice.presenter.rest.api;

import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import com.jewelry.account.core.domain.Account;
import com.jewelry.invoice.core.usecase.*;
import com.jewelry.invoice.core.usecase.input.CreateWarrantyProductInput;
import com.jewelry.warranty.core.domain.WarrantyProduct;

import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.usecase.UsecaseExecutor;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.presenter.rest.api.payload.CreateInvoicePurchasePayload;
import com.jewelry.invoice.presenter.rest.api.payload.CreateInvoiceSellPayload;
import com.jewelry.invoice.presenter.rest.api.payload.UpdateInvoicePurchasePayload;
import com.jewelry.invoice.presenter.rest.api.payload.UpdateInvoiceSellPayload;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.usecase.GetAllProductsUsecase;
import com.jewelry.security.UserPrincipal;

@Component
@AllArgsConstructor
public class InvoiceController implements InvoiceResource {

	private UsecaseExecutor usecaseExecutor;
	private ModelMapper mapper;
	private CreateSellInvoiceUsecase createSellInvoiceUsecase;
	private UpdateSellInvoiceUsecase updateSellInvoiceUsecase;
	private CreatePurchaseInvoiceUsecase createPurchaseInvoiceUsecase;
	private UpdatePurchaseInvoiceUsecase updatePurchaseInvoiceUsecase;
	private GetInvoiceInDetailsUsecase getInvoiceInDetailsUsecase;
	private SearchSortFilterInvoicesUsecase searchSortFilterInvoicesUsecase;
	private DeleteInvoiceUsecase deleteInvoiceUsecase;
	private CreateWarrantyProductUsecase createWarrantyProductOutput;
	private GetProductsInInvoiceUsecase getProductInInvoiceUsecase;
	private UpdateStatusInvoice updateStatusInvoice;
	@Override
	public CompletableFuture<Invoice> getInvoiceIndetails(int invoiceId) {
		return usecaseExecutor.execute(getInvoiceInDetailsUsecase, new GetInvoiceInDetailsUsecase.InputValues(invoiceId), (output) -> output.getInvoice());
	}

	@Override
	public CompletableFuture<?> createSellInvoice(CreateInvoiceSellPayload invoicePayload) {
		Account currentStaffAccount = this.getCurrentAccount();
		Account customerAccount = this.reformatCustomerAccount(invoicePayload.getCustomerName(), invoicePayload.getCustomerPhone());
		Invoice invoice = mapper.map(invoicePayload, Invoice.class);
	//	Set current staff invoice account 
				invoice.setTransactionClerk(currentStaffAccount);
				invoice.setTransactionClerkId(currentStaffAccount.getAccountId());
	//	Set customer invoice account
				invoice.setCustomer(customerAccount);
				
				System.out.println("\n INVOICE TO STRING " + invoice.toString());

		List<InvoiceItem> invoiceItems = invoicePayload.getInvoiceItems().parallelStream().map(item -> mapper.map(item, InvoiceItem.class)).collect(Collectors.toList());
		return usecaseExecutor.execute(createSellInvoiceUsecase, new CreateSellInvoiceUsecase.InputValues(invoice, invoiceItems, null), (outputValues) -> ResponseEntity.ok(outputValues.getInvoice().getInvoiceId()));
		
	}
	
	@Override
	public CompletableFuture<?> createPurchaseInvoice(CreateInvoicePurchasePayload invoicePayload) {
		Account currentStaffAccount = this.getCurrentAccount();
		Account customerAccount = this.reformatCustomerAccount(invoicePayload.getCustomerName(), invoicePayload.getCustomerPhone());
		Invoice invoice = mapper.map(invoicePayload, Invoice.class);
		//Set current staff invoice account 
				invoice.setTransactionClerk(currentStaffAccount);
				invoice.setTransactionClerkId(currentStaffAccount.getAccountId());
		//Set customer invoice account
				invoice.setCustomer(customerAccount);

		List<InvoiceItem> invoiceItems = invoicePayload.getInvoiceItems().parallelStream().map(item -> mapper.map(item, InvoiceItem.class)).collect(Collectors.toList());
		return usecaseExecutor.execute(createPurchaseInvoiceUsecase, new CreatePurchaseInvoiceUsecase.InputValues(invoice, invoiceItems, null), (outputValues) -> ResponseEntity.ok(outputValues.getInvoice().getInvoiceId()));
		
	}

	@Override
	public CompletableFuture<?> getAllInvoicesWithPagination(
			Optional<String> customerName,
			Optional<LocalDateTime> transactionDateFrom,
			Optional<LocalDateTime> transactionDateEnd,
			Optional<Set<TransactionStatus>> transactionStatus,
			Optional<Sort.Direction> sortBy,
			Optional<Integer> pageNo,
			Optional<Integer> pageSize) {
		String customerNameInput = customerName.orElse("");
	    LocalDateTime transactionDateFromInput = transactionDateFrom.orElse(null);
	    LocalDateTime transactionDateEndInput = transactionDateEnd.orElse(null);
		Set<TransactionStatus> transactionStatusInput = transactionStatus.orElse(Set.of(TransactionStatus.values()));
		Sort.Direction sortByInput = sortBy.orElse(Sort.Direction.ASC);
		int page = pageNo.orElse(0);
		int size = pageSize.orElse(9);
		
		return usecaseExecutor.execute(searchSortFilterInvoicesUsecase, new SearchSortFilterInvoicesUsecase.InputValues(
				customerNameInput,
				transactionDateFromInput,
				transactionDateEndInput,
				transactionStatusInput,
				sortByInput,
				page,
				size), 
				(outputValues) -> ResponseEntity.ok().body(outputValues.getInvoices()));
				
	}

	@Override
	public CompletableFuture<?> deleteInvoice(int id) {
		// TODO Auto-generated method stub
		return usecaseExecutor.execute(deleteInvoiceUsecase, new DeleteInvoiceUsecase.InputValues(id), (outputValues) -> ResponseEntity.ok(outputValues));

	}

	@Override
	public CompletableFuture<List<WarrantyProduct>> createWarrantyProducts(int id) {
		return usecaseExecutor.execute(createWarrantyProductOutput,new CreateWarrantyProductInput((id)), (outputValues) -> outputValues.getWarrantyProduct());
	}

	@Override
	public CompletableFuture<?> updateSellInvoice(int id, UpdateInvoiceSellPayload invoicePayload) {
		Account currentStaffAccount = this.getCurrentAccount();
		Account customerAccount = this.reformatCustomerAccount(invoicePayload.getCustomerName(), invoicePayload.getCustomerPhone());
		Invoice invoice = mapper.map(invoicePayload, Invoice.class);
	//	Set current staff invoice account 
				invoice.setTransactionClerk(currentStaffAccount);
				invoice.setTransactionClerkId(currentStaffAccount.getAccountId());
	//	Set customer invoice account
				invoice.setCustomer(customerAccount);
				
				System.out.println("\n INVOICE TO STRING " + invoice.toString());

		List<InvoiceItem> invoiceItems = invoicePayload.getInvoiceItems().parallelStream().map(item -> mapper.map(item, InvoiceItem.class)).collect(Collectors.toList());
		return usecaseExecutor.execute(updateSellInvoiceUsecase, new UpdateSellInvoiceUsecase.InputValues(id, invoice, invoiceItems, null), (outputValues) -> ResponseEntity.ok(outputValues.getInvoice().getInvoiceId()));
		
	}

	@Override
	public CompletableFuture<?> updateStausSellInvoice(int id, TransactionStatus status) {
		return usecaseExecutor.execute(updateStatusInvoice,new UpdateStatusInvoice.InputValues(id,status),(outputValues)->ResponseEntity.ok(outputValues));
	}

	@Override
	public CompletableFuture<?> updatePurchaseInvoice(int id, UpdateInvoicePurchasePayload invoicePayload) {
		Account currentStaffAccount = this.getCurrentAccount();
		Account customerAccount = this.reformatCustomerAccount(invoicePayload.getCustomerName(), invoicePayload.getCustomerPhone());
		Invoice invoice = mapper.map(invoicePayload, Invoice.class);
		//Set current staff invoice account 
				invoice.setTransactionClerk(currentStaffAccount);
				invoice.setTransactionClerkId(currentStaffAccount.getAccountId());
		//Set customer invoice account
				invoice.setCustomer(customerAccount);

		List<InvoiceItem> invoiceItems = invoicePayload.getInvoiceItems().parallelStream().map(item -> mapper.map(item, InvoiceItem.class)).collect(Collectors.toList());
		return usecaseExecutor.execute(updatePurchaseInvoiceUsecase, new UpdatePurchaseInvoiceUsecase.InputValues(id, invoice, invoiceItems, null), (outputValues) -> ResponseEntity.ok(outputValues.getInvoice().getInvoiceId()));
		
	}
	
	private Account getCurrentAccount() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		Account currentStaffAccount = userPrincipal.getUser();
		System.out.println("CURRENT STAFFF ACCOUNT: " + currentStaffAccount.toString());
		return currentStaffAccount;
	}
	
	private Account reformatCustomerAccount(String fullname, String phonenumber) {
		Account customerAccount = Account.builder()
				.fullname(StringUtils.capitalizeFirstLetterOfEachWord(fullname))
				.phonenumber(StringUtils.trimAll(phonenumber))
				.build();
		return customerAccount;
	}

	@Override
	public CompletableFuture<List<InvoiceItem>> getAllInvoiceItemWithSearchSortFilterByInvoiceId(
			Integer invoiceId,
			Optional<String> searchKeyword, 
			Optional<Set<String>> productType, 
			Optional<Set<String>> metalGroup,
			Optional<Set<String>> metalTypes, 
			Optional<Set<String>> gemstoneType, 
			Optional<Set<String>> saleStatus,
			Optional<Direction> sortBy) {
		
		String searchKeywordInput = searchKeyword.orElse("");
		Set<String> productTypeInput = productType.orElse(Set.of());
		Set<String> metalGroupInput = metalGroup.orElse(Set.of());
		Set<String> metalTypeInput = metalTypes.orElse(Set.of());
		Set<String> gemstoneTypeInput = gemstoneType.orElse(Set.of());
		Set<String> saleStatusInput = saleStatus.orElse(Set.of("sẵn bán", "hết hàng", "ngừng kinh doanh"));
		Sort.Direction sortByInput = sortBy.orElse(Sort.Direction.ASC);
		
		return usecaseExecutor.execute(getProductInInvoiceUsecase, new GetProductsInInvoiceUsecase.InputValues(
				invoiceId,
				searchKeywordInput, 
				productTypeInput,
				metalGroupInput, 
				metalTypeInput,
				gemstoneTypeInput, 
				saleStatusInput,
				sortByInput
				), (outputValues) -> outputValues.getInvoiceItems());
	}



}
