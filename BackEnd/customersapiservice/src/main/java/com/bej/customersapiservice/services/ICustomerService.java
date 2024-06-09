package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;

import java.util.List;

public interface ICustomerService {

    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException;
    public Customer updateCustomer(Customer customer, String customerId) throws CustomerAlreadyExistException, CustomerNotFoundException;
    public String addFavoriteRestaurant(String resId,String customerId) throws CustomerNotFoundException;
    public String addFavoriteDish(Object obj,String customerId) throws CustomerNotFoundException;
    public List<Object> getAllFavRestaurant(String customerId);
    public List<Object> getAllFavDishes(String customerId);
    public boolean deleteFavRestaurant(String customerId,Object restName) throws CustomerNotFoundException;
    public boolean deleteFavDish(String customerId,Object dish) throws CustomerNotFoundException;
}
