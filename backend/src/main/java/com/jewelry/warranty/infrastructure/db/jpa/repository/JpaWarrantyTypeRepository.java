package com.jewelry.warranty.infrastructure.db.jpa.repository;

import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyProductEntity;
import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyTypeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaWarrantyTypeRepository extends JpaRepository<WarrantyTypeEntity,Integer> {
    @Query("SELECT w FROM WarrantyTypeEntity w " +
            "WHERE (:warrantyName IS NULL OR w.warrantyName LIKE %:warrantyName%) " +
            "AND (:jewelryTypes IS NULL OR EXISTS (SELECT 1 FROM w.jewelryTypes jt WHERE jt IN :jewelryTypes)) " +
            "AND (:metalGroups IS NULL OR EXISTS (SELECT 1 FROM w.metalGroups mg WHERE mg IN :metalGroups)) " +
            "AND (:gemstoneGroups IS NULL OR EXISTS (SELECT 1 FROM w.gemstoneGroups gg WHERE gg IN :gemstoneGroups))")
    Page<WarrantyTypeEntity> findByFilters(@Param("warrantyName") String warrantyName,
                                           @Param("jewelryTypes") List<String> jewelryTypes,
                                           @Param("metalGroups") List<String> metalGroups,
                                           @Param("gemstoneGroups") List<String> gemstoneGroups,
                                           Pageable pageable);

    @Query("SELECT w FROM WarrantyTypeEntity w " +
            "WHERE (:warrantyName IS NULL OR w.warrantyName LIKE %:warrantyName%) " +
            "AND (:jewelryTypes IS NULL OR EXISTS (SELECT 1 FROM w.jewelryTypes jt WHERE jt IN :jewelryTypes)) " +
            "AND (:metalGroups IS NULL OR EXISTS (SELECT 1 FROM w.metalGroups mg WHERE mg IN :metalGroups)) " +
            "AND (:gemstoneGroups IS NULL OR EXISTS (SELECT 1 FROM w.gemstoneGroups gg WHERE gg IN :gemstoneGroups))")
    List<WarrantyTypeEntity> findByFilters(@Param("warrantyName") String warrantyName,
                                           @Param("jewelryTypes") List<String> jewelryTypes,
                                           @Param("metalGroups") List<String> metalGroups,
                                           @Param("gemstoneGroups") List<String> gemstoneGroups);

    @Query("SELECT wp FROM WarrantyProductEntity wp " +
            "JOIN FETCH wp.product prod " +
            "JOIN FETCH wp.invoice inv " +
            "WHERE (:warrantyProductId IS NULL OR wp.warrantyProductId = :warrantyProductId) " +
            "AND (:customer IS NULL OR LOWER(inv.customerName) LIKE LOWER(CONCAT('%', :customer, '%'))) " +
            "AND (:product IS NULL OR LOWER(prod.name) LIKE LOWER(CONCAT('%', :product, '%')))")
    Page<WarrantyProductEntity> searchWarrantyProduct(
            @Param("warrantyProductId") Integer warrantyProductId,
            @Param("customer") String customer,
            @Param("product") String product,
            Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(wp) > 0 THEN true ELSE false END FROM WarrantyProductEntity wp WHERE wp.invoiceId = :invoiceId AND wp.productId = :productId")
    Boolean existsByInvoiceIdAndProductId(@Param("invoiceId") Integer invoiceId, @Param("productId") Integer productId);


}
