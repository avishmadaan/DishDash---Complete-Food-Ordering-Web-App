package com.bej.customersapiservice.respository;

import com.bej.customersapiservice.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CustomerRepo extends MongoRepository<Customer, String> {

}