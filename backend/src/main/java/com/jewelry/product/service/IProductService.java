package com.jewelry.product.service;

import java.util.List;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;

public interface IProductService {
	public Product getProductById(int productId);
	
	public ProductPrice getCalculatedProductPrice(Product product);
	
	public List<ProductMaterial> getProductMaterials(int productId);

}
