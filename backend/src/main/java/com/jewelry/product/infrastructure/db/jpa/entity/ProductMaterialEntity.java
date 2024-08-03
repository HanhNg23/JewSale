package com.jewelry.product.infrastructure.db.jpa.entity;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.jewelry.metal.infrastructure.db.jpa.entity.MetalTypeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "product_material", schema = "jewelry-sale-db")
public class ProductMaterialEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_material_id")
	private Integer productMaterialId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	@JsonBackReference
	private ProductEntity product;
	
	@Column(name = "product_id", insertable = false, updatable = false)
	private Integer productId;
	
	@Column(name = "material_id", nullable = false)
	@Formula("(CASE WHEN is_metal = true THEN metal_type_id ELSE gemstone_id END)")
	private Integer materialId;
	
	@Column(name = "is_metal", nullable = false)
	private boolean isMetal;
	
	@Column(name = "material_weight", nullable = false, columnDefinition = "FLOAT DEFAULT 0")
	private Float materialWeight;
	
	@Column(name = "material_size", nullable = true)
	private Float materialSize;
	
	@OneToOne(targetEntity = MetalTypeEntity.class, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "material_id", referencedColumnName = "metal_type_id", insertable = false, updatable = false)
    @Transient
	private MetalTypeEntity metalType;

    @OneToOne(targetEntity = GemstoneEntity.class, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "material_id", referencedColumnName = "gemstone_id", insertable = false, updatable = false)
    @Transient
    private GemstoneEntity gemstone;  

}
