package com.realestate.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

    @Data public class PropertyResponseDTO {

        private Long id;
        private String title;
        private String description;
        private BigDecimal price;
        private String location;
        private String city;
        private String propertyType;
        private Integer bedrooms;
        private Integer bathrooms;
        private Double areaSqft;
        private String status;

}
