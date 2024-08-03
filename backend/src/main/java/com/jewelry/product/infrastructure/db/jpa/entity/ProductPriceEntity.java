package com.jewelry.product.infrastructure.db.jpa.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "product_price", schema = "jewelry-sale-db")
public class ProductPriceEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_price_id")
	private Integer productPriceId;

	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
	@JsonManagedReference
    private ProductEntity product;

	@Column(name = "product_id", insertable = false, updatable = false)
	private Integer productId; // Directly mapped to product_id column

	@Column(name = "total_metal_cost", nullable = false, columnDefinition = "DOUBLE PRECISION DEFAULT 0")
	private Double totalMetalCost;
	
	@Column(name = "total_gemstone_cost", nullable = false, columnDefinition = "DOUBLE PRECISION DEFAULT 0")
	private Double totalGemstoneCost;
	
	@Column(name = "labor_cost", nullable = false, columnDefinition = "DOUBLE PRECISION DEFAULT 0")
	private Double laborCost;
	
	@Column(name = "markup_percentage", nullable = false, columnDefinition = "DOUBLE PRECISION DEFAULT 0")
	private Float markupPercentage;
	
	@Column(name = "sale_price",  nullable = false, columnDefinition = "DOUBLE PRECISION DEFAULT 0")
	private Double salePrice;

}
