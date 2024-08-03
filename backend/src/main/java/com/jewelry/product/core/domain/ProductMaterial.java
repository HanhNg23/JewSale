package com.jewelry.product.core.domain;


import com.jewelry.metal.core.domain.MetalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductMaterial {

	private Integer productMaterialId;

	private Integer materialId;

	private Integer productId;

	private GemStone gemStone;

	private MetalType metalType;

	private boolean isMetal;

	private Float materialWeight;

	private Float materialSize;

}
