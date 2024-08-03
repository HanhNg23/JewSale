package com.jewelry.account.core.usecase;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.constant.Role;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.common.usecase.UseCase;
import jakarta.annotation.PostConstruct;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UpdateAccountUseCase extends UseCase<UpdateAccountUseCase.InputValues, UpdateAccountUseCase.OutputValues> {
    private final IAccountRepository accountRepository;
    private final ModelMapper mapper;

    @Override
    public OutputValues execute(InputValues input) {
        Account account = accountRepository.getAccountById(input.accountId)
                .orElseThrow(() ->
                        new ErrorResponse(ErrorCodes.USER_DOES_NOT_EXIST.name(), ErrorCodes.USER_DOES_NOT_EXIST.getCode()));


        mapper.map(input, account);

        Account updated = accountRepository.updateAccount(account);
        return mapper.map(updated, OutputValues.class);
    }


    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class InputValues implements UseCase.InputValues {
        @JsonIgnore
        private Integer accountId;
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
        private String username;
        private Role role;
        private String fullname;
        private String phonenumber;
        private String email;
    }

}
