package com.jewelry.warranty.infrastructure.db.jpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "warranty_type")
public class WarrantyTypeEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warranty_type_id")
    private Integer warrantyTypeId;

    @Column(name = "warranty_name", nullable = false, length = 500)
    private String warrantyName;

    @Column(name = "specific_conditions", length = 500)
    private String specificConditions;

    @Column(name = "repair_information", length = 500)
    private String repairInformation;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "effective_date")
    private LocalDate effectiveDate;


    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "warranty_jewelry_types", joinColumns = @JoinColumn(name = "warranty_type_id"))
    @Column(name = "jewelry_type")
    private List<String> jewelryTypes;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "warranty_metal_groups", joinColumns = @JoinColumn(name = "warranty_type_id"))
    @Column(name = "metal_group")
    private List<String> metalGroups;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "warranty_gemstone_groups", joinColumns = @JoinColumn(name = "warranty_type_id"))
    @Column(name = "gemstone_group")
    private List<String> gemstoneGroups;
}
