package com.jewelry.warranty.core.usecase;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.core.usecase.input.CreateWarrantyHistoryInput;
import com.jewelry.warranty.core.usecase.output.CreateWarrantyHistoryOutput;
import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyProductHistoryEntity;
import com.jewelry.warranty.infrastructure.db.jpa.repository.JpaWarrantyProductHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CreateWarrantyHistoryUsecase extends UseCase<CreateWarrantyHistoryInput, CreateWarrantyHistoryOutput> {
    private final JpaWarrantyProductHistoryRepository jpaWarrantyProductHistoryRepository;
    private final ModelMapper mapper;

    @Override
    public CreateWarrantyHistoryOutput execute(CreateWarrantyHistoryInput input) {
        LocalDateTime d = LocalDateTime.now();
        WarrantyProductHistoryEntity entity = WarrantyProductHistoryEntity
                .builder()
                .warrantyProductId(input.getWarrantyProductId())
                .repairRequiredNotes(input.getRepairRequiredNotes())
                .returnDate(input.getReturnDate())
                .repairCost(input.getRepairCost())
                .repairStatus(input.getRepairStatus())
                .resultNotes(input.getResultNotes())
                .updatedAt(d)
                .createdAt(d)
                .createdBy(input.getCreatedBy())
                .build();

        jpaWarrantyProductHistoryRepository.save(entity);
        return null;
    }
}
