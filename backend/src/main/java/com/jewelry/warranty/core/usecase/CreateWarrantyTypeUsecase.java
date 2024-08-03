package com.jewelry.warranty.core.usecase;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.core.usecase.input.CreateWarrantyTypeInput;
import com.jewelry.warranty.core.usecase.output.CreateWarrantyTypeOutput;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateWarrantyTypeUsecase extends UseCase<CreateWarrantyTypeInput, CreateWarrantyTypeOutput> {

    private final IWarrantyRepository warrantyRepository;
    private final ModelMapper mapper;
    @Override
    public CreateWarrantyTypeOutput execute(CreateWarrantyTypeInput input) {
        WarrantyType  warrantyType = mapper.map(input, WarrantyType.class);
        WarrantyType  savedWarrantyType = warrantyRepository.createWarrantyType(warrantyType);
        return new CreateWarrantyTypeOutput(savedWarrantyType.getWarrantyTypeId());
    }

    @Value
    public static class InputValues implements UseCase.InputValues {
        private String warrantyName;
        private String specificConditions;
        private String repairInformation;
        private List<String> jewelryTypes;
        private List<String> metalGroups;
        private List<String> gemstoneGroups;
        private LocalDate effectiveDate;
        private Integer duration;
    }
}
