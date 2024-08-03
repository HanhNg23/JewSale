package com.jewelry.warranty.infrastructure.db.jpa.repository;

import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyProductHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaWarrantyProductHistoryRepository extends JpaRepository<WarrantyProductHistoryEntity,Integer> {
}
