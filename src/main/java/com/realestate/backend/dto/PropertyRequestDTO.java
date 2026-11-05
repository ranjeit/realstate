package com.realestate.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
@Data
public class PropertyRequestDTO {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal price;

    @NotBlank
    private String location;

    @NotBlank
    private String city;

    @NotBlank
    private String propertyType;

    @Min(0)
    private Integer bedrooms;

    @Min(0)
    private Integer bathrooms;

    @Positive
    private Double areaSqft;

    @NotBlank
    private String status;

}
