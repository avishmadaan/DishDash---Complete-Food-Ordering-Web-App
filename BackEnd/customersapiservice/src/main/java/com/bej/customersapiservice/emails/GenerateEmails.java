package com.bej.customersapiservice.emails;

import org.springframework.stereotype.Service;

@Service
public class GenerateEmails implements IGenerateEmails{
    @Override
    public String generateWelcomeEmail(String customerName, String customerEmail, String customerPassword) {
        String body = "Hi"+customerName+"\n"+"Here are your credentials \n UserEmail: "+customerEmail+"\n"+"Password: "
                +customerPassword+"\n"+"Let us know if you have any issues \n Thanks \n DishDash Team";

        return body;
    }
}
