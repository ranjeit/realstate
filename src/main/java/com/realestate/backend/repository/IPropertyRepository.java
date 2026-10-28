package com.realestate.backend.repository;

import com.realestate.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPropertyRepository extends JpaRepository<Property, Long> {
}
