import { useState } from "react";
import { Activity } from "lucide-react";
import api from "../api/api";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import RiskIndicator from "./RiskIndicator";

export default function VitalForm({ onVitalsSubmitted }) {
  const [formData, setFormData] = useState({
    bloodPressure: "",
    glucoseLevel: "",
    heartRate: "",
    bmi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictionResult(null);

    try {
      let bpPayload = formData.bloodPressure;
      if (bpPayload.includes('/')) {
        bpPayload = bpPayload.split('/')[0];
      }

      const payload = {
        bloodPressure: Number(bpPayload),
        glucoseLevel: Number(formData.glucoseLevel),
        heartRate: Number(formData.heartRate),
        bmi: Number(formData.bmi),
      };

      const response = await api.post("/vitals", payload);
      
      setPredictionResult({
        riskScore: response.data.riskScore,
        riskLevel: response.data.riskLevel,
      });

      if (onVitalsSubmitted) {
        onVitalsSubmitted();
      }

      setFormData({
        bloodPressure: "",
        glucoseLevel: "",
        heartRate: "",
        bmi: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to submit vitals");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Blood Pressure (Systolic or e.g. 120/80)</label>
          <Input
            name="bloodPressure"
            placeholder="120"
            value={formData.bloodPressure}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Glucose Level (mg/dL)</label>
          <Input
            name="glucoseLevel"
            type="number"
            placeholder="95"
            value={formData.glucoseLevel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Heart Rate (bpm)</label>
          <Input
            name="heartRate"
            type="number"
            placeholder="72"
            value={formData.heartRate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">BMI</label>
          <Input
            name="bmi"
            type="number"
            step="0.1"
            placeholder="23.5"
            value={formData.bmi}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && (
          <div className="col-span-full rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="col-span-full pt-2">
          <Button type="submit" className="w-full gap-2" disabled={loading}>
            <Activity className="h-4 w-4" />
            {loading ? "Analyzing..." : "Submit Vitals & Analyze Risk"}
          </Button>
        </div>
      </form>

      {predictionResult && (
        <div className="mt-8">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">Latest Analysis Result</h3>
          <RiskIndicator 
            riskLevel={predictionResult.riskLevel} 
            riskScore={predictionResult.riskScore} 
          />
        </div>
      )}
    </div>
  );
}
