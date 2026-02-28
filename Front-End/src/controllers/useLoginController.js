import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice"; // Path sahi check karein
import { loginUser } from "../controllers/useAuth";

export const useLoginController = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      const result = await loginUser(credentials);
      console.log("API Response:", result); // Step 1: Check API Response

      if (result.success) {
        const { token, ...userData } = result.data;

        
        dispatch(
          setUser({
            user: userData,
            token: token,
          }),
        );

        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Controller Error:", err);
      setError("Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};
