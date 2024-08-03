package com.jewelry.invoice.infrastructure.db.jpa.repository;


import java.time.LocalDateTime;
import java.util.Set;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import com.jewelry.common.constant.TransactionStatus;
import com.jewelry.invoice.infrastructure.db.jpa.entity.InvoiceEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public class InvoiceSpecifications {

	public static Specification<InvoiceEntity> hasCustomerOrStaffName(String customerOrClerkName) {
		return (root, query, criteriaBuilder) -> {
			if(customerOrClerkName == null) return criteriaBuilder.conjunction(); 
			String likePattern = "%" + customerOrClerkName.toLowerCase() + "%";

			Predicate customerNameContains = criteriaBuilder.like(criteriaBuilder.lower(root.get("customerName")), likePattern);

			Join<InvoiceEntity, AccountEntity> invoiceClerkJoin = root.join("transactionClerk", JoinType.INNER);
			Predicate clerkNameContains = criteriaBuilder.like(criteriaBuilder.lower(invoiceClerkJoin.get("fullname")), likePattern);

			return criteriaBuilder.or(customerNameContains, clerkNameContains);
		};
	}
	
	public static Specification<InvoiceEntity> hasTransactionStatus(Set<TransactionStatus> transactionStatus) {
		return (root, query, criteriaBuilder) -> {
	        return root.get("status").in(transactionStatus);
		};
	}
	
	public static Specification<InvoiceEntity> betweenFromStartToEnd(LocalDateTime transactionDateFrom, LocalDateTime transactionDateEnd) {
		return (root, query, criteriaBuilder) -> {
            if (transactionDateFrom != null && transactionDateEnd != null) {
                return criteriaBuilder.between(root.get("transactionDate"), transactionDateFrom, transactionDateEnd);
            } else if (transactionDateFrom != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("transactionDate"), transactionDateFrom);
            } else if (transactionDateEnd != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("transactionDate"), transactionDateEnd);
            }
            return criteriaBuilder.conjunction(); // Always true condition, no filtering
        };
	}
	
}
