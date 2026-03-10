package com.example.health_monitoring_backend.service;

import com.example.health_monitoring_backend.dto.PredictionResponse;
import com.example.health_monitoring_backend.entity.Vital;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class MlService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("http://localhost:8000")
            .build();

    public PredictionResponse predictRisk(Vital vital) {

        return webClient.post()
                .uri("/predict")
                .bodyValue(vital)
                .retrieve()
                .bodyToMono(PredictionResponse.class)
                .block();
    }
}