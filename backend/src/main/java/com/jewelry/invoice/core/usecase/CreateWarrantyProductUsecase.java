package com.jewelry.invoice.core.usecase;

import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.core.repository.InvoiceItemRepository;
import com.jewelry.invoice.core.repository.InvoiceRepository;
import com.jewelry.invoice.core.usecase.input.CreateWarrantyProductInput;
import com.jewelry.invoice.core.usecase.output.CreateWarrantyProductOutput;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.repository.MetalTypeRepository;
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
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CreateWarrantyProductUsecase extends UseCase<CreateWarrantyProductInput, CreateWarrantyProductOutput> {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final IWarrantyRepository warrantyRepository;
    private final ProductRepository productRepository;
    private final ProductMaterialRepository productMaterialRepository;
    private final GemstoneRepository gemstoneRepository;
    private final MetalTypeRepository metalTypeRepository;
   
    
    @Override
    public CreateWarrantyProductOutput execute(CreateWarrantyProductInput input) {
        Invoice invoice = invoiceRepository.getInvoiceById(input.getInvoiceId())
                .orElseThrow(() ->  new ErrorResponse(ErrorCodes.INVOICE_DOES_NOT_EXIST.name(), ErrorCodes.INVOICE_DOES_NOT_EXIST.getCode()));
        List<InvoiceItem> invoiceItems = invoice.getInvoiceItems();

        List<WarrantyProduct> warrantyProductList = new ArrayList<>();

        for (InvoiceItem i : invoiceItems) {
//            if (warrantyRepository.existsByInvoiceIdAndProductId(input.getInvoiceId(), i.getProductId())) {
//                continue;
//            }

			Product product = productRepository.getProductById(i.getProductId());
			if (product == null) {
				throw new ErrorResponse(ErrorCodes.PRODUCT_DOES_NOT_EXIST.name(),
						ErrorCodes.PRODUCT_DOES_NOT_EXIST.getCode());
			}

            List<ProductMaterial> productMaterials = productMaterialRepository.getAllProductMaterialsByProductId(product.getProductId());

            List<String> jewelryTypes = new ArrayList<>();
            jewelryTypes.add(product.getProductType());


            List<String> metalGroups = null;
            List<String> gemstoneGroups = null;

            List<String> finalMetalGroups = new ArrayList<>();
            List<String> finalGemstoneGroups = new ArrayList<>();
            productMaterials.forEach((m)->{
                if(m.isMetal()){
                    MetalType metalType = metalTypeRepository.getMetalTypeById(m.getMaterialId())
                            .orElseThrow(() ->  new ErrorResponse(ErrorCodes.PRODUCT_DOES_NOT_EXIST.name(), ErrorCodes.PRODUCT_DOES_NOT_EXIST.getCode()));

                    finalMetalGroups.add(metalType.getMetalGroupName());
                }else{
                    GemStone gemstone = gemstoneRepository.getGemstoneById(m.getMaterialId())
                            .orElseThrow(() ->  new ErrorResponse(ErrorCodes.PRODUCT_DOES_NOT_EXIST.name(), ErrorCodes.PRODUCT_DOES_NOT_EXIST.getCode()));

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
                    gemstoneGroups
            );
            List<WarrantyType> filteredList = list.stream()
                    .filter(warrantyType -> warrantyType.getEffectiveDate() == null || !warrantyType.getEffectiveDate().isAfter(LocalDate.now()))
                    .collect(Collectors.toList());

            LocalDateTime startDate = LocalDateTime.now();

            filteredList.forEach(w->{
                LocalDateTime endDate = startDate.plusMonths(w.getDuration());
                WarrantyProduct warrantyProduct =  WarrantyProduct.builder()
                        .productId(product.getProductId())
                        .warrantyTypeId(w.getWarrantyTypeId())
                        .startDate(startDate)
                        .endDate(endDate)
                        .invoiceId(invoice.getInvoiceId())
                        .build();
                for(int n=1;n<=i.getQuantity();n++){
                    warrantyProductList.add(warrantyProduct);
                }
            });
        };

//        List<WarrantyProduct> savedList=warrantyRepository.createListWarrantyProduct(warrantyProductList);

        return new CreateWarrantyProductOutput(warrantyProductList);
    }

}
