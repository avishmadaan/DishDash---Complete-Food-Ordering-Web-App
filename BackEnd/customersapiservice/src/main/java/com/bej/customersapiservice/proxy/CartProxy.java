package com.bej.customersapiservice.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name="cart-service-api")
public interface CartProxy {
    @PostMapping("/cart/add/{cartId}")
    public ResponseEntity<?> addCart(@PathVariable String cartId);
}
