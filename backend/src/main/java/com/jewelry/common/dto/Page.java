package com.jewelry.common.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class Page<T> {
    private List<T> content;
    private Integer page;
    private Integer size;
    private Integer totalPages;
    private Long totalElements;
}
