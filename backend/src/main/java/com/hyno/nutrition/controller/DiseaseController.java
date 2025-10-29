package com.hyno.nutrition.controller;

import com.hyno.nutrition.model.Disease;
import com.hyno.nutrition.service.DiseaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diseases")
@CrossOrigin(origins = "*")
public class DiseaseController {

    @Autowired
    private DiseaseService diseaseService;

    @GetMapping
    public ResponseEntity<List<Disease>> getAllDiseases() {
        List<Disease> diseases = diseaseService.getAllDiseases();
        return ResponseEntity.ok(diseases);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disease> getDiseaseById(@PathVariable Long id) {
        Disease disease = diseaseService.getDiseaseById(id);
        return ResponseEntity.ok(disease);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Disease>> searchDiseases(@RequestParam String query) {
        List<Disease> diseases = diseaseService.searchDiseases(query);
        return ResponseEntity.ok(diseases);
    }

    @GetMapping("/by-name/{name}")
    public ResponseEntity<List<Disease>> getDiseasesByName(@PathVariable String name) {
        List<Disease> diseases = diseaseService.getDiseasesByName(name);
        return ResponseEntity.ok(diseases);
    }
}
