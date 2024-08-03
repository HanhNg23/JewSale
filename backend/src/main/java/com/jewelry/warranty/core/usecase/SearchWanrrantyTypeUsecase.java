package com.jewelry.warranty.core.usecase;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.core.usecase.input.SearchWanrrantyTypeInput;
import com.jewelry.warranty.core.usecase.output.SearchWanrrantyTypeOutput;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SearchWanrrantyTypeUsecase extends UseCase<SearchWanrrantyTypeInput, SearchWanrrantyTypeOutput> {
    private final IWarrantyRepository warrantyRepository;
    private final ModelMapper mapper;

    @Override
    public SearchWanrrantyTypeOutput execute(SearchWanrrantyTypeInput input) {
        Page<WarrantyType> warrantyTypePage = warrantyRepository.searchWarrantyType(
                input.getWarrantyName(),
                input.getJewelryTypes(),
                input.getMetalGroups(),
                input.getGemstoneGroups(),
                input.getPageable()
        );
        return new SearchWanrrantyTypeOutput(warrantyTypePage);
    }


}
