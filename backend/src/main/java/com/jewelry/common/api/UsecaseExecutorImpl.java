package com.jewelry.common.api;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import org.springframework.stereotype.Service;

import com.jewelry.common.usecase.UseCase;
import com.jewelry.common.usecase.UsecaseExecutor;
import com.jewelry.common.usecase.UseCase.InputValues;
import com.jewelry.common.usecase.UseCase.OutputValues;

@Service
public class UsecaseExecutorImpl implements UsecaseExecutor{

	@Override
	public <RX, I extends InputValues, O extends OutputValues> CompletableFuture<RX> execute(UseCase<I, O> useCase,
			I input, Function<O, RX> outputMapper) {
		return CompletableFuture.supplyAsync(() -> input).thenApplyAsync(useCase::execute).thenApplyAsync(outputMapper);
	}

}
