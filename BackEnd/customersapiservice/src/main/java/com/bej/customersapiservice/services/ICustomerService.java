package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.exception.RestaurantAlreatExistException;

import java.util.List;

public interface ICustomerService {

    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException;
    public Customer updateCustomer(Customer customer, String customerId) throws CustomerAlreadyExistException, CustomerNotFoundException;
    public String addFavoriteRestaurant(String resId,String customerId) throws CustomerNotFoundException, RestaurantAlreatExistException;
    public String addFavoriteDish(String obj,String customerId) throws CustomerNotFoundException;
    public List<String> getAllFavRestaurant(String customerId);
    public List<String> getAllFavDishes(String customerId);
    public Customer getCustomerById(String customerId) throws CustomerNotFoundException;
    public boolean deleteFavRestaurant(String customerId,String restId) throws CustomerNotFoundException;
    public boolean deleteFavDish(String customerId,String dishName) throws CustomerNotFoundException;
}
