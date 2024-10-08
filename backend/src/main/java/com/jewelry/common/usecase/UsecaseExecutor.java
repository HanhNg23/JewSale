package com.jewelry.common.usecase;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

public interface UsecaseExecutor {
	<RX, I extends UseCase.InputValues, O extends UseCase.OutputValues> CompletableFuture<RX> execute(
			UseCase<I, O> useCase, I input, Function<O, RX> outputMapper);
}
