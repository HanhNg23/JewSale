package com.jewelry.warranty.presenter;

import com.jewelry.common.dto.Page;
import com.jewelry.warranty.core.domain.WarrantyProduct;
import com.jewelry.warranty.core.domain.WarrantyType;
import com.jewelry.warranty.core.usecase.input.CreateWarrantyHistoryInput;
import com.jewelry.warranty.core.usecase.input.CreateWarrantyTypeInput;
import com.jewelry.warranty.core.usecase.input.UpdateWarrantTypeInput;
import com.jewelry.warranty.core.usecase.output.CreateWarrantyHistoryOutput;
import com.jewelry.warranty.core.usecase.output.CreateWarrantyTypeOutput;
import com.jewelry.warranty.core.usecase.output.DeleteWarrantTypeOutput;
import com.jewelry.warranty.core.usecase.output.UpdateWarrantTypeOutput;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/warranties")
@Tag(name = "Warranty")
public interface WarrantyResource {



    @GetMapping("/products")
    CompletableFuture<Page<WarrantyProduct>> searchWarrantyProduct(
            @RequestParam(required = false) Integer warrantyProductId,
            @RequestParam(required = false) String customer,
            @RequestParam(required = false) String product,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false,  defaultValue = "10") Integer size);

    @PostMapping("/types")
    CompletableFuture<CreateWarrantyTypeOutput> createWarrantyType(@RequestBody CreateWarrantyTypeInput request);

    @GetMapping("/types")
    CompletableFuture<Page<WarrantyType>> searchWarrantyType(
            @RequestParam(required = false) String warrantyName,
            @RequestParam(required = false) List<String> jewelryTypes,
            @RequestParam(required = false) List<String> metalGroups,
            @RequestParam(required = false) List<String> gemstoneGroups,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false,  defaultValue = "10") Integer size);

    @DeleteMapping("/types/{id}")
    CompletableFuture<DeleteWarrantTypeOutput> deleteAccount(@PathVariable Integer id);

    @PutMapping("/types/{id}")
    CompletableFuture<UpdateWarrantTypeOutput> updateAccount(@PathVariable Integer id, @RequestBody UpdateWarrantTypeInput request);

}
