package com.jewelry.metal.core.usecase;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.repository.MetalTypeRepository;
import jakarta.validation.ConstraintViolationException;
import lombok.Value;


@Service
public class DeleteMetalUsecase extends UseCase<DeleteMetalUsecase.InputValues, DeleteMetalUsecase.OutputValues> {
	private MetalTypeRepository metalTypeRepo;
	
	DeleteMetalUsecase(MetalTypeRepository metalTypeRepo) {
		this.metalTypeRepo = metalTypeRepo;
	}
	
	@Override
	public OutputValues execute(InputValues input) {
		MetalType metal = metalTypeRepo.getMetalTypeById(input.getMetalTypeId()).orElseThrow(() ->  new MetalNotFoundException(String.valueOf(input.metalTypeId)));
		//TODO: Handle related entities if necessary
        // For example: Check orders containing this product, reviews, etc. ví dụ về cái này
		try {
			metalTypeRepo.deleteMetalType(metal);
		}catch(DataIntegrityViolationException ex) {
			Throwable rootCause = ex.getRootCause();
			if(rootCause instanceof ConstraintViolationException) {
				return new OutputValues(false, "Cannot delete metal due to constraint violation");
			}
		}
		return new OutputValues(true, "Delete success");
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
		private final int metalTypeId;

	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private boolean isDeleteSuccess;
		private String message;
	}
}
