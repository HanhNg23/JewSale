package com.jewelry.warranty.core.domain;

import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import com.jewelry.product.core.domain.ProductMaterial;
import com.jewelry.product.core.domain.ProductPrice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private Integer productId;

    private String name;

    private String description;

    private String productType;

    private String unitMeasure;

    private String saleStatus;

    private LocalDateTime updatedAt;

    private AccountEntity updatedBy;

    private List<ProductMaterial> productMaterials;

    private ProductPrice productPrice;

    private List<String> imageUrls;


}