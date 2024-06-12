package com.bej.repository;

import com.bej.domain.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepo extends MongoRepository<Cart,String> {
}
