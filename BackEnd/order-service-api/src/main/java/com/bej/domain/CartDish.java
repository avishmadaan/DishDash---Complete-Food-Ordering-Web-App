package com.bej.domain;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CartDish {
    private String dishName;
    private String dishImage;
    private double dishPrice;
    private boolean veg;
    private String restaurantId;
    private int quantity;
}
