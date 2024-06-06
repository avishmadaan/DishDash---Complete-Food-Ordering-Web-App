package com.example.RestaurantService.controller;


import com.example.RestaurantService.exception.NoRestaurantAvailableException;
import com.example.RestaurantService.exception.RestaurantAlreadyExistException;
import com.example.RestaurantService.model.Dish;
import com.example.RestaurantService.model.Restaurant;
import com.example.RestaurantService.service.IRestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v3")
@RestController
public class RestaurantController {

    @Autowired
    private IRestaurantService iRestaurantService;

    @PostMapping("/registerrestaurant")
    public ResponseEntity registerRestaurant(@RequestBody Restaurant restaurant) throws RestaurantAlreadyExistException {
        return new ResponseEntity(iRestaurantService.registerRestaurant(restaurant), HttpStatus.OK);
    }
    @GetMapping("/allrestaurants")
    public ResponseEntity findAllRestaurants() {
        return new ResponseEntity<>(iRestaurantService.fetchAllRestaurants(), HttpStatus.OK);
    }

    @GetMapping("/restaurants/{resCity}")
    public ResponseEntity findRestaurantsByCity(@PathVariable String resCity) throws NoRestaurantAvailableException {
       List<Restaurant> responseList = iRestaurantService.fetchRestaurantByCity(resCity);
       return new ResponseEntity(responseList, HttpStatus.OK);
    }

    @GetMapping("/menu/{resId}")
    public ResponseEntity findMenuByResId(@PathVariable String resId) throws NoRestaurantAvailableException {
        System.out.println("Inside Controller");
        List<Dish> responseList = iRestaurantService.fetchDishesByRestaurantId(resId);
        System.out.println("After Response");
        return new ResponseEntity(responseList, HttpStatus.OK);
    }

    @GetMapping("/restaurantsbyname/{resName}")
    public ResponseEntity findByResName(@PathVariable String resName) throws NoRestaurantAvailableException {
        System.out.println("Inside Controller");
        return new ResponseEntity<>(iRestaurantService.fetchRestaurantByName(resName), HttpStatus.OK);
    }

    @GetMapping("/restaurantbycuisine/{resCuisine}")
    public ResponseEntity findByCuisine(@PathVariable String resCuisine) throws NoRestaurantAvailableException {
        return new ResponseEntity(iRestaurantService.fetchRestaurantByCuisine(resCuisine), HttpStatus.OK);
    }

}
