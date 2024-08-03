package com.jewelry.account.core.usecase;

import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.common.usecase.UseCase;
import lombok.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteAccountUseCase extends UseCase<DeleteAccountUseCase.InputValues, DeleteAccountUseCase.OutputValues> {
    private final IAccountRepository accountRepository;

    @Override
    public OutputValues execute(InputValues input) {
        accountRepository.deleteAccountById(input.id);
        return new OutputValues("Xóa tài khoản thành công");
    }

    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class InputValues implements UseCase.InputValues {
        private Integer id;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OutputValues implements UseCase.OutputValues {
        private String message;
    }
}
