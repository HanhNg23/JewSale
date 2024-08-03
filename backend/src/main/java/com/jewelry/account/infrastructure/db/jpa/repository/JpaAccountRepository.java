package com.jewelry.account.infrastructure.db.jpa.repository;


import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaAccountRepository extends JpaRepository<AccountEntity, Integer> {
    Optional<AccountEntity> findByUsername(String username);
    Optional<AccountEntity> findByEmail(String email);
    Optional<AccountEntity> findByPhonenumberAndFullname(String phonenumber, String fullname);
    @Query("SELECT a FROM AccountEntity a WHERE (:name IS NULL OR LOWER(a.username) LIKE LOWER(CONCAT('%', :name, '%'))) OR (:name IS NULL OR LOWER(a.fullname) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<AccountEntity> findAllByUsernameOrFullname(@Param("name") String name);
    
    @Query("SELECT a FROM AccountEntity a WHERE LOWER(a.fullname) = LOWER(:fullname) AND a.phonenumber = :phonenumber AND a.role = 'CUSTOMER'")
    Optional<AccountEntity> findCustomerByPhonenumberAndFullname(@Param("phonenumber") String phonenumber, @Param("fullname") String fullname);

}	