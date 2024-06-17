package com.bej.controller;

import com.bej.domain.Order;
import com.bej.domain.CartDish;
import com.bej.exceptions.CartNotFoundException;
import com.bej.exceptions.NoDishFoundException;
import com.bej.exceptions.RestaurantAlreadyExistException;
import com.bej.services.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("api/v4")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orderById/{orderId}")
    public ResponseEntity<?> fetchOrderById(@PathVariable String orderId)
    {
        return new ResponseEntity<>(orderService.getOrderByOrderId(orderId),HttpStatus.OK);
    }
    @GetMapping("/all/order")
    public  ResponseEntity<?> fetchAllOrder()
    {
        return new ResponseEntity<>(orderService.fetchAll(),HttpStatus.OK);
    }
    @PostMapping("/order/add")
    public ResponseEntity<?> addOrder(@RequestBody Order order)
    {
        try {
            log.info("Inside of try of order add controller");
            return new ResponseEntity<>(orderService.addOrder(order), HttpStatus.CREATED);
        }catch (Exception ex)
        {
            log.info("Inside catch of order add controller");
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
