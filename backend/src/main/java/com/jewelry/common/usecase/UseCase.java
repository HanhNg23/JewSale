package com.jewelry.common.usecase;

public abstract class UseCase<I extends UseCase.InputValues, O extends UseCase.OutputValues> {

	//useCase business logic 
	public abstract O execute(I input); 
	
	public interface InputValues{
		
	}
	public interface OutputValues{
		
	}
}
