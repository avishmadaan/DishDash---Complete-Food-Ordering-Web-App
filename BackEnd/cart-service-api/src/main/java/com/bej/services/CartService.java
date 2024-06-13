package com.bej.services;

import com.bej.domain.Cart;
import com.bej.domain.Dish;
import com.bej.exceptions.CartNotFoundException;
import com.bej.exceptions.NoDishFoundException;

import java.util.Optional;

public interface CartService {
    public Cart addCart(Cart cart);
    public Optional<Cart> getCartById(String cartId);
    public Cart updateCart(Dish dish,String restId,String cartId) throws CartNotFoundException;
    public boolean deleteCartById(String cartId) throws CartNotFoundException;
    public boolean deleteDishFromCart(String cartId,String dishName) throws CartNotFoundException, NoDishFoundException;
}
