package com.jewelry.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity,Integer> {
    @Query("SELECT p FROM PaymentEntity p WHERE p.invoiceId = :invoiceId AND p.status = 'PENDING' ORDER BY p.createdDate DESC")
    Optional<PaymentEntity> findPending(@Param("invoiceId") int invoiceId);

    Optional<PaymentEntity> findByOrderCode(int orderCode);
}
