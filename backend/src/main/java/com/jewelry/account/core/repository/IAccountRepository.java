package com.jewelry.account.core.repository;

import com.jewelry.account.core.domain.Account;

import java.util.List;
import java.util.Optional;

public interface IAccountRepository {
    List<Account> getAccountsByUsername(String username);

    Optional<Account> getAccountByUserName(String username);

    Optional<Account> getAccountByEmail(String username);
    
    Optional<Account> getCustomerAccountByPhonenumberAndFullName(String phoneNumber, String fullName);

    Optional<Account> getAccountById(int accountId);

    List<Account> getAllAccounts();

    Account createAccount(Account account);

    Account updateAccount(Account account);

    void deleteAccountById(int accountId);
}
