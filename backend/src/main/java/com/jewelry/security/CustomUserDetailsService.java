package com.jewelry.security;

import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.common.exception.BaseDomainException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    IAccountRepository userRepository;

    public CustomUserDetailsService(IAccountRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        Account user = userRepository.getAccountByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email)
                );

        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Integer id) {
        Account user = userRepository.getAccountById(id).orElseThrow(
                () -> new BaseDomainException("User id not found")
        );

        return UserPrincipal.create(user);
    }
}