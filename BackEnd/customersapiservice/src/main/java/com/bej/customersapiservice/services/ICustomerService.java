package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;

import java.util.List;

public interface ICustomerService {

//    Adding fav restaurant to user

//    Adding fav dishes of particular restaurant to user
//    Fetching fav restaurant list
//    Fetching fav dishes list


    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException;
    public Customer updateCustomer(Customer customer, String customerEmail) throws CustomerAlreadyExistException, CustomerNotFoundException;
    
    public String addFavoriteRestaurant(String restName,String customerEmail) throws CustomerNotFoundException;
    public String addFavoriteDish(Object obj,String customerEmail) throws CustomerNotFoundException;
    public List<Object> getAllFavRestaurant(String customerEmail);
    public List<Object> getAllFavDishes(String customerEmail);
    public boolean deleteFavRestaurant(String customerEmail,Object restName) throws CustomerNotFoundException;
    public boolean deleteFavDish(String customerEmail,Object dish) throws CustomerNotFoundException;
}
