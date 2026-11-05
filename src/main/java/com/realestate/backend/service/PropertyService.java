package com.realestate.backend.service;

import com.realestate.backend.dto.PropertyRequestDTO;
import com.realestate.backend.dto.PropertyResponseDTO;
import com.realestate.backend.entity.Property;
import com.realestate.backend.exception.ResourceNotFoundException;
import com.realestate.backend.mapper.PropertyMapper;
import com.realestate.backend.repository.IPropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {
    private final IPropertyRepository repository;
    private final PropertyMapper mapper;


    public PropertyService(IPropertyRepository repository, PropertyMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }
    // create method
    public PropertyResponseDTO create(PropertyRequestDTO requestDTO){
        Property property = mapper.toEntity(requestDTO);
        property.setStatus("AVAILABLE");
        return  mapper.toDTO(repository.save(property));
    }
     // get All records
    public List<PropertyResponseDTO> getAll(){
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }
    // get single property
    public PropertyResponseDTO getById(Long id) throws ResourceNotFoundException {
        return mapper.toDTO(findProperty(id));

    }

    private Property findProperty(Long id) throws ResourceNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Resource not found: "+ id
                ));
    }

    // update property
    public PropertyResponseDTO updateProperty(Long id, PropertyRequestDTO dto) throws ResourceNotFoundException {
        Property property = findProperty(id);
        mapper.updateEntity(dto,property);
        return mapper.toDTO(repository.save(property));
    }
    public void delete(Long id) throws ResourceNotFoundException {
        Property property = findProperty(id);
        repository.delete(property);
    }

}
