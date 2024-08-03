package com.jewelry.warranty.presenter;

import com.jewelry.common.dto.Page;
import com.jewelry.common.usecase.UsecaseExecutor;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.usecase.*;
import com.jewelry.warranty.core.usecase.input.*;
import com.jewelry.warranty.core.usecase.output.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;


@Component
@CrossOrigin
@AllArgsConstructor
@Tag(name = "Warranty")
public class WarrantyController implements  WarrantyResource{
    private final UsecaseExecutor usecaseExecutor;
    private final CreateWarrantyTypeUsecase createWarrantyTypeUsecase;
    private final SearchWanrrantyTypeUsecase searchWanrrantyTypeUsecase;
    private final DeleteWarrantTypeUsecase deleteWarrantTypeUsecase;
    private final UpdateWarrantTypeUsecase updateWarrantTypeUsecase;
    private final SearchWarrantyProductUsecase searchWarrantyProductUsecase;
    private final CreateWarrantyHistoryUsecase createWarrantyHistoryUsecase;
    private final ModelMapper mapper;



    @Override
    public CompletableFuture<Page<WarrantyProduct>> searchWarrantyProduct(Integer warrantyProductId, String customer, String product, Integer page, Integer size) {
        if (page > 0) {
            page -= 1;
        }

        PageRequest pageable = PageRequest.of(page, size);
        return usecaseExecutor.execute(
                searchWarrantyProductUsecase,
                new SearchWarrantyProductInput(warrantyProductId, customer, product, pageable),
                outputValues -> {
                    List<WarrantyProduct> mappedList = outputValues.getWarrantyProductPage().getContent().stream()
                            .map(entity -> mapper.map(entity, WarrantyProduct.class))
                            .collect(Collectors.toList());

                    return Page.<WarrantyProduct>builder()
                            .content(mappedList)
                            .page(outputValues.getWarrantyProductPage().getPageable().getPageNumber())
                            .size(outputValues.getWarrantyProductPage().getSize())
                            .totalPages(outputValues.getWarrantyProductPage().getTotalPages())
                            .totalElements(outputValues.getWarrantyProductPage().getTotalElements())
                            .build();
                }
        );
    }

    @Override
    public CompletableFuture<CreateWarrantyTypeOutput> createWarrantyType(CreateWarrantyTypeInput request) {
        return usecaseExecutor.execute(createWarrantyTypeUsecase,request, (outputValues) -> outputValues);
    }

    @Override
    public CompletableFuture<Page<WarrantyType>> searchWarrantyType(String warrantyName, List<String> jewelryTypes, List<String> metalGroups, List<String> gemstoneGroups, Integer page, Integer size) {
        if (page > 0) {
            page -= 1;
        }

        PageRequest pageable = PageRequest.of(page, size);
        return usecaseExecutor.execute(
                searchWanrrantyTypeUsecase,
                new SearchWanrrantyTypeInput(warrantyName, jewelryTypes, metalGroups, gemstoneGroups, pageable),
                outputValues -> {
                    List<WarrantyType> mappedList = outputValues.getWarrantyTypePage().getContent().stream()
                            .map(entity -> mapper.map(entity, WarrantyType.class))
                            .collect(Collectors.toList());

                    return Page.<WarrantyType>builder()
                            .content(mappedList)
                            .page(outputValues.getWarrantyTypePage().getPageable().getPageNumber())
                            .size(outputValues.getWarrantyTypePage().getSize())
                            .totalPages(outputValues.getWarrantyTypePage().getTotalPages())
                            .totalElements(outputValues.getWarrantyTypePage().getTotalElements())
                            .build();
                }
        );
    }

    @Override
    public CompletableFuture<DeleteWarrantTypeOutput> deleteAccount(Integer id) {

        return usecaseExecutor.execute(deleteWarrantTypeUsecase,new DeleteWarrantTypeInput(id), (outputValues) -> outputValues);
    }

    @Override
    public CompletableFuture<UpdateWarrantTypeOutput> updateAccount(Integer id, UpdateWarrantTypeInput request) {
        request.setWarrantyTypeId(id);
        return usecaseExecutor.execute(updateWarrantTypeUsecase,request, (outputValues) -> outputValues);
    }
}
