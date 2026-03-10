package com.example.health_monitoring_backend.controller;

import com.example.health_monitoring_backend.dto.VitalRequest;
import com.example.health_monitoring_backend.dto.VitalResponse;
import com.example.health_monitoring_backend.service.VitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vitals")
@RequiredArgsConstructor
public class VitalController {

    private final VitalService vitalService;

    @PostMapping
    public ResponseEntity<VitalResponse> saveVital(@RequestBody VitalRequest request) {
        return ResponseEntity.ok(vitalService.saveVital(request));
    }

    @GetMapping
    public ResponseEntity<List<VitalResponse>> getMyVitals() {
        return ResponseEntity.ok(vitalService.getMyVitals());
    }
}