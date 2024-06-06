package com.example.RestaurantService.service;

import com.example.RestaurantService.exception.NoRestaurantAvailableException;
import com.example.RestaurantService.exception.RestaurantAlreadyExistException;
import com.example.RestaurantService.model.Dish;
import com.example.RestaurantService.model.Restaurant;
import com.example.RestaurantService.repository.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImplRestaurantService implements IRestaurantService{

    @Autowired
    private RestaurantRepo restaurantRepo;

    public Restaurant registerRestaurant(Restaurant restaurant) throws RestaurantAlreadyExistException {
        if(restaurantRepo.findById(restaurant.getResId()).isPresent()) {
            throw new RestaurantAlreadyExistException("Restaurant Already Exist");
        }
        return restaurantRepo.save(restaurant);
    }

    public List<Restaurant> fetchAllRestaurants() {
        return restaurantRepo.findAll();
    }

    @Override
    public List<Restaurant> fetchRestaurantByCity(String resCity) throws NoRestaurantAvailableException {
        List<Restaurant> alllRestaurantList =  restaurantRepo.findAll();
        Boolean resExist = false;
        for(Restaurant restaurant:alllRestaurantList) {
            if(restaurant.getResCity().equals(resCity)) {
                resExist = true;
            }
        }
        if(resExist) {

        return restaurantRepo.findByResCity(resCity);
        }
        else {
            throw new NoRestaurantAvailableException("No Restaurant In This City");
        }
//        System.out.println("City Searched :" +resCity);
//        System.out.println("Fetched Result :" + restaurantRepo.findByResCity(resCity));
    }

    @Override
    public List<Dish> fetchDishesByRestaurantId(String resId) throws NoRestaurantAvailableException {

        List<Restaurant> alllRestaurantList =  restaurantRepo.findAll();
        Boolean resExist = false;
        for(Restaurant restaurant:alllRestaurantList) {
            if(restaurant.getResId().equals(resId)) {
                resExist = true;
            }
        }
        if(resExist) {
        return restaurantRepo.findById(resId).get().getResMenu();
        }
        else {
            throw new NoRestaurantAvailableException("No Restaurant with this Id");
        }
//
    }

    @Override
    public List<Restaurant> fetchRestaurantByName(String resName) throws NoRestaurantAvailableException {

        List<Restaurant> responseList = restaurantRepo.findAll();
        List<Restaurant> returnList= new ArrayList<>();
        Boolean resExist = false;
        for(Restaurant restaurant:responseList) {
            if(restaurant.getResName().contains(resName)) {
                returnList.add(restaurant);
                resExist = true;
            }
        }

        if(resExist) {
        return returnList;
        }
        else  {
            throw new NoRestaurantAvailableException("No Restaurant with this Name");
        }
    }

    @Override
    public List<Restaurant> fetchRestaurantByCuisine(String resCuisine) throws NoRestaurantAvailableException {
        List<Restaurant> responseList = restaurantRepo.findAll();
        List<Restaurant> returnList= new ArrayList<>();
        Boolean resExist = false;
        for(Restaurant restaurant:responseList) {
            if(restaurant.getResCuisines().contains(resCuisine)) {
                returnList.add(restaurant);
                resExist = true;
            }
        }
        if(resExist) {
            return returnList;
        }
        else  {
            throw new NoRestaurantAvailableException("No Such Restaurant with this Cuisine");
        }
    }




}
