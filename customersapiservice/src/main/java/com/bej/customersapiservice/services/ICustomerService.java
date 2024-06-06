package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;

public interface ICustomerService {

//    Adding fav restaurant to user
//    Adding fav dishes of particular restaurant to user
//    Fetching fav restaurant list
//    Fetching fav dishes list


    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException;

}
