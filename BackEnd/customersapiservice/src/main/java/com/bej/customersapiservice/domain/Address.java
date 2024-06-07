package com.bej.customersapiservice.domain;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Address {

    private String address1;
    private String landMark;
    private String city;
    private long pincode;
    private String currentLocation;

}
