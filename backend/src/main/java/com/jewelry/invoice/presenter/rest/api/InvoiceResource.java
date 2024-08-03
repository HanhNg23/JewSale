package com.jewelry.invoice.presenter.rest.api;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

import com.jewelry.warranty.core.domain.WarrantyProduct;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.presenter.rest.api.payload.CreateInvoicePurchasePayload;
import com.jewelry.invoice.presenter.rest.api.payload.CreateInvoiceSellPayload;
import com.jewelry.invoice.presenter.rest.api.payload.UpdateInvoicePurchasePayload;
import com.jewelry.invoice.presenter.rest.api.payload.UpdateInvoiceSellPayload;
import com.jewelry.product.core.domain.Product;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/invoices")
@Tag(name = "Invoice")
@Validated
public interface InvoiceResource {

	@GetMapping("/{id}")
	public CompletableFuture<Invoice> getInvoiceIndetails(@PathVariable("id") int invoiceId);
	
	@PostMapping("/invoice")
	@PreAuthorize("hasAnyRole('ROLE_STAFF','ROLE_MANAGER')")
	public CompletableFuture<?> createSellInvoice(@Validated @RequestBody CreateInvoiceSellPayload invoicePayload);
	
	@PutMapping("/invoice/{id}")
	@PreAuthorize("hasAnyRole('ROLE_STAFF','ROLE_MANAGER')")
	public CompletableFuture<?> updateSellInvoice(@PathVariable(name = "id", required = true) int id, @Validated @RequestBody UpdateInvoiceSellPayload invoicePayload);

	@PutMapping("/invoice/{id}/{status}")
	@PreAuthorize("hasAnyRole('ROLE_STAFF','ROLE_MANAGER')")
	public CompletableFuture<?> updateStausSellInvoice(@PathVariable(name = "id", required = true) int id,@PathVariable(name = "status", required = true) TransactionStatus status);


	@PostMapping("/invoice/purchase")
	@PreAuthorize("hasAnyRole('ROLE_STAFF','ROLE_MANAGER')")
	public CompletableFuture<?> createPurchaseInvoice(@Validated @RequestBody CreateInvoicePurchasePayload invoicePayload);
	
	@PutMapping("/invoice/purchase/{id}")
	@PreAuthorize("hasAnyRole('ROLE_STAFF','ROLE_MANAGER')")
	public CompletableFuture<?> updatePurchaseInvoice(@PathVariable(name = "id", required = true) int id, @Validated @RequestBody UpdateInvoicePurchasePayload invoicePayload);
	
	@GetMapping("/")
	public CompletableFuture<?> getAllInvoicesWithPagination(
			@RequestParam(value = "customerName", required = false) Optional<String> customerName,
	        @RequestParam(value = "transactionDateFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<LocalDateTime> transactionDateFrom,
	        @RequestParam(value = "transactionDateEnd", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Optional<LocalDateTime> transactionDateEnd,
	        @RequestParam(value = "transactionStatus", required = false) Optional<Set<TransactionStatus>> transactionStatus,
	        @RequestParam(value = "sortBy", defaultValue = "DESC") Optional<Sort.Direction> sortBy,
	        @RequestParam(value = "pageNo", defaultValue = "0") Optional<Integer> pageNo,
	        @RequestParam(value = "pageSize", defaultValue = "9") Optional<Integer> pageSize);
	
	@GetMapping("/products")
    CompletableFuture<List<InvoiceItem>> getAllInvoiceItemWithSearchSortFilterByInvoiceId(
    		@RequestParam(value = "invoiceId", required = true) Integer invoiceId,
			@RequestParam(value = "productSearchKeyword", required = false) Optional<String> searchKeyword,
			@RequestParam(value = "productType", required = false) Optional<Set<String>> productType,
			@RequestParam(value = "productMetalGroup", required = false) Optional<Set<String>> metalGroup,
			@RequestParam(value = "productMetalTypes", required = false) Optional<Set<String>> metalTypes,
			@RequestParam(value = "productGemstoneType", required = false) Optional<Set<String>> gemstoneType,
			@RequestParam(value = "productSaleStatus", required = false) Optional<Set<String>> saleStatus,
			@RequestParam(value = "productSortBy", required = false, defaultValue = "DESC") Optional<Sort.Direction> sortBy);
	
	@DeleteMapping("/{id}")
    CompletableFuture<?> deleteInvoice(@PathVariable("id") int id);

	@PostMapping("/warranties/{id}")
	CompletableFuture<List<WarrantyProduct>> createWarrantyProducts(@PathVariable("id") int id);
		
}
