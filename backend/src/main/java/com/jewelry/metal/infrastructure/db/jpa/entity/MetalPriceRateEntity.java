package com.jewelry.metal.infrastructure.db.jpa.entity;

import java.time.LocalDateTime;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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
@Table(name = "metal_price_rate", schema = "jewelry-sale-db")
public class MetalPriceRateEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "metal_price_rate_id")
	private Integer metalPriceRateId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "metal_type_id", referencedColumnName = "metal_type_id", insertable = false, updatable = false)
	private MetalTypeEntity metalType;
	
	@Column(name = "metal_type_id")
	private Integer metalTypeId;
	
	@Column(name = "profit_sell", columnDefinition = "DOUBLE DEFAULT 0.0")
	private Double profitSell;
	
	@Column(name = "profit_buy", columnDefinition = "DOUBLE DEFAULT 0.0")
	private Double profitBuy;
	
	@Column(name = "exchange_rate", nullable = true)
	private Double exchangeRate;
	
	@Column(name = "international_price", nullable = true)
	private Double internationalPrice;
	
	@Column(name = "metal_price_spot", nullable = false)
	private Double metalPriceSpot;
	
	@Column(name = "selling_price", nullable = false)
	private Double sellingPrice;
	
	@Column(name = "buying_price", nullable = false)
	private Double buyingPrice;
		
	@Column(name = "effective_date", nullable = false)
	private LocalDateTime effectiveDate;
	
	@PrePersist
	protected void onCreate() {
		effectiveDate = LocalDateTime.now();
	}

}
