package com.example.health_monitoring_backend.service;

import com.example.health_monitoring_backend.dto.HealthSummaryResponse;
import com.example.health_monitoring_backend.entity.User;
import com.example.health_monitoring_backend.repository.PredictionRepository;
import com.example.health_monitoring_backend.repository.UserRepository;
import com.example.health_monitoring_backend.repository.VitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final VitalRepository vitalRepository;
    private final PredictionRepository predictionRepository;
    private final UserRepository userRepository;

    public HealthSummaryResponse getHealthSummary() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Object[] result = vitalRepository.getHealthSummary(user.getId());

        long highRisk = predictionRepository
                .countByRiskLevelAndVital_User_Id("HIGH", user.getId());

        return HealthSummaryResponse.builder()
                .averageBloodPressure((Double) result[0])
                .averageGlucose((Double) result[1])
                .averageHeartRate((Double) result[2])
                .averageBMI((Double) result[3])
                .highRiskCount(highRisk)
                .build();
    }
}