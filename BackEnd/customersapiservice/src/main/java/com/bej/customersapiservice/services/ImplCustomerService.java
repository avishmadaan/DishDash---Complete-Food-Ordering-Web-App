package com.bej.customersapiservice.services;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.exception.RestaurantAlreatExistException;
import com.bej.customersapiservice.proxy.CartProxy;
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
    @Autowired
    private CartProxy cartProxy;
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
//        customerProxy.registerCustomer(customer);
//        return customerRepo.save(customer);
        Customer customer1=customerRepo.save(customer);
        if(!(customer1.getCustomerId().isEmpty()))
        {
            ResponseEntity<?> proxyResponse=customerProxy.registerCustomer(customer);
            ResponseEntity<?> cartProxyRes=cartProxy.addCart(customer.getCustomerCartId());
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
    public String addFavoriteRestaurant(String resId,String customerId) throws CustomerNotFoundException, RestaurantAlreatExistException {
        System.out.println("Inside");
        System.out.println("Inside Imple :" + customerRepo.findById(customerId).get() +"Object :"+resId);
        Customer optionalCustomer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
        if(optionalCustomer.getCustomerFavRestaurants()==null)
        {
            optionalCustomer.setCustomerFavRestaurants(new ArrayList<>());
        }
        List<String> favList = optionalCustomer.getCustomerFavRestaurants();
        boolean isPresent=favList.stream().anyMatch(i->i.equals(resId));
        System.out.println(isPresent);
        if(isPresent)
        {
            throw new RestaurantAlreatExistException();
        }
        favList.add(resId);
        customerRepo.save(optionalCustomer);
        return "Favourite Restaurant added";
    }

    @Override
    public String addFavoriteDish(String restId, String customerId) throws CustomerNotFoundException {
        Customer customer= customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);

        if (customer.getCustomerFavDishes() == null) {
            customer.setCustomerFavDishes(new ArrayList<>());
        }

        List<String> favDishList = customer.getCustomerFavDishes();
        favDishList.add(restId);
        customerRepo.save(customer);
        return "Dish added to your favorites...";

    }

    @Override
    public List<String> getAllFavRestaurant(String customerId) {

        Optional<Customer> restCustomer = customerRepo.findById(customerId);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavRestaurants();
    }

    @Override
    public List<String> getAllFavDishes(String customerId) {
        Optional<Customer> restCustomer = customerRepo.findById(customerId);
        System.out.println(restCustomer.get());
        return restCustomer.get().getCustomerFavDishes();
    }

    @Override
    public Customer getCustomerById(String customerId) throws CustomerNotFoundException {
        return customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
    }

    @Override
    public boolean deleteFavRestaurant(String customerId,String resId) throws CustomerNotFoundException {
       boolean isDeleted=false;
       Customer customer=customerRepo.findById(customerId).orElseThrow(CustomerNotFoundException::new);
       List<String> favRestList = customer.getCustomerFavRestaurants();
       System.out.println("Before deletion :"+favRestList);
       for(int i=0;i<favRestList.size();i++)
       {
           if(favRestList.get(i).equals(resId)){
               favRestList.remove(resId);
               isDeleted=true;
           }

       }
       System.out.println("After deletion :"+favRestList);
       customer.setCustomerFavRestaurants(favRestList);
       customerRepo.save(customer);
       return isDeleted;
    }
    public boolean deleteFavDish(String customerId,String dish) throws CustomerNotFoundException {
        boolean isDeleted=false;
        Optional<Customer> optionalCustomer=customerRepo.findById(customerId);

        if(optionalCustomer.isEmpty())
        {
            throw new CustomerNotFoundException();
        }
        Customer customer=optionalCustomer.get();

        List<String> favList = customer.getCustomerFavDishes();
        favList.remove(dish);
        customer.setCustomerFavDishes(favList);
        customerRepo.save(customer);
        isDeleted=true;

        return isDeleted;
    }

}
