package com.realestate.backend.mapper;

import com.realestate.backend.dto.PropertyRequestDTO;
import com.realestate.backend.dto.PropertyResponseDTO;
import com.realestate.backend.entity.Property;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {

    public Property toEntity(PropertyRequestDTO requestDTO){
        Property property = new Property();
        updateEntity(requestDTO, property);
        return property;
    }

    public void updateEntity(PropertyRequestDTO requestDTO,
                              Property property) {
        property.setTitle(requestDTO.getTitle());
        property.setDescription(requestDTO.getDescription());
        property.setPrice(requestDTO.getPrice());
        property.setLocation(requestDTO.getLocation());
        property.setCity(requestDTO.getCity());
        property.setPropertyType(requestDTO.getPropertyType());
        property.setBedrooms(requestDTO.getBedrooms());
        property.setBathrooms(requestDTO.getBathrooms());
        property.setAreaSqft(requestDTO.getAreaSqft());
    }
    public PropertyResponseDTO toDTO(Property property) {
        PropertyResponseDTO dto = new PropertyResponseDTO();

        dto.setId(property.getId());
        dto.setTitle(property.getTitle());
        dto.setDescription(property.getDescription());
        dto.setPrice(property.getPrice());
        dto.setLocation(property.getLocation());
        dto.setCity(property.getCity());
        dto.setPropertyType(property.getPropertyType());
        dto.setBedrooms(property.getBedrooms());
        dto.setBathrooms(property.getBathrooms());
        dto.setAreaSqft(property.getAreaSqft());
        dto.setStatus(property.getStatus());

        return dto;
    }

}
