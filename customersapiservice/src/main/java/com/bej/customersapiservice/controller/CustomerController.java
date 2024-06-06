package com.bej.customersapiservice.controller;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v2")
public class CustomerController {

    @Autowired
    private ICustomerService iCustomerService;


    @PostMapping("/register")
    public ResponseEntity registerCustomer(@RequestBody Customer customer) {
        try {
            return new ResponseEntity(iCustomerService.registerCustomer(customer), HttpStatus.CREATED);
        }

        catch (CustomerAlreadyExistException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
