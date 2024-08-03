package com.jewelry.invoice.core.usecase;

import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceItemEntity;
import com.jewelry.invoice.infrastructure.db.jpa.repository.JpaInvoiceRepository;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.repository.GemstoneRepository;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.repository.JpaProductRepository;
import com.jewelry.promotion.core.domain.PromotionCode;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UpdateStatusInvoice extends UseCase<UpdateStatusInvoice.InputValues, UpdateStatusInvoice.OutputValues> {
    private JpaInvoiceRepository jpaInvoiceRepository;
    private InvoiceRepository invoiceRepo;
    private InvoiceRepository invoiceRepository;
    private IWarrantyRepository warrantyRepository;
    private ProductRepository productRepository;
    private ProductMaterialRepository productMaterialRepository;
    private MetalTypeRepository metalTypeRepository;
    private GemstoneRepository gemstoneRepository;

    private JpaProductRepository jpaProductRepository;
    @Override
    public OutputValues execute(InputValues input) {
//        Invoice invoice = invoiceRepo.getInvoiceById(input.invoiceId).get();
//        invoice.setStatus(input.status);
//        Invoice update = invoiceRepo.updateInvoice(invoice);

        InvoiceEntity invoice = jpaInvoiceRepository.findById(input.invoiceId).get();
        invoice.setStatus(input.status);
        jpaInvoiceRepository.save(invoice);

        if(input.status.equals(TransactionStatus.PAID)){
            List<InvoiceItemEntity> invoiceItems = invoice.getInvoiceItems();
            List<WarrantyProduct> warrantyProductList = new ArrayList<>();

            for (InvoiceItemEntity i : invoiceItems) {
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

                        finalGemstoneGroups.add(gemstone.getGemstoneType());
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


        if(input.status.equals(TransactionStatus.CANCELLED)){
            List<InvoiceItemEntity> invoiceItems = invoice.getInvoiceItems();
            invoiceItems.forEach(i->{
                ProductEntity p = jpaProductRepository.findById(i.getProductId()).get();
                p.setStockQuantity(p.getStockQuantity() + Integer.parseInt(i.getQuantity().toString()));
                jpaProductRepository.save(p);
            });
        }
        return new OutputValues(invoice.getInvoiceId());
    }

    @Value
    public static class InputValues implements UseCase.InputValues {
        private final int invoiceId;
        private final TransactionStatus status;

    }

    @Value
    public static class OutputValues implements UseCase.OutputValues {
        private final int invoiceId;
    }
}
