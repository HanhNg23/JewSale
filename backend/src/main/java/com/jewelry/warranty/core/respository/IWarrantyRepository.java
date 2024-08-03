package com.jewelry.warranty.core.respository;


import com.jewelry.warranty.core.domain.Account;
import com.jewelry.warranty.core.domain.Product;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.domain.WarrantyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface IWarrantyRepository {
    Optional<Product> getProductById(Integer id);
    Optional<Account> getAccountById(Integer id);
    WarrantyProduct createWarrantyProduct(WarrantyProduct warrantyProduct);
    List<WarrantyProduct> createListWarrantyProduct(List<WarrantyProduct> warrantyProduct);
    Page<WarrantyProduct> searchWarrantyProduct(Integer warrantyProductId, String customer, String product, Pageable pageable);
    WarrantyType createWarrantyType(WarrantyType warrantyType);
    Page<WarrantyType> searchWarrantyType(String warrantyName, List<String> jewelryTypes, List<String> metalGroups, List<String> gemstoneGroups, Pageable pageable);
    List<WarrantyType> searchWarrantyType(String warrantyName, List<String> jewelryTypes, List<String> metalGroups, List<String> gemstoneGroups);
    void deleteWarrantyTypeById(Integer id);
    WarrantyType updateWarrantyType(WarrantyType warrantyType);
    Optional<WarrantyType> getWarrantyTypeById(Integer id);
    Boolean existsByInvoiceIdAndProductId(Integer invoiceId, Integer productId);

}
