package com.jewelry.warranty.core.usecase.input;

import com.jewelry.common.usecase.UseCase;
import lombok.Value;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Value
public class SearchWanrrantyTypeInput implements UseCase.InputValues {
    private String warrantyName;
    private List<String> jewelryTypes;
    private List<String> metalGroups;
    private List<String> gemstoneGroups;
    private Pageable pageable;
}
