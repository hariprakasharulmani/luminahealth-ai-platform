package com.example.health_monitoring_backend.controller;

import com.example.health_monitoring_backend.dto.HealthSummaryResponse;
import com.example.health_monitoring_backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/health-summary")
    public HealthSummaryResponse getHealthSummary() {
        return analyticsService.getHealthSummary();
    }
}