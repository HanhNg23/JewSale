package com.jewelry.payment;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.events.EventPublisher;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.payment.type.ItemData;
import com.jewelry.payment.type.PaymentData;
import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.repository.GemstoneRepository;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final PayOS payOS;
    private final InvoiceRepository invoiceRepository;
    private final PaymentRepository paymentRepository;
    private final IWarrantyRepository warrantyRepository;
    private final ProductRepository productRepository;
    private final ProductMaterialRepository productMaterialRepository;
    private final MetalTypeRepository metalTypeRepository;
    private final GemstoneRepository gemstoneRepository;
    private final EventPublisher publisher;

    @PostMapping(path = "/create")
    public ObjectNode createPaymentLink(@RequestBody PaymentRequest request) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Invoice invoice = invoiceRepository.getInvoiceById(request.getInvoiceId())
                    .orElseThrow(() -> new ErrorResponse(ErrorCodes.INVOICE_DOES_NOT_EXIST.name(),
                            ErrorCodes.INVOICE_DOES_NOT_EXIST.getCode()));

            PaymentEntity pendingPayment = paymentRepository.findPending(invoice.getInvoiceId()).orElse(null);
            if (pendingPayment != null && "PENDING".equals(pendingPayment.getStatus())) {
                ObjectNode respon = objectMapper.createObjectNode();
                ObjectNode dataNode = objectMapper.createObjectNode();
                dataNode.put("checkoutUrl", pendingPayment.getCheckoutUrl());
                respon.put("error", 0);
                respon.put("message", "success");
                respon.put("data", dataNode);
                return respon;
            }

            final String returnUrl = request.getReturnUrl();
            final String cancelUrl = request.getCancelUrl();

            // Gen order code
            String currentTimeString = String.valueOf(String.valueOf(new Date().getTime()));
            int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));

            List<ItemData> itemList = new ArrayList<ItemData>();

            invoice.getInvoiceItems().forEach(i -> {
                ItemData item = new ItemData(i.getProductName(), i.getQuantity(),
                        (int) Math.round(i.getUnitPrice() * i.getQuantity()));
                itemList.add(item);
            });
            PaymentData paymentData = new PaymentData(orderCode, (int) Math.round(invoice.getTotalAmount()),
                    "Mua trang sức",
                    itemList, cancelUrl, returnUrl);

            JsonNode data = payOS.createPaymentLink(paymentData);

            CompletableFuture.runAsync(() -> {
                PaymentEntity paymentEntity = PaymentEntity.builder()
                        .invoiceId(invoice.getInvoiceId())
                        .createdDate(LocalDateTime.now())
                        .paymentMethod(invoice.getPaymentMethod().getDisplayName())
                        .amount(data.get("amount").asInt())
                        .status("PENDING")
                        .orderCode(data.get("orderCode").asInt())
                        .checkoutUrl(data.get("checkoutUrl").asText())
                        .qrCode(data.get("qrCode").asText())
                        .currency(data.get("currency").asText())
                        .build();
                paymentRepository.save(paymentEntity);
            });

            ObjectNode respon = objectMapper.createObjectNode();
            respon.put("error", 0);
            respon.put("message", "success");
            respon.set("data", data);
            return respon;

        } catch (Exception e) {
            e.printStackTrace();
            ObjectNode respon = objectMapper.createObjectNode();
            respon.put("error", -1);
            respon.put("message", "fail");
            respon.set("data", null);
            return respon;

        }
    }

    @GetMapping(path = "/{orderId}")
    public ObjectNode getOrderById(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();

        try {
            JsonNode order = payOS.getPaymentLinkInformation(orderId);

            respon.set("data", order);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }

    }

    @PutMapping(path = "/{orderId}")
    public ObjectNode cancelOrder(@PathVariable("orderId") int orderId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        try {
            JsonNode order = payOS.cancelPaymentLink(orderId, null);
            PaymentEntity paymentEntity = paymentRepository.findByOrderCode(order.get("orderCode").asInt())
                    .orElse(null);

            paymentEntity.setStatus("CANCELLED");
            paymentEntity.setTransactionDateTime(LocalDateTime.now());
            if (paymentEntity != null) {
                Invoice invoice = invoiceRepository.getInvoiceById(paymentEntity.getInvoiceId()).orElse(null);
                invoice.setStatus(TransactionStatus.CANCELLED);
                Invoice savedInvoice = invoiceRepository.saveInvoice(invoice);
                paymentRepository.save(paymentEntity);

                publisher.returnProductStockQuantity("Product quantity updated successfully", 	savedInvoice.getInvoiceItems());
            }
            respon.set("data", order);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }

    @PostMapping(path = "/confirm-webhook")
    public ObjectNode confirmWebhook(@RequestBody Map<String, String> requestBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        try {
            String str = payOS.confirmWebhook(requestBody.get("webhookUrl"));
            respon.set("data", null);
            respon.put("error", 0);
            respon.put("message", "ok");
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }

    @PostMapping(path = "/ipn")
    public ObjectNode payosTransferHandler(@RequestBody ObjectNode body) {

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode respon = objectMapper.createObjectNode();
        System.out.println(body);
        try {
            // Init Response
            respon.put("error", 0);
            respon.put("message", "Ok");
            respon.set("data", null);

            JsonNode data = payOS.verifyPaymentWebhookData(body);

            if (Objects.equals(data.get("desc").asText(), "Thành công")) {
                return respon;
            }
            PaymentEntity paymentEntity = paymentRepository.findByOrderCode(data.get("orderCode").asInt())
                    .orElse(null);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(data.get("transactionDateTime").asText(), formatter);
            paymentEntity.setStatus("PAID");
            paymentEntity.setTransactionDateTime(dateTime);
            paymentEntity.setReference(data.get("reference").asText());
            if (paymentEntity != null) {
                Invoice invoice = invoiceRepository.getInvoiceById(paymentEntity.getInvoiceId()).orElse(null);
                invoice.setStatus(TransactionStatus.PAID);
                invoiceRepository.saveInvoice(invoice);
                paymentRepository.save(paymentEntity);

                List<InvoiceItem> invoiceItems = invoice.getInvoiceItems();
                List<WarrantyProduct> warrantyProductList = new ArrayList<>();

                for (InvoiceItem i : invoiceItems) {
                    if (warrantyRepository.existsByInvoiceIdAndProductId(invoice.getInvoiceId(), i.getProductId())) {
                        continue;
                    }

                    Product product = productRepository.getProductById(i.getProductId());

                    List<ProductMaterial> productMaterials = productMaterialRepository
                            .getAllProductMaterialsByProductId(product.getProductId());

                    List<String> jewelryTypes = new ArrayList<>();
                    jewelryTypes.add(product.getProductType());

                    List<String> metalGroups = null;
                    List<String> gemstoneGroups = null;

                    List<String> finalMetalGroups = new ArrayList<>();
                    List<String> finalGemstoneGroups = new ArrayList<>();
                    productMaterials.forEach((m) -> {
                        if (m.isMetal()) {
                            MetalType metalType = metalTypeRepository.getMetalTypeById(m.getMaterialId())
                                    .orElseThrow(() -> new ErrorResponse(ErrorCodes.PRODUCT_DOES_NOT_EXIST.name(),
                                            ErrorCodes.PRODUCT_DOES_NOT_EXIST.getCode()));

                            finalMetalGroups.add(metalType.getMetalGroupName());
                        } else {
                            GemStone gemstone = gemstoneRepository.getGemstoneById(m.getMaterialId())
                                    .orElseThrow(() -> new ErrorResponse(ErrorCodes.PRODUCT_DOES_NOT_EXIST.name(),
                                            ErrorCodes.PRODUCT_DOES_NOT_EXIST.getCode()));

                            finalGemstoneGroups.add(gemstone.getGemstoneName());
                        }
                    });
                    if (!finalMetalGroups.isEmpty()) {
                        metalGroups = finalMetalGroups;
                    }

                    if (!finalGemstoneGroups.isEmpty()) {
                        gemstoneGroups = finalGemstoneGroups;
                    }

                    List<WarrantyType> list = warrantyRepository.searchWarrantyType(
                            null,
                            jewelryTypes,
                            metalGroups,
                            gemstoneGroups);
                    List<WarrantyType> filteredList = list.stream()
                            .filter(warrantyType -> warrantyType.getEffectiveDate() == null
                                    || !warrantyType.getEffectiveDate().isAfter(LocalDate.now()))
                            .collect(Collectors.toList());

                    LocalDateTime startDate = LocalDateTime.now();

                    filteredList.forEach(w -> {
                        LocalDateTime endDate = startDate.plusMonths(w.getDuration());
                        WarrantyProduct warrantyProduct = WarrantyProduct.builder()
                                .productId(product.getProductId())
                                .warrantyTypeId(w.getWarrantyTypeId())
                                .startDate(startDate)
                                .endDate(endDate)
                                .invoiceId(invoice.getInvoiceId())
                                .build();
                        for (int n = 1; n <= i.getQuantity(); n++) {
                            warrantyProductList.add(warrantyProduct);
                        }

                    });
                }
                ;

                warrantyRepository.createListWarrantyProduct(warrantyProductList);
            }
            System.out.println(data);
            return respon;
        } catch (Exception e) {
            e.printStackTrace();
            respon.put("error", -1);
            respon.put("message", e.getMessage());
            respon.set("data", null);
            return respon;
        }
    }
}
