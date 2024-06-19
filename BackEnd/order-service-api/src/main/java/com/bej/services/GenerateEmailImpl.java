package com.bej.services;

import com.bej.domain.Order;
import com.bej.exceptions.OrderNotFoundException;
import com.bej.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GenerateEmailImpl implements GenerateEmail {
    @Autowired
    OrderRepo orderRepo;
    @Override
    public String orderCompletionEmail(String orderId, String customerName) throws OrderNotFoundException {
        Order order = orderRepo.findById(orderId).orElseThrow(OrderNotFoundException::new);
        StringBuilder emailContent = new StringBuilder();
        emailContent.append("Dear ").append(customerName).append(",\n\n")
                .append("Thank you for ordering with us. Your order has been successfully placed and is being processed. Below are the details of your order:\n\n")
                .append("Order ID: ").append(orderId).append("\n")
                .append("Order Details:\n").append(order.toString()).append("\n\n")
                .append("Total Amount: $").append(order.getBillingPrice()).append("\n\n")
                .append("If you have any questions or need further assistance, please feel free to contact our customer support team.\n\n")
                .append("Thank you for choosing our service!\n\n")
                .append("Best regards,\nYour Company Name");

        return emailContent.toString();
    }
}
