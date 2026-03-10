package com.example.health_monitoring_backend.repository;

import com.example.health_monitoring_backend.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

    long countByRiskLevelAndVital_User_Id(String riskLevel, Long userId);

}