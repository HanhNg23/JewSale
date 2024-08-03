package com.jewelry.product.infrastructure.db.jpa.repository;

import java.util.Set;
import org.springframework.data.jpa.domain.Specification;
import com.jewelry.metal.infrastructure.db.jpa.entity.MetalTypeEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.GemstoneEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductMaterialEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;

public class ProductSpecifications {
	public static Specification<ProductEntity> hasSearchKeyword(String searchKeyword) {
		return (root, query, criteriaBuilder) -> {
			if(searchKeyword == null || searchKeyword.isEmpty()) {
				return criteriaBuilder.conjunction();
			}
            String likePattern = "%" + searchKeyword.toLowerCase() + "%";
            Predicate namePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern);
            Predicate descriptionPredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likePattern);
            Predicate productTypePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("productType")), likePattern);
            return criteriaBuilder.or(namePredicate, descriptionPredicate, productTypePredicate);
		};
	}
	
	public static Specification<ProductEntity> filterByProductType(Set<String> productTypes){
		return (root, query, criteriaBuilder) -> {
			if(productTypes == null || productTypes.isEmpty()) {
				return criteriaBuilder.conjunction();
			}
			return  criteriaBuilder.lower(root.get("productType")).in(productTypes);
		};
	}
	
	public static Specification<ProductEntity> filterByMetalType(Set<String> metalTypes) {
		return (root, query, criteriaBuilder) -> {
			if(metalTypes == null || metalTypes.isEmpty()) {
				return criteriaBuilder.conjunction();
			}
			//Join with ProductMaterialEntity
			Join<ProductEntity,ProductMaterialEntity> productMaterialJoin = root.join("productMaterials", JoinType.INNER);
			Join<ProductMaterialEntity, MetalTypeEntity> metalTypeJoin = productMaterialJoin.join("metalType", JoinType.INNER);
			Predicate isMetalPredicate = criteriaBuilder.isTrue(productMaterialJoin.get("isMetal"));
			Predicate metalTypePredicate = criteriaBuilder.lower(metalTypeJoin.get("metalTypeName")).in(metalTypes);
			
			return criteriaBuilder.and(isMetalPredicate, metalTypePredicate);
		};
	}
	
	public static Specification<ProductEntity> filterByMetalGroupType(Set<String> metalGroupTypes) {
		return (root, query, criteriaBuilder) -> {
			if(metalGroupTypes == null || metalGroupTypes.isEmpty()) {
				return criteriaBuilder.conjunction();
			}
			//Join with ProductMaterialEntity
			Join<ProductEntity,ProductMaterialEntity> productMaterialJoin = root.join("productMaterials", JoinType.INNER);
			Join<ProductMaterialEntity, MetalTypeEntity> metalTypeJoin = productMaterialJoin.join("metalType", JoinType.INNER);
			Predicate isMetalPredicate = criteriaBuilder.isTrue(productMaterialJoin.get("isMetal"));
			Predicate metalTypePredicate = criteriaBuilder.lower(metalTypeJoin.get("metalGroupName")).in(metalGroupTypes);
			
			return criteriaBuilder.and(isMetalPredicate, metalTypePredicate);
		};
	}
	
	public static Specification<ProductEntity> filterByGemstoneName(Set<String> gemstoneType) {
		return (root, query, criteriaBuilder) -> {
			if(gemstoneType == null || gemstoneType.isEmpty()) {
				return criteriaBuilder.conjunction();
			}
			//Join with ProductMaterialEntity
			Join<ProductEntity,ProductMaterialEntity> productMaterialJoin = root.join("productMaterials", JoinType.INNER);
			Join<ProductMaterialEntity, GemstoneEntity> gemstoneJoin = productMaterialJoin.join("gemstone", JoinType.INNER);
			Predicate isNotMetalPredicate = criteriaBuilder.isFalse(productMaterialJoin.get("isMetal"));
			Predicate gemstonePredicate = criteriaBuilder.lower(gemstoneJoin.get("gemstoneType")).in(gemstoneType);
			return criteriaBuilder.and(isNotMetalPredicate, gemstonePredicate);
		};
	}
	
	public static Specification<ProductEntity> hasSaleStatus(Set<String> saleStatus) {
		return (root, query, criteriaBuilder) -> {
			if(saleStatus == null) {
				return criteriaBuilder.conjunction();
			}
			return criteriaBuilder.lower(root.get("saleStatus")).in(saleStatus);
		};
	}
	

}
