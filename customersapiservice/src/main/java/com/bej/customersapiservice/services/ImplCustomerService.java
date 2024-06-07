package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.proxy.CustomerProxy;
import com.bej.customersapiservice.respository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImplCustomerService implements ICustomerService {

    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CustomerProxy customerProxy;
    @Override
    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExistException {
        if(customerRepo.findById(customer.getCustomerEmail()).isPresent()) {
            throw new CustomerAlreadyExistException();
        }
        if(customer.getCustomerFavDishes() ==  null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }
        if(customer.getCustomerFavRestaurants() == null) {
            customer.setCustomerFavRestaurants(new ArrayList<>());
        }

        customerProxy.registerCustomer(customer);
        return customerRepo.save(customer);
    }

    public Customer updateCustomer(Customer customer, String customerEmail) throws CustomerNotFoundException {
        if(customerRepo.findById(customerEmail).isPresent()) {
            return customerRepo.save(customer);
        }
        else {
            throw new CustomerNotFoundException();
        }
    }

    @Override
    public String addFavoriteRestaurant(String restName,String customerEmail) {
        System.out.println("Inside");
        System.out.println("Inside Imple :" + customerRepo.findById(customerEmail).get() +"Object :"+restName);
        if(customerRepo.findById(customerEmail).get().getCustomerFavRestaurants()==null)
        {
            System.out.println("Inside if");
            customerRepo.findById(customerEmail).get().setCustomerFavRestaurants(new ArrayList<>());
        }

        List<String> favList = new ArrayList<>();
        favList.add(restName);
        customerRepo.findById(customerEmail).get().setCustomerFavRestaurants(favList);
        return "Favourite Restaurant added";
    }

    @Override
    public String addFavoriteDish(Object obj, String customerEmail) throws CustomerNotFoundException {
        Customer customer= customerRepo.findById(customerEmail).orElseThrow(CustomerNotFoundException::new);

        if (customer.getCustomerFavDishes() == null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }

        List<Object> favDishList = customer.getCustomerFavDishes();
        favDishList.add(obj);
        customerRepo.save(customer);
        return "Dish added to your favorites...";

    }

    @Override
    public List<String> getAllFavRestaurant(String customerEmail) {

        Optional<Customer> restCustomer = customerRepo.findById(customerEmail);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavRestaurants();
    }

    @Override
    public List<Object> getAllFavDishes(String customerEmail) {
        Optional<Customer> restCustomer = customerRepo.findById(customerEmail);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavDishes();
    }

    @Override
    public boolean deleteFavRestaurant(String customerEmail,String restName) throws CustomerNotFoundException {
        boolean isDeleted=false;
        Optional<Customer> optionalCustomer=customerRepo.findById(customerEmail);

        if(optionalCustomer.isEmpty())
        {
            throw new CustomerNotFoundException();
        }
        Customer customer=optionalCustomer.get();
        List<String> favRestList= customer.getCustomerFavRestaurants();
        favRestList.remove(restName);
        customer.setCustomerFavRestaurants(favRestList);
        customerRepo.save(customer);
        isDeleted=true;

        return isDeleted;
    }
    public boolean deleteFavDish(String customerEmail,Object dish) throws CustomerNotFoundException {
        boolean isDeleted=false;
        Optional<Customer> optionalCustomer=customerRepo.findById(customerEmail);

        if(optionalCustomer.isEmpty())
        {
            throw new CustomerNotFoundException();
        }
        Customer customer=optionalCustomer.get();

        List<Object> favList = customer.getCustomerFavDishes();
        favList.remove(dish);
        customer.setCustomerFavDishes(favList);
        customerRepo.save(customer);
        isDeleted=true;

        return isDeleted;
    }

}
