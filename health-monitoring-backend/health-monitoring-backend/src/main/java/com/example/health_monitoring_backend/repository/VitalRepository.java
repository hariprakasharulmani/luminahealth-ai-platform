package com.example.health_monitoring_backend.repository;

import com.example.health_monitoring_backend.entity.Vital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface VitalRepository extends JpaRepository<Vital, Long> {

    List<Vital> findByUserId(Long userId);

    @Query("""
    SELECT 
    AVG(v.bloodPressure),
    AVG(v.glucoseLevel),
    AVG(v.heartRate),
    AVG(v.bmi)
    FROM Vital v
    WHERE v.user.id = :userId
    """)
    Object[] getHealthSummary(Long userId);

}