package com.jewelry.account.core.service;

import java.util.Optional;

import com.jewelry.account.core.domain.Account;

public interface IAccountService {
	 Account getAccountByEmail(String email);
	 
	 Account createCustomerAccount(Account account);
	 
	 void deleteCustomerAccount(Account account);
	 
	 Account getCustomerAccountByPhonenumberAndFullname(String phonenumber, String fullname);
	 
}
