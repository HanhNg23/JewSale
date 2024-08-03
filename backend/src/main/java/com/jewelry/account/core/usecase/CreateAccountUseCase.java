package com.jewelry.account.core.usecase;

import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.constant.Role;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.common.usecase.UseCase;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CreateAccountUseCase extends UseCase<CreateAccountUseCase.InputValues, CreateAccountUseCase.OutputValues> {
    private final IAccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OutputValues execute(InputValues input) {
        Optional<Account> account = accountRepository.getAccountByUserName(input.username);
        if (account.isPresent()) {
            throw new ErrorResponse(ErrorCodes.USER_DUPLICATE.name(), ErrorCodes.USER_DUPLICATE.getCode());
        }

        Account newAccount = Account.builder()
                .username(input.username)
                .password(passwordEncoder.encode(input.password))
                .role(input.role)
                .fullname(input.fullname)
                .phonenumber(input.phonenumber)
                .email(input.email)
                .build();
        Account savedAccount = accountRepository.createAccount(newAccount);
        return new OutputValues(savedAccount.getAccountId());

    }

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class InputValues implements UseCase.InputValues {
        private String username;
        private String password;
        private Role role;
        private String fullname;
        private String phonenumber;
        private String email;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OutputValues implements UseCase.OutputValues {
        private Integer accountId;
    }

}
