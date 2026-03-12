package com.example.health_monitoring_backend.service;

import com.example.health_monitoring_backend.dto.PredictionResponse;
import com.example.health_monitoring_backend.entity.Vital;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class MlService {

    private final WebClient webClient;

    public MlService(@Value("${ml.service.url:http://localhost:8000}") String mlServiceUrl) {
        // Prevent double /predict paths if the environment variable already includes it
        if (mlServiceUrl.endsWith("/predict")) {
            mlServiceUrl = mlServiceUrl.substring(0, mlServiceUrl.length() - 8);
        }
        if (mlServiceUrl.endsWith("/")) {
            mlServiceUrl = mlServiceUrl.substring(0, mlServiceUrl.length() - 1);
        }

        this.webClient = WebClient.builder()
                .baseUrl(mlServiceUrl)
                .build();
    }

    public PredictionResponse predictRisk(Vital vital) {

        return webClient.post()
                .uri("/predict")
                .bodyValue(vital)
                .retrieve()
                .bodyToMono(PredictionResponse.class)
                .block();
    }
}