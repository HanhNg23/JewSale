package com.jewelry.account.presenter.rest.api;

import com.jewelry.account.core.usecase.CreateAccountUseCase;
import com.jewelry.account.core.usecase.DeleteAccountUseCase;
import com.jewelry.account.core.usecase.SearchAccountUseCase;
import com.jewelry.account.core.usecase.UpdateAccountUseCase;
import com.jewelry.common.constant.SortOrder;
import com.jewelry.common.usecase.UsecaseExecutor;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;

@Component
@CrossOrigin
@AllArgsConstructor
@Tag(name = "Account")
public class AccountController  implements AccountResource {
    private final UsecaseExecutor usecaseExecutor;
    private final CreateAccountUseCase createAccountUseCase;
    private final SearchAccountUseCase searchAccountUseCase;
    private final UpdateAccountUseCase updateAccountUseCase;
    private final DeleteAccountUseCase deleteAccountUseCase;

    @Override
    public CompletableFuture<SearchAccountUseCase.OutputValues> searchUser(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Integer accountId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) SortOrder sortOrder) {
        SearchAccountUseCase.InputValues request =  SearchAccountUseCase.InputValues.builder()
                .username(username)
                .accountId(accountId)
                .sortBy(sortBy)
                .sortOrder(sortOrder)
                .build();
        return usecaseExecutor.execute(searchAccountUseCase, request, (outputValues) -> outputValues);
    }

    @Override
    public CompletableFuture<CreateAccountUseCase.OutputValues> createAccount(CreateAccountUseCase.InputValues request) {
        return usecaseExecutor.execute(createAccountUseCase, request, (outputValues) -> outputValues);
    }

    @Override
    public CompletableFuture<UpdateAccountUseCase.OutputValues> updateAccount(Integer id, UpdateAccountUseCase.InputValues request) {
        request.setAccountId(id);
        return usecaseExecutor.execute(updateAccountUseCase, request, (outputValues) -> outputValues);
    }

    @Override
    public CompletableFuture<DeleteAccountUseCase.OutputValues> deleteAccount(Integer id) {
        return usecaseExecutor.execute(deleteAccountUseCase,new DeleteAccountUseCase.InputValues(id) , (outputValues) -> outputValues);
    }

}