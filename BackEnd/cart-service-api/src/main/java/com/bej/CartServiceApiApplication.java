package com.bej;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CartServiceApiApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(CartServiceApiApplication.class, args);
		} catch (Exception e) {
			e.printStackTrace();
			// Add any additional logging or handling here
		}
	}

}
