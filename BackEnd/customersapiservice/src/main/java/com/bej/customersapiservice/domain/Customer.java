package com.bej.customersapiservice.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Customer {

    private String customerName;
    @Id
    private String customerEmail;
    private String customerPassword;
    private String customerProfilePic;
    private long customerPhone;
    private Address customerAddress;
    private List<Object> customerFavRestaurants;
    private List<Object> customerFavDishes;

}