package com.example.health_monitoring_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PredictionResponse {

    private Double riskScore;
    private String riskLevel;

}