package com.jewelry.account.presenter.rest.api;

import java.util.concurrent.CompletableFuture;

import com.jewelry.account.core.usecase.CreateAccountUseCase;
import com.jewelry.account.core.usecase.DeleteAccountUseCase;
import com.jewelry.account.core.usecase.SearchAccountUseCase;
import com.jewelry.account.core.usecase.UpdateAccountUseCase;
import com.jewelry.common.constant.SortOrder;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/accounts")
@Tag(name = "Account")
public interface AccountResource {


    @GetMapping
    CompletableFuture<SearchAccountUseCase.OutputValues> searchUser(
            @RequestParam(required = false) String username,
            @RequestParam(required = false) Integer accountId,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) SortOrder sortOrder);

    @PostMapping
    CompletableFuture<CreateAccountUseCase.OutputValues> createAccount(@RequestBody CreateAccountUseCase.InputValues request);

    @PutMapping("/{id}")
    CompletableFuture<UpdateAccountUseCase.OutputValues> updateAccount(@PathVariable Integer id, @RequestBody UpdateAccountUseCase.InputValues request);

    @DeleteMapping("/{id}")
    CompletableFuture<DeleteAccountUseCase.OutputValues> deleteAccount(@PathVariable Integer id);
}
