package com.example.health_monitoring_backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HealthSummaryResponse {

    private Double averageBloodPressure;
    private Double averageGlucose;
    private Double averageHeartRate;
    private Double averageBMI;
    private Long highRiskCount;

}