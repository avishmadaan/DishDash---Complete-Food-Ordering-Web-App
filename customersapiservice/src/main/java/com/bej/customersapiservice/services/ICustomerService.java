package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;

public interface ICustomerService {

//    Adding fav restaurant to user
//    Adding fav dishes of particular restaurant to user
//    Fetching fav restaurant list
//    Fetching fav dishes list


    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException;
    public Customer updateCustomer(Customer customer, String customerEmail) throws CustomerAlreadyExistException, CustomerNotFoundException;
}
