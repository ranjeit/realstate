package com.realestate.backend.controller;

import com.realestate.backend.dto.PropertyRequestDTO;
import com.realestate.backend.dto.PropertyResponseDTO;
import com.realestate.backend.entity.Property;
import com.realestate.backend.exception.ResourceNotFoundException;
import com.realestate.backend.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/properties")
public class PropertyController {
    private final PropertyService service;

    public PropertyController(PropertyService service) {
        this.service = service;
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PropertyResponseDTO create(
            @Valid @RequestBody PropertyRequestDTO property) {
        return service.create(property);
    }
    @GetMapping
    public List<PropertyResponseDTO> getAll(){
        return service.getAll();
    }
    @GetMapping("/{id}")
    public PropertyResponseDTO getById(@PathVariable Long id) throws ResourceNotFoundException {
        return service.getById(id);
    }
    @PutMapping("/{id}")
    public PropertyResponseDTO update(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequestDTO property) throws ResourceNotFoundException {
        return service.updateProperty(id, property);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) throws ResourceNotFoundException {
        service.delete(id);
    }
}
