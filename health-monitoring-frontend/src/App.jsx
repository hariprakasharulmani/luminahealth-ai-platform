import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Simple Auth Guard component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Simple Guest Guard (don't show login if already logged in)
const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {

  // Listen for the custom "unauthorized" event emitted by our Axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      // Let the ProtectedRoute handle redirect automatically by state update
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <Routes>
            {/* Redirect empty path to dashboard if logged in, else login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route 
              path="/login" 
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              } 
            />
            
            <Route 
              path="/register" 
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
        {/* Global Application Footer */}
        <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/50 bg-background/80 backdrop-blur-sm relative z-50">
          <p>
            Developed with <span className="text-rose-500">♥</span> by <span className="font-semibold text-foreground">Hari Prakash A</span>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;