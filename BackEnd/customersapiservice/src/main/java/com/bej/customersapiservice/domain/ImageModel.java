package com.bej.customersapiservice.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;


@Document
@AllArgsConstructor
@NoArgsConstructor
public class ImageModel {
    @Id
    private String imageId;
    private String name;
    private String type;
    private byte[] picByte;

    public ImageModel(String name, String type, byte[] picByte) {
        this.imageId = UUID.randomUUID().toString();
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }
}
