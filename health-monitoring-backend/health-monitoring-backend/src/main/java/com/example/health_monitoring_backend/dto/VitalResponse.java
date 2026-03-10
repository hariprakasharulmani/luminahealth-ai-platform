package com.example.health_monitoring_backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VitalResponse {

    private Long id;
    private Double bloodPressure;
    private Double glucoseLevel;
    private Double heartRate;
    private Double bmi;
    //private String createdAt;
    private LocalDateTime createdAt;
    private String userEmail;

    private Double riskScore;
    private String riskLevel;

}