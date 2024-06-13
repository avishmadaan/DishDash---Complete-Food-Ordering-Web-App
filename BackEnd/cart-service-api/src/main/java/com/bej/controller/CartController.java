package com.bej.controller;

import com.bej.domain.Cart;
import com.bej.domain.Dish;
import com.bej.exceptions.CartNotFoundException;
import com.bej.exceptions.NoDishFoundException;
import com.bej.exceptions.RestaurantAlreadyExistException;
import com.bej.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/cartById/{cartId}")
    public ResponseEntity<?> fetchCartById(@PathVariable String cartId)
    {
        return new ResponseEntity<>(cartService.getCartById(cartId),HttpStatus.OK);
    }
    @PostMapping("/add/{cartId}")
    public ResponseEntity<?> addCart(@PathVariable String cartId)
    {
        Cart cart = new Cart(cartId,null,null);
        return new ResponseEntity<>(cartService.addCart(cart),HttpStatus.CREATED);
    }
    @PutMapping("/update/{restId}/{cartId}")
    public ResponseEntity<?> updateCart(@RequestBody Dish dish,@PathVariable String restId,@PathVariable String cartId) throws CartNotFoundException, RestaurantAlreadyExistException {
        return new ResponseEntity<>(cartService.updateCart(dish,restId,cartId),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<?> deleteCart(@PathVariable String cartId) throws CartNotFoundException {
        return new ResponseEntity<>(cartService.deleteCartById(cartId),HttpStatus.OK);
    }
    @DeleteMapping("/deleteDish")
    public ResponseEntity<?> deleteDishFromCart(@RequestParam("cartId") String cartId,@RequestParam("dishName") String dishName) throws NoDishFoundException, CartNotFoundException {
        return new ResponseEntity<>(cartService.deleteDishFromCart(cartId,dishName),HttpStatus.OK);
    }
}
