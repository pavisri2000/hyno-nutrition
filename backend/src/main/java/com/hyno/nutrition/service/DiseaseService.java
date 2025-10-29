package com.hyno.nutrition.service;

import com.hyno.nutrition.exception.ResourceNotFoundException;
import com.hyno.nutrition.model.Disease;
import com.hyno.nutrition.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiseaseService {

    @Autowired
    private DiseaseRepository diseaseRepository;

    public List<Disease> getAllDiseases() {
        return diseaseRepository.findAll();
    }

    public Disease getDiseaseById(Long id) {
        return diseaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Disease not found"));
    }

    public List<Disease> searchDiseases(String query) {
        return diseaseRepository.searchDiseases(query);
    }

    public List<Disease> getDiseasesByName(String name) {
        return diseaseRepository.findByNameContainingIgnoreCase(name);
    }
}
