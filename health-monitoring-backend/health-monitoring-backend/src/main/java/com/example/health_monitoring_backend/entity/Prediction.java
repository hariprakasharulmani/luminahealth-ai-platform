package com.example.health_monitoring_backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double riskScore;

    private String riskLevel;

    @OneToOne
    @JoinColumn(name = "vital_id")
    private Vital vital;
}