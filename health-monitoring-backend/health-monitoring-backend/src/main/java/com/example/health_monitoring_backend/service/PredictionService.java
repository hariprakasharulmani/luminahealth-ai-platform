package com.example.health_monitoring_backend.service;

import com.example.health_monitoring_backend.dto.VitalRequest;
import com.example.health_monitoring_backend.entity.Prediction;
import com.example.health_monitoring_backend.entity.Vital;
import com.example.health_monitoring_backend.repository.PredictionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PredictionService {

    private final PredictionRepository predictionRepository;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("http://localhost:8000")
            .build();

    public Prediction getPrediction(Vital vital) {

        Map response = webClient.post()
                .uri("/predict")
                .bodyValue(Map.of(
                        "bloodPressure", vital.getBloodPressure(),
                        "glucoseLevel", vital.getGlucoseLevel(),
                        "heartRate", vital.getHeartRate(),
                        "bmi", vital.getBmi()
                ))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        Double riskScore = ((Number) response.get("riskScore")).doubleValue();
        String riskLevel = (String) response.get("riskLevel");

        Prediction prediction = Prediction.builder()
                .riskScore(riskScore)
                .riskLevel(riskLevel)
                //.createdAt(LocalDateTime.now())
                .vital(vital)
                .build();

        return predictionRepository.save(prediction);
    }
}