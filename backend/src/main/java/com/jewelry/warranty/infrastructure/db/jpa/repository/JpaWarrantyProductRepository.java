package com.jewelry.warranty.infrastructure.db.jpa.repository;

import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaWarrantyProductRepository extends JpaRepository<WarrantyProductEntity,Integer> {
}
