package com.jewelry.warranty.core.domain;

import com.jewelry.common.constant.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {
    private int accountId;
    private String username;
    private String password;
    private Role role;
    private String fullname;
    private String phonenumber;
    private String email;

}