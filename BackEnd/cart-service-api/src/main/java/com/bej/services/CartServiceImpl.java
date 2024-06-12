package com.bej.services;

import com.bej.domain.Cart;
import com.bej.domain.Dish;
import com.bej.exceptions.CartNotFoundException;
import com.bej.exceptions.NoDishFoundException;
import com.bej.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{
    @Autowired
    private CartRepo cartRepo;
    @Override
    public Cart addCart(Cart cart) {
        return cartRepo.save(cart);
    }

    @Override
    public Optional<Cart> getCartById(String cartId) {
        return cartRepo.findById(cartId);
    }

    @Override
    public Cart updateCart(Dish dish,String cartId) throws CartNotFoundException {
        Cart cart=cartRepo.findById(cartId).orElseThrow(()->new CartNotFoundException("No Cart Found"));
            if(cart.getDishList()==null)
            {
                cart.setDishList(new ArrayList<>());
            }
            cart.getDishList().add(dish);
            return cartRepo.save(cart);
    }

    @Override
    public boolean deleteCartById(String cartId) throws CartNotFoundException {
        boolean isDeleted=false;
        Cart cart = cartRepo.findById(cartId).orElseThrow(()->new CartNotFoundException("No Cart found"));
        cartRepo.delete(cart);
        isDeleted=true;
        return isDeleted;
    }

    @Override
    public boolean deleteDishFromCart(String cartId,String dishName) throws CartNotFoundException, NoDishFoundException {
        Cart cart = cartRepo.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart not found"));

        List<Dish> dishList = cart.getDishList();

        boolean dishPresent = dishList.stream().anyMatch(i -> i.getDishName().equals(dishName));

        if (!dishPresent) {
            throw new NoDishFoundException("Dish isn't in cart");
        }

        dishList.removeIf(i -> i.getDishName().equals(dishName));

        cartRepo.save(cart);

        return true;
    }
}
