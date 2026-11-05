package com.realestate.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name = "tb_proprty")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String title;


    @Column(nullable = false)
     private String description;

    @Positive
    private BigDecimal price;


    @Column(nullable = false)
    private String location;


    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String propertyType;

    @Min(0)
    private Integer bedrooms;

    @Min(0)
    private Integer bathrooms;

    @Positive
    private Double areaSqft;

    @Column(nullable = false)
    private String status ="AVAILABLE";
}
