package com.jewelry.account.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jewelry.common.constant.Role;
import com.jewelry.token.Token;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Account {
    private int accountId;
    private String username;
    @JsonIgnore
    private String password;
    private Role role;
    private String fullname;
    private String phonenumber;
    private String email;
}
