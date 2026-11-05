package com.realestate.backend.service.impl;

import com.realestate.backend.dto.PropertyRequestDTO;
import com.realestate.backend.dto.PropertyResponseDTO;
import com.realestate.backend.exception.ResourceNotFoundException;

import java.util.List;

public interface PropertyService {
      // create property
    PropertyResponseDTO create(PropertyRequestDTO requestDTO);

      // get All properties
    List<PropertyResponseDTO> getAll();

     // get Single property
    PropertyResponseDTO getById(Long id) throws ResourceNotFoundException;

        // update
    PropertyResponseDTO updateProperty(
            Long id,
            PropertyRequestDTO requestDTO
    ) throws ResourceNotFoundException;

    // delete
     void delete(Long id) throws ResourceNotFoundException;

}
