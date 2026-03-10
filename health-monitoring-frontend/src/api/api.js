import axios from "axios";

const api = axios.create({
  // Use Vercel inject environment variable if present, otherwise default to local Spring Boot
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login via event listener in App.jsx
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("unauthorized"));
      error.message = "Session expired. Please log in again.";
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      // Network Error or Server Down
      error.message = "Unable to reach the backend services. Please verify the server is running.";
    } else if (error.response && error.response.status >= 500) {
      // Internal Server or ML Service error
      error.message = "The server or ML service encountered an error. Please try again later.";
    }
    
    return Promise.reject(error);
  }
);

export default api;