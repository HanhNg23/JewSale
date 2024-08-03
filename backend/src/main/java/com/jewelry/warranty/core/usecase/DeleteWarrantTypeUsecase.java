package com.jewelry.warranty.core.usecase;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.core.usecase.input.DeleteWarrantTypeInput;
import com.jewelry.warranty.core.usecase.output.DeleteWarrantTypeOutput;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteWarrantTypeUsecase extends UseCase<DeleteWarrantTypeInput, DeleteWarrantTypeOutput> {
    private final IWarrantyRepository warrantyRepository;
    private final ModelMapper mapper;

    @Override
    public DeleteWarrantTypeOutput execute(DeleteWarrantTypeInput input) {
        warrantyRepository.deleteWarrantyTypeById(input.getId());
        return new DeleteWarrantTypeOutput("Xóa loại bảo hành thành công");
    }
}
