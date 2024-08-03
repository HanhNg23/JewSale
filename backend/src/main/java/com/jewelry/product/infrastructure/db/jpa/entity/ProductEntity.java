package com.jewelry.product.infrastructure.db.jpa.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "product", schema = "jewelry-sale-db")
public class ProductEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "name")
	private String name;

	@Column(name = "description", length = 2500,  nullable = true, columnDefinition = "VARCHAR(2500) DEFAULT 'NONE INFORMATION'")
	private String description;

	@Column(name = "product_type",  nullable = false)
	private String productType;

	@Column(name = "unit_measure",  nullable = false)
	private String unitMeasure;
	
	@Column(name = "stock_quantity", nullable = false)
	private Integer stockQuantity;

	@Column(name = "sale_status", nullable = false)
	private String saleStatus;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "updated_by", referencedColumnName = "account_id", insertable = false, updatable = false)
	private AccountEntity updatedBy;

	@Column(name = "updated_by")
	private Integer updatedById;

	@JsonManagedReference
	@OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductMaterialEntity> productMaterials;
	
	@OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonBackReference
    private ProductPriceEntity productPrice;

	@JsonManagedReference
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	private List<ProductImageEntity> images;
	
}
