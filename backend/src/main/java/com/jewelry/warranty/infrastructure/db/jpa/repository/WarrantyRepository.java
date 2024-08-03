package com.jewelry.warranty.infrastructure.db.jpa.repository;

import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import com.jewelry.account.infrastructure.db.jpa.repository.JpaAccountRepository;
import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.exception.BaseDomainException;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.product.infrastructure.db.jpa.entity.ProductEntity;
import com.jewelry.product.infrastructure.db.jpa.repository.JpaProductRepository;
import com.jewelry.warranty.core.domain.Account;
import com.jewelry.warranty.core.domain.Product;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.respository.IWarrantyRepository;
import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyProductEntity;
import com.jewelry.warranty.infrastructure.db.jpa.entity.WarrantyTypeEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class WarrantyRepository implements IWarrantyRepository {
    private final JpaWarrantyProductRepository jpaWarrantyProductRepository;
    private final JpaWarrantyTypeRepository jpaWarrantyTypeRepository;
    private final JpaProductRepository jpaProductRepository;
    private final JpaAccountRepository jpaAccountRepository;
    private final ModelMapper mapper;
    @Override
    public Optional<Product> getProductById(Integer id) {
        Optional<ProductEntity> optionalProductEntity = jpaProductRepository.findById(id);
        return optionalProductEntity.map(entity -> mapper.map(entity, Product.class));
    }

    @Override
    public Optional<Account> getAccountById(Integer id) {
        Optional<AccountEntity> optionalAccountEntity = jpaAccountRepository.findById(id);
        return optionalAccountEntity.map(entity -> mapper.map(entity, Account.class));
    }

    @Override
    public WarrantyProduct createWarrantyProduct(WarrantyProduct warrantyProduct) {
        WarrantyProductEntity warrantyProductEntity = mapper.map(warrantyProduct, WarrantyProductEntity.class);
        WarrantyProductEntity savedWarrantyProductEntity = jpaWarrantyProductRepository.save(warrantyProductEntity);
        return mapper.map(savedWarrantyProductEntity, WarrantyProduct.class);
    }

    @Override
    public List<WarrantyProduct> createListWarrantyProduct(List<WarrantyProduct> warrantyProducts) {
        List<WarrantyProductEntity> entities = warrantyProducts.stream()
                .map(warrantyProduct -> mapper.map(warrantyProduct, WarrantyProductEntity.class))
                .collect(Collectors.toList());

        List<WarrantyProductEntity> savedEntities = jpaWarrantyProductRepository.saveAll(entities);

        return savedEntities.stream()
                .map(entity -> mapper.map(entity, WarrantyProduct.class))
                .collect(Collectors.toList());
    }

    @Override
    public Page<WarrantyProduct> searchWarrantyProduct(Integer warrantyProductId, String customer, String product, Pageable pageable) {
        Page<WarrantyProductEntity> entities = jpaWarrantyTypeRepository.searchWarrantyProduct(warrantyProductId, customer, product, pageable);
        return entities.map(entity -> mapper.map(entity, WarrantyProduct.class));
    }



    @Override
    public WarrantyType createWarrantyType(WarrantyType warrantyType) {
        WarrantyTypeEntity warrantyTypeEntity = mapper.map(warrantyType, WarrantyTypeEntity.class);
        WarrantyTypeEntity savedWarrantyTypeEntity = jpaWarrantyTypeRepository.save(warrantyTypeEntity);
        return mapper.map(savedWarrantyTypeEntity, WarrantyType.class);
    }

    @Override
    public Page<WarrantyType> searchWarrantyType(String warrantyName, List<String> jewelryTypes, List<String> metalGroups, List<String> gemstoneGroups, Pageable pageable) {
        Page<WarrantyTypeEntity> entities = jpaWarrantyTypeRepository.findByFilters(warrantyName, jewelryTypes, metalGroups, gemstoneGroups, pageable);
        return entities.map(entity -> mapper.map(entity, WarrantyType.class));
    }

    @Override
    public List<WarrantyType> searchWarrantyType(String warrantyName, List<String> jewelryTypes, List<String> metalGroups, List<String> gemstoneGroups) {
        List<WarrantyTypeEntity> entities = jpaWarrantyTypeRepository.findByFilters(warrantyName, jewelryTypes, metalGroups, gemstoneGroups);
        return entities.stream()
                .map(entity -> mapper.map(entity, WarrantyType.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteWarrantyTypeById(Integer id) {
        jpaWarrantyTypeRepository.deleteById(id);
    }

    @Override
    public WarrantyType updateWarrantyType(WarrantyType warrantyType) {
        WarrantyTypeEntity existingEntity = jpaWarrantyTypeRepository.findById(warrantyType.getWarrantyTypeId())
                    .orElseThrow(() ->  new ErrorResponse(ErrorCodes.WARRANTY_TYPE_DOES_NOT_EXIST.name(), ErrorCodes.WARRANTY_TYPE_DOES_NOT_EXIST.getCode()));
        existingEntity.getJewelryTypes().clear();
        existingEntity.getMetalGroups().clear();
        existingEntity.getGemstoneGroups().clear();

        mapper.map(warrantyType,existingEntity);

        WarrantyTypeEntity savedWarrantyTypeEntity = jpaWarrantyTypeRepository.save(existingEntity);
        return mapper.map(savedWarrantyTypeEntity, WarrantyType.class);
    }

    @Override
    public Optional<WarrantyType> getWarrantyTypeById(Integer id) {
        Optional<WarrantyTypeEntity> warrantyType= jpaWarrantyTypeRepository.findById(id);
        return warrantyType.map(entity -> mapper.map(entity, WarrantyType.class));
    }

    @Override
    public Boolean existsByInvoiceIdAndProductId(Integer invoiceId, Integer productId) {
        return jpaWarrantyTypeRepository.existsByInvoiceIdAndProductId(invoiceId,productId);
    }
}
