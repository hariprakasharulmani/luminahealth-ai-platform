import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import VitalForm from "../components/VitalForm";
import VitalChart from "../components/VitalChart";
import VitalsTable from "../components/VitalsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import RiskTimeline from "../components/RiskTimeline";
import AlertsPanel from "../components/AlertsPanel";
import HealthInsights from "../components/HealthInsights";
import HealthScoreCard from "../components/HealthScoreCard";
import RiskGauge from "../components/RiskGauge";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState(null);
  const [vitalsHistory, setVitalsHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async (isPolling = false) => {
    if (!isPolling) {
      setLoading(true);
    }
    setError("");
    try {
      // 1. Fetch Summary Data for top cards
      const summaryRes = await api.get("/analytics/health-summary").catch(() => {
         return { data: { 
           averageBloodPressure: "0/0", 
           averageGlucose: 0, 
           averageHeartRate: 0, 
           averageBMI: 0,
           averageRiskScore: 0
         } };
      });
      
      // Map backend response keys to standard internal keys if needed
      const rawSummary = summaryRes.data;
      setSummaryData({
        avgBloodPressure: rawSummary.averageBloodPressure || "0/0",
        avgGlucoseLevel: rawSummary.averageGlucose || 0,
        avgHeartRate: rawSummary.averageHeartRate || 0,
        avgBmi: rawSummary.averageBMI || 0,
        avgRiskScore: rawSummary.averageRiskScore || 0,
      });

      // 2. Fetch Vitals history for chart and table
      const vitalsRes = await api.get("/vitals").catch(() => {
        return { data: [] };
      });
      
      const history = vitalsRes.data || [];
      const sortedHistory = [...history].sort((a,b) => new Date(b.date) - new Date(a.date));
      setVitalsHistory(sortedHistory);
    } catch (err) {
      console.error(err);
      if (!isPolling) {
        setError("Failed to load dashboard data. Please try again later.");
      }
    } finally {
      if (!isPolling) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchDashboardData(true);
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden relative">
      {/* Subtle Background Gradients */}
      <div className="pointer-events-none absolute top-0 -left-4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
      <div className="pointer-events-none absolute top-40 right-10 w-96 h-96 bg-emerald-400/10 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 space-y-8 p-4 md:px-8 md:py-8 container mx-auto max-w-7xl">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Monitor your vital signs and overall health risk indicators.
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-4 text-sm font-medium text-destructive border border-destructive/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex h-[400px] w-full items-center justify-center">
            <LoadingSpinner text="Loading analytics platform..." />
          </div>
        ) : (
          <>
            {/* Top Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-4">
                <DashboardCards summaryData={summaryData} latestVital={vitalsHistory[0]} />
              </div>
              <div className="lg:col-span-1">
                <HealthScoreCard latestRiskScore={vitalsHistory[0]?.riskScore} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
              {/* Intelligence Layer */}
              <div className="space-y-6 md:col-span-1 lg:col-span-1">
                <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg h-[240px] flex flex-col justify-center">
                  <CardHeader className="pb-0 text-center">
                    <CardTitle>Current AI Risk Level</CardTitle>
                    <CardDescription>Powered by Deep Learning</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center p-0">
                    <RiskGauge score={vitalsHistory[0]?.riskScore} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6 md:col-span-1 lg:col-span-1">
                <HealthInsights vitals={vitalsHistory} />
              </div>

              <div className="space-y-6 md:col-span-1 lg:col-span-1">
                <AlertsPanel vitals={vitalsHistory} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 pt-4">
              {/* Left Column (Chart + Table) */}
              <div className="space-y-6 md:col-span-1 lg:col-span-4">
                <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
                  <CardHeader>
                    <CardTitle>AI Risk Timeline</CardTitle>
                    <CardDescription>
                      Monitoring changes in your risk score over time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <RiskTimeline data={vitalsHistory} />
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
                  <CardHeader>
                    <CardTitle>Health Trends</CardTitle>
                    <CardDescription>
                      Your vital tracking over time.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <VitalChart data={vitalsHistory} />
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent History</CardTitle>
                    <CardDescription>
                      A detailed log of your past submissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VitalsTable data={vitalsHistory} />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column (Submission Form) */}
              <div className="space-y-6 md:col-span-1 lg:col-span-3">
                <Card className="sticky top-24 border-border/50 bg-card/60 backdrop-blur-xl shadow-lg shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Record New Vitals
                    </CardTitle>
                    <CardDescription>
                      Submit your latest readings for AI risk analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Pass fetchDashboardData to refresh charts/tables on success */}
                    <VitalForm onVitalsSubmitted={fetchDashboardData} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
        </main>
      </div>
    </div>
  );
}