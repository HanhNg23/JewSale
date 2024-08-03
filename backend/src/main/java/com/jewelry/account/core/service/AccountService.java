package com.jewelry.account.core.service;

import org.springframework.stereotype.Service;

import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.common.constant.Role;
import com.jewelry.common.utils.StringUtils;

@Service
public class AccountService implements IAccountService {
	 private final IAccountRepository accountRepository;
	 
	 public AccountService(IAccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}
	 
	@Override
	public Account getAccountByEmail(String email) {
		return accountRepository.getAccountByEmail(email).orElse(null);
	}

	@Override
	public Account createCustomerAccount(Account account) {
		account.setFullname(StringUtils.capitalizeFirstLetterOfEachWord(account.getFullname()));
		account.setPhonenumber(account.getPhonenumber());
		account.setRole(Role.CUSTOMER);
		Account savedAccount = accountRepository.createAccount(account);
		return savedAccount;
	}

	@Override
	public Account getCustomerAccountByPhonenumberAndFullname(String phonenumber, String fullname) {
		return accountRepository.getCustomerAccountByPhonenumberAndFullName(phonenumber, fullname).orElse(null);
	}

	@Override
	public void deleteCustomerAccount(Account account) {
		accountRepository.deleteAccountById(account.getAccountId());
	}

}
