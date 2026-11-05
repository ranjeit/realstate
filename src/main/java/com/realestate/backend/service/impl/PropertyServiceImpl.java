package com.realestate.backend.service.impl;

import com.realestate.backend.dto.PropertyRequestDTO;
import com.realestate.backend.dto.PropertyResponseDTO;
import com.realestate.backend.entity.Property;
import com.realestate.backend.exception.ResourceNotFoundException;
import com.realestate.backend.mapper.PropertyMapper;
import com.realestate.backend.repository.IPropertyRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {
    private final IPropertyRepository repository;
    private final PropertyMapper mapper;


    public PropertyServiceImpl(IPropertyRepository repository, PropertyMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }
// CREATE PROPERTY
    @Override
    public PropertyResponseDTO create(PropertyRequestDTO requestDTO) {
        Property property = mapper.toEntity(requestDTO);
        Property savedProperty = repository.save(property);
        return mapper.toDTO(savedProperty);
    }

    // GET ALL PROPERTIES
    @Override
    @Transactional()
    public List<PropertyResponseDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public PropertyResponseDTO getById(Long id) throws ResourceNotFoundException {
        Property property = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Property not found with id: " + id
                        ));
        return mapper.toDTO(property);
    }
     // UPDATE PROPERTY
    @Override
    public PropertyResponseDTO updateProperty(
            Long id,
            PropertyRequestDTO requestDTO) throws ResourceNotFoundException {
        Property existingProperty = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "property not found with id: " + id
                        ));
        mapper.updateEntity(requestDTO, existingProperty);
        Property updatedProperty = repository.save(existingProperty);

        return mapper.toDTO(updatedProperty);
    }

    //DELETE PROPERTY
    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Property property = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Property not found with id: " + id
                        ));
        repository.delete(property);
    }
    // create pr
//    public PropertyResponseDTO create(PropertyRequestDTO requestDTO){
//        Property property = mapper.toEntity(requestDTO);
//        property.setStatus("AVAILABLE");
//        return  mapper.toDTO(repository.save(property));
//    }
//     // get All records
//    public List<PropertyResponseDTO> getAll(){
//        return repository.findAll()
//                .stream()
//                .map(mapper::toDTO)
//                .toList();
//    }
//    // get single property
//    public PropertyResponseDTO getById(Long id) {
//        return mapper.toDTO(findProperty(id));
//
//    }
//
//    private Property findProperty(Long id) throws ResourceNotFoundException {
//        return repository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException(
//                        "Resource not found: "+ id
//                ));
//    }
//
//    // update property
//    public PropertyResponseDTO updateProperty(Long id, PropertyRequestDTO dto) throws ResourceNotFoundException {
//        Property property = findProperty(id);
//        mapper.updateEntity(dto,property);
//        return mapper.toDTO(repository.save(property));
//    }
//    public void delete(Long id) throws ResourceNotFoundException {
//        Property property = findProperty(id);
//        repository.delete(property);
//    }

}
