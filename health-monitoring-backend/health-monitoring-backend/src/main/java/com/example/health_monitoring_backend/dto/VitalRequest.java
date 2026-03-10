package com.example.health_monitoring_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VitalRequest {

    private Double bloodPressure;
    private Double glucoseLevel;
    private Double heartRate;
    private Double bmi;
}