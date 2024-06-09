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
        if(customerRepo.findById(customer.getCustomerId()).isPresent()) {
            throw new CustomerAlreadyExistException();
        }
        if(customer.getCustomerFavDishes() ==  null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }
        if(customer.getCustomerFavRestaurants() == null) {
            customer.setCustomerFavRestaurants(new ArrayList<>());
        }
//
//        customerProxy.registerCustomer(customer);
//        return customerRepo.save(customer);
        Customer customer1=customerRepo.save(customer);
        if(!(customer1.getCustomerId().isEmpty()))
        {
            ResponseEntity<?> proxyResponse=customerProxy.registerCustomer(customer);
            System.out.println(proxyResponse.getBody());
        }
        return customer1;
    }

    public Customer updateCustomer(Customer customer, String customerId) throws CustomerNotFoundException {
        if(customerRepo.findById(customerId).isPresent()) {
            return customerRepo.save(customer);
        }
        else {
            throw new CustomerNotFoundException();
        }
    }

    @Override
    public String addFavoriteRestaurant(String resId,String customerId) throws CustomerNotFoundException {
        System.out.println("Inside");
        System.out.println("Inside Imple :" + customerRepo.findById(customerId).get() +"Object :"+resId);
        Customer optionalCustomer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        if(optionalCustomer.getCustomerFavRestaurants()==null)
        {
            optionalCustomer.setCustomerFavRestaurants(new ArrayList<>());
        }

        List<Object> favList = optionalCustomer.getCustomerFavRestaurants();
        favList.add(resId);
        customerRepo.save(optionalCustomer);
        return "Favourite Restaurant added";
    }

    @Override
    public String addFavoriteDish(Object obj, String customerId) throws CustomerNotFoundException {
        Customer customer= customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);

        if (customer.getCustomerFavDishes() == null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }

        List<Object> favDishList = customer.getCustomerFavDishes();
        favDishList.add(obj);
        customerRepo.save(customer);
        return "Dish added to your favorites...";

    }

    @Override
    public List<Object> getAllFavRestaurant(String customerId) {

        Optional<Customer> restCustomer = customerRepo.findById(customerId);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavRestaurants();
    }

    @Override
    public List<Object> getAllFavDishes(String customerId) {
        Optional<Customer> restCustomer = customerRepo.findById(customerId);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavDishes();
    }

    @Override
    public boolean deleteFavRestaurant(String customerId,Object resId) throws CustomerNotFoundException {
        boolean isDeleted=false;
        Optional<Customer> optionalCustomer=customerRepo.findById(customerId);

        if(optionalCustomer.isEmpty())
        {
            throw new CustomerNotFoundException();
        }
        Customer customer=optionalCustomer.get();
        List<Object> favRestList= customer.getCustomerFavRestaurants();
        favRestList.remove(resId);
        customer.setCustomerFavRestaurants(favRestList);
        customerRepo.save(customer);
        isDeleted=true;

        return isDeleted;
    }
    public boolean deleteFavDish(String customerId,Object dish) throws CustomerNotFoundException {
        boolean isDeleted=false;
        Optional<Customer> optionalCustomer=customerRepo.findById(customerId);

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
