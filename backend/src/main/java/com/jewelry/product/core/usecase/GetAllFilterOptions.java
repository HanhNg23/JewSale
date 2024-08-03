package com.jewelry.product.core.usecase;

import java.util.Optional;
import java.util.Set;
import org.springframework.stereotype.Service;
import com.jewelry.common.constant.GroupName;
import com.jewelry.common.usecase.UseCase;
import com.jewelry.groupelement.core.service.GroupElementService;
import com.jewelry.metal.core.interfaces.IMetalService;
import lombok.AllArgsConstructor;
import lombok.Value;

@Service
@AllArgsConstructor
public class GetAllFilterOptions extends UseCase<GetAllFilterOptions.InputValues, GetAllFilterOptions.OutputValues> {
	
	private GroupElementService groupElementService;
	private IMetalService metalService;
	
	@Override
	public OutputValues execute(InputValues input) {
		return new OutputValues(
				getAllProductTypeOptions(), 
				getAllMetalGroupOptions(), 
				getAllMetalTypeOptions(), 
				getAllSaleStatusOptions(),
				getAllGemstoneType(),
				getAllGemstoneCertType());
	}
	
	@Value
	public static class InputValues implements UseCase.InputValues {
		
	}
	
	@Value
	public static class OutputValues implements UseCase.OutputValues {
		private Set<String> productType;
		private Set<String> metalGroup;
		private Set<String> metalType;
		private Set<String> saleStatus;
		private Set<String> gemstoneType;
		private Set<String> gemstoneCertType;
	}
	
	private Set<String> getAllProductTypeOptions() {
		Set<String> productType = Optional.of(groupElementService.getElementsByGroupName(GroupName.JEWELRY_TYPE.getDisplayName())).orElse(Set.of()); 
		return productType;
	}
	
	private Set<String> getAllMetalGroupOptions() {
		Set<String> metalGroup = Optional.of(groupElementService.getElementsByGroupName(GroupName.METAL_GROUP.getDisplayName())).orElse(Set.of()); 
		return metalGroup;
	}
	
	private Set<String> getAllMetalTypeOptions() {
		Set<String> metalType = Optional.of(metalService.getAllMetalTypeNames()).orElse(Set.of());
		return metalType;
	}
	
	private Set<String> getAllSaleStatusOptions() {
		Set<String> saleStatus = Optional.of(groupElementService.getElementsByGroupName(GroupName.SALE_STATUE.getDisplayName())).orElse(Set.of());
		return saleStatus;
	}
	
	private Set<String> getAllGemstoneType() {
		Set<String> gemstoneType = Optional.of(groupElementService.getElementsByGroupName(GroupName.GEMSTONE_TYPE.getDisplayName())).orElse(Set.of());
		return gemstoneType;
	}
	
	private Set<String> getAllGemstoneCertType() {
		Set<String> gemstoneCertType = Optional.of(groupElementService.getElementsByGroupName(GroupName.GEMSTONE_CERT_TYPE.getDisplayName())).orElse(Set.of());
		return gemstoneCertType;
	}
}
 