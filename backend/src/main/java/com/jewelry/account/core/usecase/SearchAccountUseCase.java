package com.jewelry.account.core.usecase;

import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.common.constant.ErrorCodes;
import com.jewelry.common.constant.Role;
import com.jewelry.common.constant.SortOrder;
import com.jewelry.common.exception.ErrorResponse;
import com.jewelry.common.usecase.UseCase;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchAccountUseCase extends UseCase<SearchAccountUseCase.InputValues, SearchAccountUseCase.OutputValues> {
    private final IAccountRepository accountRepository;
    private final ModelMapper mapper;
    @Override
    public OutputValues execute(InputValues request) {

        if (request.accountId != null) {
            return accountRepository.getAccountById(request.accountId)
                    .map(account -> mapper.map(account, SearchAccountResponse.class))
                    .orElseThrow(()->
                            new ErrorResponse(ErrorCodes.USER_DOES_NOT_EXIST.name(), ErrorCodes.USER_DOES_NOT_EXIST.getCode()));
        }
        List<Account> accounts = accountRepository.getAccountsByUsername(request.username);



        if ((request.sortBy != null && !request.sortBy.isEmpty())
                || (request.sortOrder != null)) {

            if (SortOrder.ASC.equals(request.sortOrder)) {
                accounts.sort(Comparator.comparing(account -> getFieldToSort(request.sortBy, account)));
            } else if (SortOrder.DESC.equals(request.sortOrder)) {
                accounts.sort(Comparator.comparing(account -> getFieldToSort(request.sortBy, (Account) account)).reversed());
            }
            return mapListToResponse(accounts);
        }


        return mapListToResponse(accounts);
    }

    public static abstract class OutputValues implements UseCase.OutputValues {}


    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class InputValues implements UseCase.InputValues {
        private String username;
        private Integer accountId;
        private String sortBy;
        private SortOrder sortOrder;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SearchAccountResponse extends SearchAccountUseCase.OutputValues {
        private int accountId;
        private String username;
        private Role role;
        private String fullname;
        private String phonenumber;
        private String email;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SearchListAccountReponse extends SearchAccountUseCase.OutputValues {
        private List<SearchAccountResponse> accounts;
    }





    private OutputValues mapListToResponse(List<Account> accounts) {
        List<SearchAccountResponse> responseList = accounts.stream()
                .map(account -> mapper.map(account, SearchAccountResponse.class))
                .collect(Collectors.toList());
        return new SearchListAccountReponse(responseList);
    }

    private Comparable getFieldToSort(String sortBy, Account account) {
        if (sortBy == null || sortBy.isEmpty()) {
            return account.getAccountId();
        }
        switch (sortBy) {
            case "accountId":
                return account.getAccountId();
            case "username":
                return account.getUsername();
            case "role":
                return account.getRole();
            case "fullname":
                return account.getFullname();
            case "phonenumber":
                return account.getPhonenumber();
            case "email":
                return account.getEmail();
            default:
                // Mặc định trả về accountId nếu trường không hợp lệ
                return account.getAccountId();
        }
    }
}
