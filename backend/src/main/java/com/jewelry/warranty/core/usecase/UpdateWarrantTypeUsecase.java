package com.jewelry.warranty.core.usecase;

import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.core.usecase.input.UpdateWarrantTypeInput;
import com.jewelry.warranty.core.usecase.output.UpdateWarrantTypeOutput;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateWarrantTypeUsecase extends UseCase<UpdateWarrantTypeInput,UpdateWarrantTypeOutput> {
    private final IWarrantyRepository warrantyRepository;
    private final ModelMapper mapper;
    @Override
    public UpdateWarrantTypeOutput execute(UpdateWarrantTypeInput input) {
        WarrantyType warrantyType = mapper.map(input, WarrantyType.class);
        WarrantyType updatedWarrantyType = warrantyRepository.updateWarrantyType(warrantyType);
        return mapper.map(updatedWarrantyType, UpdateWarrantTypeOutput.class);
    }
}
