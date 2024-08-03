package com.jewelry.product.infrastructure.db.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "gemstone", schema = "jewelry-sale-db")
public class GemstoneEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gemstone_id")
	private Integer gemstoneId;
	
	@Column(name = "seria", nullable = false)
	private String seriaNumber;
	
	@Column(name = "gemstone_name", nullable = false)
	private String gemstoneName;
	
	@Column(name = "stone_color",  nullable = true, columnDefinition = "VARCHAR(2500) DEFAULT 'NONE INFORMATION'")
	private String stoneColor;
	
	@Column(name = "stone_cut", nullable = true, columnDefinition = "VARCHAR(2500) DEFAULT 'NONE INFORMATION'")
	private String stoneCut;
	
	@Column(name = "stone_clarity", nullable = true, columnDefinition = "VARCHAR(2500) DEFAULT 'NONE INFORMATION'")
	private String stoneClarity;
	
	@Column(name ="carat_weight", nullable = true, columnDefinition = "VARCHAR(2500) DEFAULT 'NONE INFORMATION'")
	private Double caratWeight;
	
	@Column(name = "gemstone_price", nullable = false, columnDefinition = "DOUBLE PRECISION DEFAULT 0")
	private Double gemstonePrice;
	
	@Column(name = "gemstone_type", nullable = false)
	private String gemstoneType;

	@Column(name = "certificate_no", nullable = true)
	private String certificateNo;
	
	@Column(name = "certificate_type", nullable = true)
	private String certificateType;
	
	@Column(name = "pieces",  nullable = false)
	private Integer pieces;
	
	

}
