package com.jewelry.product.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.jewelry.common.utils.StringUtils;
import com.jewelry.metal.core.domain.MetalPriceRate;
import com.jewelry.metal.core.domain.MetalType;
import com.jewelry.metal.core.interfaces.IMetalService;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;
import com.jewelry.product.core.exeption.ProductException;
import com.jewelry.product.core.repository.ProductMaterialRepository;
import com.jewelry.product.core.repository.ProductRepository;

@Service
public class ProductService implements IProductService {

	private ProductRepository productRepo;
	private ProductMaterialRepository materialRepo;
	private IMetalService metalService;

	public ProductService(ProductRepository productRepo,
			IMetalService metalService,
			ProductMaterialRepository materialRepo) {
		this.productRepo = productRepo;
		this.metalService = metalService;
		this.materialRepo = materialRepo;
	}

	@Override
	public Product getProductById(int productId) {
		Product product = productRepo.getProductById(productId);

		return product == null ? null : product;
	}

	@Override
	public ProductPrice getCalculatedProductPrice(Product product) {
		List<ProductMaterial> productMaterials = product.getProductMaterials();
		ProductPrice currentProductPrice = product.getProductPrice();

		// Calculate the totalMetalCost
		double totalMetalCost = productMaterials.stream()
				.parallel()
				.filter(ProductMaterial::isMetal)
				.mapToDouble(metal -> {
					MetalType metalType = metalService.getMetalType(metal.getMaterialId());
					MetalPriceRate metalPrice = metalService.currentMetalPriceRate(metalType.getMetalTypeName());
					if (metalPrice == null) {
						throw new ProductException(
								"The metal price of " + metalType.getMetalTypeName() + " is currentyly null.");
					}
					return metalPrice.getSellingPrice() * metal.getMaterialWeight();
				})
				.sum();
		// Calculate the gemstoneCost
		double totalGemstoneCost = productMaterials.stream()
				.parallel()
				.filter(material -> !material.isMetal())
				.mapToDouble(gem -> {
					double gemstonePrice = gem.getGemStone().getGemstonePrice();
					if (gem.getGemStone() != null && gem.getGemStone().getGemstonePrice() == null) {
						throw new ProductException(
								"The unitprice of gemstone is not allow to null. Please set the unitprice for  gemstone name "
										+ gem.getGemStone().getGemstoneName());
					}
					return gemstonePrice * 1;
				})
				.sum();

		currentProductPrice.setTotalMetalCost(totalMetalCost);
		currentProductPrice.setTotalGemstoneCost(totalGemstoneCost);

		// Calculate the finalsalePrice
		double salePrice = (currentProductPrice.getTotalMetalCost()
				+ currentProductPrice.getTotalGemstoneCost()
				+ currentProductPrice.getLaborCost()) * currentProductPrice.getMarkupPercentage();
		currentProductPrice.setSalePrice(salePrice);

		return currentProductPrice;
	}

	@Override
	public List<ProductMaterial> getProductMaterials(int productId) {
		List<ProductMaterial> productMaterials = materialRepo.getAllProductMaterialsByProductId(productId);
		return productMaterials;
	}

	public static String generateProductIdentifier(String productName, int productId) {
		String productIdentifier = StringUtils.trimAll(productName) + " - " + "JW00" + productId;
		return productIdentifier;
	}

}
