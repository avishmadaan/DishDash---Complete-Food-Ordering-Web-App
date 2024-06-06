package com.example.UserAuthenticationService.domain;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Customer {

    @Id
    @NotNull
    private String customerId;

    @Email
    @NotNull
    private String customerEmail;

    @NotNull
    private String customerName;

    @NotNull
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String customerPassword;

}
