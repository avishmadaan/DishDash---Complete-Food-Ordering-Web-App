package com.bej.customersapiservice.controller;

import com.bej.customersapiservice.domain.Customer;
import com.bej.customersapiservice.exception.CustomerAlreadyExistException;
import com.bej.customersapiservice.exception.CustomerNotFoundException;
import com.bej.customersapiservice.services.ICustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2")
@CrossOrigin
public class CustomerController {

    @Autowired
    private ICustomerService iCustomerService;

    @PostMapping("/register")
    public ResponseEntity registerCustomer(@RequestBody Customer customer) {
        try {
            return new ResponseEntity(iCustomerService.registerCustomer(customer), HttpStatus.CREATED);
        } catch (CustomerAlreadyExistException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/customers/update")
    public ResponseEntity updateCustomer(@RequestBody Customer customer, HttpServletRequest request) {
        String customerId = (String) request.getAttribute("customerId");
        try {
            return new ResponseEntity(iCustomerService.updateCustomer(customer, customerId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/customers/addfavres")
    public ResponseEntity updateFavRest(@RequestBody String obj, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.addFavoriteRestaurant(obj,customerId),HttpStatus.OK);
    }

    @PutMapping("/customers/addfavdish")
    public ResponseEntity updateFavDish(@RequestBody Object obj, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.addFavoriteDish(obj,customerId),HttpStatus.OK);
    }

    @GetMapping("/customers/restaurant")
    public ResponseEntity fetchFavRest(HttpServletRequest request)
    {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.getAllFavRestaurant(customerId),HttpStatus.OK);
    }
    @GetMapping("/customers/dishes")
    public ResponseEntity fetchFavDish(HttpServletRequest request)
    {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.getAllFavDishes(customerId),HttpStatus.OK);
    }
    @GetMapping("/eachcustomer")
    public ResponseEntity<?> fetchByJwtToken(HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.getCustomerById(customerId),HttpStatus.OK);
    }
    @DeleteMapping("/customers/deletedish")
    public ResponseEntity<?> deleteFavDish(@RequestBody Object dish, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.deleteFavDish(customerId,dish),HttpStatus.OK);
    }
    @DeleteMapping("/customers/deletedrestaurant/{restName}")
    public ResponseEntity<?> deleteFavRest(@RequestBody Object restName, HttpServletRequest request) throws CustomerNotFoundException {
        String customerId = (String) request.getAttribute("customerId");
        return new ResponseEntity<>(iCustomerService.deleteFavRestaurant(customerId,restName),HttpStatus.OK);
    }

}
