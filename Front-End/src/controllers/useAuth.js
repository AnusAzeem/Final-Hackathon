import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
            setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        setLoading(false);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setLoading(false);
      alert("Login failed!");
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return { handleLogin, loading, logout };
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: 'transparent' };
  let score = 0;
  if (password.length > 6) score += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 25;
  if (/\d/.test(password)) score += 25;
  if (/[!@#$%^&*]/.test(password)) score += 25;

  if (score <= 25) return { score, label: 'Weak ⚠️', color: '#f44336' };
  if (score <= 50) return { score, label: 'Moderate 🟠', color: '#ff9800' };
  if (score <= 75) return { score, label: 'Strong 🟢', color: '#4caf50' };
  return { score, label: 'Very Strong 💪', color: '#00c853' };
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    
      
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Invalid email or password." 
    };
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return { success: true, message: response.data.message || "Reset link sent to your email!" };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to send reset link. Please try again." 
    };
  }
};
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/change-password`, { token, newPassword });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Server Error" 
    };
  }
};