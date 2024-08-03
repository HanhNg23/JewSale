package com.jewelry.common.config;

import com.jewelry.invoice.core.domain.Invoice;
import com.jewelry.invoice.core.domain.InvoiceItem;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceItemEntity;
import com.jewelry.product.core.domain.Product;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductMaterialEntity;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyProductEntity;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

	private static ModelMapper mapper;
    @Bean
    public ModelMapper modelMapper() {
    	mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        mapper.getConfiguration().setSkipNullEnabled(true);
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        configureProductMaterialMappingToBO(mapper);
        configureProductMappingToProductBO(mapper);
        configureProductBOToEntity(mapper);
        configureProductMaterialMappingToEntity(mapper);
        configureInvoiceEntityToBO(mapper);
        configureInvoiceItemEntityToBO(mapper);
        configureInvoiceBoToEntity(mapper);
        
        
        mapper.addMappings(new PropertyMap<InvoiceItemEntity, InvoiceItem>() {
            @Override
            protected void configure() {
                map().setProductName(source.getProduct().getName());
            }
        });

        mapper.addMappings(new PropertyMap<WarrantyProductEntity, WarrantyProduct>() {
            @Override
            protected void configure() {
                map().setProductName(source.getProduct().getName());
                map().setCustomerName(source.getInvoice().getCustomerName());
            }
        });

        return mapper;
    }

    
    private void configureProductMaterialMappingToBO(ModelMapper mapper) {
        TypeMap<ProductMaterialEntity, ProductMaterial> typeMap = mapper.createTypeMap(ProductMaterialEntity.class, ProductMaterial.class);
        typeMap.addMappings(mapp -> {
            mapp.when(Conditions.isNotNull()).map(ProductMaterialEntity::getMetalType, ProductMaterial::setMetalType);
            mapp.when(Conditions.isNotNull()).map(ProductMaterialEntity::getGemstone, ProductMaterial::setGemStone);
        });
    }
    private void configureProductMaterialMappingToEntity(ModelMapper mapper) {
        TypeMap<ProductMaterial, ProductMaterialEntity> typeMap = mapper.createTypeMap(ProductMaterial.class, ProductMaterialEntity.class);
        typeMap.addMappings(mapp -> {
            mapp.when(Conditions.isNotNull()).map(ProductMaterial::getMetalType, ProductMaterialEntity::setMetalType);
            mapp.when(Conditions.isNotNull()).map(ProductMaterial::getGemStone, ProductMaterialEntity::setGemstone);
        });
    }
    
    private void configureProductMappingToProductBO(ModelMapper mapper) {

        TypeMap<ProductEntity, Product> typeMap = mapper.createTypeMap(ProductEntity.class, Product.class);
        typeMap.addMappings(mapp -> {
            mapp.when(Conditions.isNotNull()).map(ProductEntity::getProductPrice, Product::setProductPrice);
            mapp.when(Conditions.isNotNull()).map(ProductEntity::getProductMaterials, Product::setProductMaterials);
            mapp.when(Conditions.isNotNull()).map(ProductEntity::getImages, Product::setImageUrls);
        });
    }
    
    private void configureProductBOToEntity(ModelMapper mapper) {

        TypeMap<Product, ProductEntity> typeMap = mapper.createTypeMap(Product.class, ProductEntity.class);
        typeMap.addMappings(mapp -> {
            mapp.when(Conditions.isNotNull()).map(Product::getProductPrice, ProductEntity::setProductPrice);
            mapp.when(Conditions.isNotNull()).map(Product::getProductMaterials, ProductEntity::setProductMaterials);
            mapp.when(Conditions.isNotNull()).map(Product::getImageUrls, ProductEntity::setImages);
        });
    }

    
    private void configureInvoiceEntityToBO(ModelMapper mapper) {
        TypeMap<InvoiceEntity, Invoice> typeMap = mapper.createTypeMap(InvoiceEntity.class, Invoice.class);
        typeMap.addMappings(mapp -> {
           mapp.when(Conditions.isNotNull()).map(InvoiceEntity::getInvoiceItems, Invoice::setInvoiceItems);
        });
    }
    
    private void configureInvoiceItemEntityToBO(ModelMapper mapper) {
    	TypeMap<InvoiceItemEntity, InvoiceItem> typeMap = mapper.createTypeMap(InvoiceItemEntity.class, InvoiceItem.class);
    	typeMap.addMappings(mapp -> {
    		mapp.when(Conditions.isNotNull()).map(InvoiceItemEntity::getProduct, InvoiceItem::setProduct);
    	});
    }
    
    private void configureInvoiceBoToEntity(ModelMapper mapper) {
        TypeMap<Invoice, InvoiceEntity> typeMap = mapper.createTypeMap(Invoice.class, InvoiceEntity.class);
        typeMap.addMappings(mapp -> {
           mapp.when(Conditions.isNotNull()).map(Invoice::getInvoiceItems, InvoiceEntity::setInvoiceItems);
        });
    }
    


}