package com.bej.customersapiservice.respository;

import com.bej.customersapiservice.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepo extends MongoRepository<Customer, String> {
}
