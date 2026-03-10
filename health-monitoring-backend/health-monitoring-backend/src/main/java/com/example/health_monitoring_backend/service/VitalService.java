package com.example.health_monitoring_backend.service;

import com.example.health_monitoring_backend.dto.VitalRequest;
import com.example.health_monitoring_backend.dto.VitalResponse;
import com.example.health_monitoring_backend.entity.Prediction;
import com.example.health_monitoring_backend.entity.User;
import com.example.health_monitoring_backend.entity.Vital;
import com.example.health_monitoring_backend.repository.PredictionRepository;
import com.example.health_monitoring_backend.repository.UserRepository;
import com.example.health_monitoring_backend.repository.VitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VitalService {

    private final VitalRepository vitalRepository;
    private final UserRepository userRepository;
    private final PredictionService predictionService;
    private final MlService mlService;
    private final PredictionRepository predictionRepository;

    public VitalResponse saveVital(VitalRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Vital vital = Vital.builder()
                .bloodPressure(request.getBloodPressure())
                .glucoseLevel(request.getGlucoseLevel())
                .heartRate(request.getHeartRate())
                .bmi(request.getBmi())
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        Vital savedVital = vitalRepository.save(vital);

        // Call ML service
        var prediction = mlService.predictRisk(savedVital);

        Prediction predictionEntity = Prediction.builder()
                .riskScore(prediction.getRiskScore())
                .riskLevel(prediction.getRiskLevel())
                .vital(savedVital)
                .build();

        predictionRepository.save(predictionEntity);

        System.out.println("Risk Score: " + prediction.getRiskScore());
        System.out.println("Risk Level: " + prediction.getRiskLevel());

        // Return DTO instead of entity
        return VitalResponse.builder()
                .id(savedVital.getId())
                .bloodPressure(savedVital.getBloodPressure())
                .glucoseLevel(savedVital.getGlucoseLevel())
                .heartRate(savedVital.getHeartRate())
                .bmi(savedVital.getBmi())
                .createdAt(savedVital.getCreatedAt())
                .riskScore(prediction.getRiskScore())
                .riskLevel(prediction.getRiskLevel())
                .userEmail(user.getEmail())
                .build();
    }

    public List<VitalResponse> getMyVitals() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return vitalRepository.findByUserId(user.getId())
                .stream()
                .map(v -> {

                    var prediction = mlService.predictRisk(v);

                    return VitalResponse.builder()
                            .id(v.getId())
                            .bloodPressure(v.getBloodPressure())
                            .glucoseLevel(v.getGlucoseLevel())
                            .heartRate(v.getHeartRate())
                            .bmi(v.getBmi())
                            .createdAt(v.getCreatedAt())
                            .riskScore(prediction.getRiskScore())
                            .riskLevel(prediction.getRiskLevel())
                            .userEmail(user.getEmail())
                            .build();
                })
                .toList();
    }
}