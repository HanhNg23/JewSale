package com.jewelry.product.core.usecase;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.exeption.ProductNotFoundException;
import com.jewelry.product.core.repository.ProductRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@Transactional
@AllArgsConstructor
public class DeleteProductUsecase extends UseCase<DeleteProductUsecase.InputValues, DeleteProductUsecase.OutputValues> {

	private ProductRepository productRepo;
	
	@Override
	public OutputValues execute(InputValues input) {
		Product product = productRepo.getProductById(input.getProductId());
		if(product == null) {
			throw  new ProductNotFoundException(String.valueOf(input.productId));
		}
		//TODO: Handle related entities if necessary
        // For example: Check orders containing this product, reviews, etc. ví dụ về cái này
		try {
			productRepo.deleteProduct(product.getProductId());
		}catch(DataIntegrityViolationException ex) {
			Throwable rootCause = ex.getRootCause();
			if(rootCause instanceof ConstraintViolationException) {
				return new OutputValues(false, "Cannot delete product due to constraint violation");
			}
		}catch (Exception e) {
			return new OutputValues(false, e.getMessage());
		}
		return new OutputValues(true, "Delete success");
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
		int productId;

	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		boolean isDeleteSuccess;
		String message;
	}
}
