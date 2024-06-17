package com.bej.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String orderId;
    private String restaurantId;
    private String customerId;
    private String timeStamp;
    private double totalPrice;
    private double Discount;
    private double billingPrice;
    private int totalItems;
    private String customerAddress;
    private String paymentMethod;
    private List<CartDish> cartItems;
}
