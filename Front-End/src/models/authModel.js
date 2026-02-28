import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


export const logoutApiCall = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      withCredentials: true // Cookies clear karne ke liye zaroori hai
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};