package com.example.UserAuthenticationService.controller;

import com.example.UserAuthenticationService.domain.Customer;
import com.example.UserAuthenticationService.exception.CustomerAlreadyExistException;
import com.example.UserAuthenticationService.exception.CustomerNotFoundException;
import com.example.UserAuthenticationService.exception.InvalidCredentialsExceptions;
import com.example.UserAuthenticationService.services.CustomerService;
import com.example.UserAuthenticationService.services.SecurityTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    ResponseEntity responseEntity=null;

    @PostMapping("/save")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer)
    {
        try{
            responseEntity=new ResponseEntity<>(customerService.saveCustomer(customer), HttpStatus.CREATED);
        }catch(Exception ex)
        {
            responseEntity=new ResponseEntity<>("Problem in controller",HttpStatus.CONFLICT);
        }
        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody Customer customer) throws InvalidCredentialsExceptions, CustomerNotFoundException {
        Map<String,String> map = null;

        Customer customerObj=customerService.findByCustomerEmailAndCustomerPassword(customer.getCustomerEmail(), customer.getCustomerPassword());
        if(customerObj==null)
        {
            throw new InvalidCredentialsExceptions();
        }
        String token=securityTokenGenerator.createToken(customer);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }

}
