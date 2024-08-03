package com.jewelry.product.core.usecase;

import static com.jewelry.common.constant.GroupName.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.jewelry.common.constant.ProductSaleStatus;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.groupelement.core.domain.GroupElement;
import com.jewelry.groupelement.core.exception.NotInGroupException;
import com.jewelry.groupelement.core.service.GroupElementService;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.exception.MetalNotFoundException;
import com.jewelry.metal.core.interfaces.IMetalService;
import com.jewelry.product.core.domain.GemStone;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;
import com.jewelry.product.core.exeption.ProductException;
import com.jewelry.product.core.repository.GemstoneRepository;
import com.jewelry.product.core.repository.ProductRepository;
import com.jewelry.product.service.IProductService;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class CreateProductUsecase extends UseCase<CreateProductUsecase.InputValues, CreateProductUsecase.OutputValues> {

	private ProductRepository productRepo;
	private GroupElementService groupElementService;
	private IMetalService metalService;
	private GemstoneRepository gemstoneRepo;
	private IProductService productService;

	@Override
	@Transactional
	public OutputValues execute(InputValues input) {
		Product savedproduct = null;
		try {
			Product productInput = input.product;
			Product product = this.validateProduct(productInput);
			List<ProductMaterial> productMaterials = this.validateProductMaterial(productInput.getProductMaterials());
			product.setProductMaterials(productMaterials);
			ProductPrice productPrice = productService.getCalculatedProductPrice(product);
			product.setProductPrice(productPrice);
			savedproduct = productRepo.saveProduct(product);
		} catch (Exception e) {
			// Rollback transaction on error
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			e.printStackTrace();
			throw new RuntimeException("Failed to create product: " + e.getMessage(), e);
		}

		return new OutputValues(savedproduct);
	}

	@Value
	public static class InputValues implements UseCase.InputValues {
		private final Product product;
	}

	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private final Product product;
	}

	private Product validateProduct(Product product) {
		// Check if duplicated product name
		String reformatProductName = StringUtils.capitalizeFirstLetterSentence(product.getName());
		String reformatProductType = StringUtils.trimAll(product.getProductType()).toLowerCase();
		String unitmeasure = StringUtils.trimAll(product.getUnitMeasure().toLowerCase());
		String reformtDesription = StringUtils
				.capitalizeFirstLetterSentence(Optional.ofNullable(product.getDescription()).orElse(""));

		product.setName(reformatProductName);
		product.setDescription(reformtDesription);
		product.setUnitMeasure(unitmeasure);
		product.setUpdatedAt(LocalDateTime.now());

		// Check if productType is in range of db product type
		GroupElement jewelryPproductType = null;
		try {
			jewelryPproductType = groupElementService.getElementInGroup(reformatProductType,
					JEWELRY_TYPE.getDisplayName());
		} catch (NotInGroupException ex) {

		}
		if (jewelryPproductType == null) {
			jewelryPproductType = groupElementService.insertNewElementToGroup(reformatProductType,
					JEWELRY_TYPE.getDisplayName());
		}
		product.setProductType(jewelryPproductType.getElementValue());

		// check the match between stock quantity and product status sale
		if (product.getStockQuantity() == 0
				&& !product.getSaleStatus().equalsIgnoreCase(ProductSaleStatus.OUT_OF_STOCKE.getDisplayName()))
			throw new ProductException("The stocke quantity of product is 0. Must set sale status is "
					+ ProductSaleStatus.OUT_OF_STOCKE.getDisplayName());

		if (product.getStockQuantity() > 0
				&& !product.getSaleStatus().equalsIgnoreCase(ProductSaleStatus.INSTOCK.getDisplayName()))
			throw new ProductException("The stocke quantity of product is greater than 0. Must set sale status is "
					+ ProductSaleStatus.INSTOCK.getDisplayName());

		return product;
	}

	@Transactional
	private List<ProductMaterial> validateProductMaterial(List<ProductMaterial> productMaterials) {
		// 1. Check the MetalType of ProductMaterial

		List<ProductMaterial> metals = productMaterials.stream().parallel().filter(x -> x.isMetal())
				.collect(Collectors.toList());
		List<ProductMaterial> gemStones = productMaterials.stream().parallel().filter(x -> !x.isMetal()).toList();
		if ((metals == null || metals.isEmpty()) && (gemStones == null || gemStones.isEmpty()))
			throw new ProductException("The proeduct require at least one product material: gemstone or metal");
		if (metals != null && !metals.isEmpty()) {
			metals.parallelStream().forEach(metal -> metal.getMetalType().setMetalTypeName(
					StringUtils.capitalizeFirstLetterSentence(metal.getMetalType().getMetalTypeName())));
		}

		if (gemStones != null && !gemStones.isEmpty()) {
			gemStones.stream().forEach(gem -> {
				gem.getGemStone().setGemstoneName(
						StringUtils.capitalizeFirstLetterSentence(gem.getGemStone().getGemstoneName()));

				// check gemstone seriaNumber
				long duplicateSerialNumber = gemStones.stream().filter(
						x -> x.getGemStone().getSeriaNumber().equalsIgnoreCase(gem.getGemStone().getSeriaNumber()))
						.count();
				if (duplicateSerialNumber != 1) {
					throw new ProductException("Please set different serial number for the duplicated serial number "
							+ gem.getGemStone().getSeriaNumber());
				}

				GemStone gemstoneDuplicateSerialNumber = gemstoneRepo
						.getGemstoneBySeriaNumber(gem.getGemStone().getSeriaNumber()).orElse(null);
				if (gemstoneDuplicateSerialNumber != null) {
					throw new ProductException("Please set another serial number for the already existed serial number "
							+ gemstoneDuplicateSerialNumber.getSeriaNumber());
				}
			});
		}

		// process metalTypeMaterial
		List<ProductMaterial> metalTypeMaterials = new ArrayList<ProductMaterial>();
		metals.stream().forEach(metal -> {
			String metalTypeName = metal.getMetalType().getMetalTypeName();
			try {
				long countDuplicate = metals.stream()
						.filter(x -> x.getMetalType().getMetalTypeName().equalsIgnoreCase(metalTypeName)).count();
				if (countDuplicate != 1) {
					throw new ProductException("There is the duplicated the metal type name " + metalTypeName
							+ " in the list of material");
				}
				try {
					MetalType metalTypeDB = metalService.getMetalTypeByName(metalTypeName);
					metal.setMetalType(metalTypeDB);
					metal.setMaterialId(metalTypeDB.getMetalTypeId());
					metalTypeMaterials.add(metal);
				} catch (MetalNotFoundException ex) {
					throw new ProductException("The metal type name " + metalTypeName
							+ " has not config in metals list. Go to metal management to config for this kind of metal.");
				}

			} catch (MetalNotFoundException ex) {
				throw new ProductException(ex.getMessage());
			}
		});

		// 2. Check the GemsStoneType of ProductMaterial
		// Check the GemsStone Input is already exist in db or user want to create
		// completely new GemsStoneType for their product

		List<ProductMaterial> genstoneMaterials = new ArrayList<ProductMaterial>();
		if (gemStones != null && !gemStones.isEmpty()) {
			gemStones.forEach(gem -> {
				// Test gemstone type is in group of gemstone type
				if (gem.getGemStone().getGemstoneType() != null) {
					GroupElement gemstoneType = null;
					gem.getGemStone().setGemstoneType(StringUtils.trimAll(gem.getGemStone().getGemstoneType()));
					String gemstoneTypeTest = gem.getGemStone().getGemstoneType();
					try {
						gemstoneType = groupElementService.getElementInGroup(gemstoneTypeTest,
								GEMSTONE_TYPE.getDisplayName());
					} catch (NotInGroupException ex) {

					}
					if (gemstoneType == null) {
						gemstoneType = groupElementService.insertNewElementToGroup(gemstoneTypeTest,
								GEMSTONE_TYPE.getDisplayName());
					}
				}

				// Test gemstone certificate type is in group of certificate type
				if (gem.getGemStone().getCertificateType() != null) {
					GroupElement gemstoneCertType = null;
					gem.getGemStone().setCertificateType(StringUtils.trimAll(gem.getGemStone().getCertificateType()));
					String gemstoneCertTypeTest = gem.getGemStone().getCertificateType();
					try {
						gemstoneCertType = groupElementService.getElementInGroup(gemstoneCertTypeTest,
								GEMSTONE_CERT_TYPE.getDisplayName());
					} catch (NotInGroupException ex) {

					}
					if (gemstoneCertType == null) {
						gemstoneCertType = groupElementService.insertNewElementToGroup(gemstoneCertTypeTest,
								GEMSTONE_CERT_TYPE.getDisplayName());
					}
				}
				GemStone gemstoneDB = gemstoneRepo.saveNewGemstoneType(gem.getGemStone());
				gem.setGemStone(gemstoneDB);
				gem.setMaterialId(gemstoneDB.getGemstoneId());
				gem.setMetal(false);
				genstoneMaterials.add(gem);
			});
		}

		productMaterials.removeAll(productMaterials);
		productMaterials.addAll(genstoneMaterials);
		productMaterials.addAll(metalTypeMaterials);

		return productMaterials;
	}

}
