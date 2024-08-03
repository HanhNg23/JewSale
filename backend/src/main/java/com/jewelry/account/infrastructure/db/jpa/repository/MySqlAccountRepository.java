package com.jewelry.account.infrastructure.db.jpa.repository;

import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import com.jewelry.common.exception.BaseDomainException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class MySqlAccountRepository implements IAccountRepository {
    private final JpaAccountRepository jpaAccountRepository;
    private ModelMapper mapper;

    public MySqlAccountRepository(JpaAccountRepository jpaAccountRepository) {
        this.jpaAccountRepository = jpaAccountRepository;
        this.mapper = new ModelMapper();
    }

    @Override
    public List<Account> getAccountsByUsername(String username) {
        List<AccountEntity> accountEntities = jpaAccountRepository.findAllByUsernameOrFullname(username);
        return accountEntities.stream()
                .map(entity -> mapper.map(entity, Account.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Account> getAccountByUserName(String username) {
        Optional<AccountEntity> optionalAccountEntity = jpaAccountRepository.findByUsername(username);
        return optionalAccountEntity.map(entity -> mapper.map(entity, Account.class));
    }

    @Override
    public Optional<Account> getAccountByEmail(String email) {
        Optional<AccountEntity> optionalAccountEntity = jpaAccountRepository.findByEmail(email);
        return optionalAccountEntity.map(entity -> mapper.map(entity, Account.class));
    }

    @Override
    public Optional<Account> getAccountById(int accountId) {
        Optional<AccountEntity> optionalAccountEntity = jpaAccountRepository.findById(accountId);
        return optionalAccountEntity.map(entity -> mapper.map(entity, Account.class));
    }

    @Override
    public List<Account> getAllAccounts() {
        List<AccountEntity> accountEntities = jpaAccountRepository.findAll();
        return accountEntities.stream()
                .map(entity -> mapper.map(entity, Account.class))
                .collect(Collectors.toList());
    }

    @Override
    public Account createAccount(Account account) {
        AccountEntity newAccountEntity = mapper.map(account, AccountEntity.class);
        AccountEntity savedAccountEntity = jpaAccountRepository.save(newAccountEntity);
        return mapper.map(savedAccountEntity, Account.class);
    }

    @Override
    public Account updateAccount(Account account) {

        AccountEntity newAccountEntity = mapper.map(account, AccountEntity.class);
        AccountEntity existingAccountEntity = jpaAccountRepository.findById(account.getAccountId())
                .orElseThrow(() -> new BaseDomainException("Account not found"));
        newAccountEntity.setTokens(existingAccountEntity.getTokens());
        AccountEntity savedAccountEntity = jpaAccountRepository.save(newAccountEntity);
        return mapper.map(savedAccountEntity, Account.class);
    }

    @Override
    public void deleteAccountById(int accountId) {
        jpaAccountRepository.deleteById(accountId);
    }

    @Override
    public Optional<Account> getCustomerAccountByPhonenumberAndFullName(String phoneNumber, String fullName) {
        Optional<AccountEntity> accountEntity = jpaAccountRepository.findCustomerByPhonenumberAndFullname(phoneNumber, fullName);
        return accountEntity.map(entity -> mapper.map(entity, Account.class));
    }
}