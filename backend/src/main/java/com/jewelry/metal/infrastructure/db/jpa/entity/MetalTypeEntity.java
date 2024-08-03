package com.jewelry.metal.infrastructure.db.jpa.entity;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "metal_type", schema = "jewelry-sale-db")
public class MetalTypeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "metal_type_id")
	private Integer metalTypeId;
	
	@Column(name = "metal_type_name", unique = true, nullable = false)
	private String metalTypeName;
	
	@Column(name = "metal_purity", nullable = false)
	private Double metalPurity;
	
	@Column(name = "metal_group_name", nullable = false)
	private String metalGroupName;
	
	@Column(name = "is_auto_update_price", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean isAutoUpdatePrice;
	
	@Column(name = "is_on_monitor", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
	private boolean isOnMonitor;
	
	@OneToMany(mappedBy = "metalType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	List<MetalPriceRateEntity> listMetalPriceRate;
	
}
