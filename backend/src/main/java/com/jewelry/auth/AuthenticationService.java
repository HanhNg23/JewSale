package com.jewelry.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jewelry.account.core.domain.Account;
import com.jewelry.account.core.repository.IAccountRepository;
import com.jewelry.account.infrastructure.db.jpa.entity.AccountEntity;
import com.jewelry.common.constant.Role;
import com.jewelry.common.constant.TokenType;
import com.jewelry.common.exception.BaseDomainException;
import com.jewelry.security.JwtService;
import com.jewelry.security.UserPrincipal;
import com.jewelry.token.Token;
import com.jewelry.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IAccountRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ModelMapper mapper = new ModelMapper();;

    public void logout( HttpServletRequest request,
                        HttpServletResponse response) throws IOException  {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        Token token = tokenRepository.findByToken(refreshToken).orElseThrow(()-> new BaseDomainException("Token không tồn tại"));
        if(token.expired || token.revoked){
            throw  new BaseDomainException("Token hết hạn");
        }
        if (userEmail != null) {
            var user = this.repository.getAccountByEmail(userEmail)
                    .orElseThrow(()->new BaseDomainException("Email không tồn tại"));
            UserPrincipal userPrincipal = UserPrincipal.create(user);
            if (jwtService.isTokenValid(refreshToken, userPrincipal)) {

                revokeAllUserTokens(user);
            }

            new ObjectMapper().writeValue(response.getOutputStream(), "Đăng xuất thành công");

        }
    }

    public void register(RegisterRequest request) {
        var newAccount =
                Account.builder()
                        .username(request.getUsername())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .role(Role.CUSTOMER)
                        .fullname(request.getFullname())
                        .phonenumber(request.getPhonenumber())
                        .email(request.getEmail())
                        .build();
        repository.createAccount(newAccount);

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.getAccountByEmail(request.getEmail())
                .orElseThrow();
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        var accessToken = jwtService.generateToken(userPrincipal);
        var refreshToken = jwtService.generateRefreshToken(userPrincipal);
//        revokeAllUserTokens(user);
        saveUserToken(user, refreshToken);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .userName(userPrincipal.getUser().getFullname())
                .userId(userPrincipal.getId())
                .role(userPrincipal.getUser().getRole())
                .build();
    }

    private void saveUserToken(Account user, String jwtToken) {
        var token = Token.builder()
                .user(mapper.map(user, AccountEntity.class))
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Account user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getAccountId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        Token token = tokenRepository.findByToken(refreshToken).orElseThrow(()-> new BaseDomainException("Token không tồn tại"));
        if(token.expired || token.revoked){
            throw  new BaseDomainException("Token hết hạn");
        }
        if (userEmail != null) {
            var user = this.repository.getAccountByEmail(userEmail)
                    .orElseThrow();
            var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getAccountId());
            UserPrincipal userPrincipal = UserPrincipal.create(user);
            if (jwtService.isTokenValid(refreshToken, userPrincipal)) {
                var accessToken = jwtService.generateToken(userPrincipal);

                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }
}
