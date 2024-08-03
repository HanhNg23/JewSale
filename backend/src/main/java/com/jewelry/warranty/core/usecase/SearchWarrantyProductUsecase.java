package com.jewelry.warranty.core.usecase;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.core.usecase.input.SearchWarrantyProductInput;
import com.jewelry.warranty.core.usecase.output.SearchWarrantyProductOutput;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchWarrantyProductUsecase extends UseCase<SearchWarrantyProductInput, SearchWarrantyProductOutput> {
    private final IWarrantyRepository warrantyRepository;

    @Override
    public SearchWarrantyProductOutput execute(SearchWarrantyProductInput input) {
        Page<WarrantyProduct> warrantyProductPage = warrantyRepository.searchWarrantyProduct(
                input.getWarrantyProductId(),
                input.getCustomer(),
                input.getProduct(),
                input.getPageable()
        );
        return new SearchWarrantyProductOutput(warrantyProductPage);
    }
}
