import React, { useState, useEffect } from "react";
import { 
  Box, TextField, Button, Typography, Stack, Container, 
  useTheme, Avatar, Alert, Fade, InputAdornment, IconButton, LinearProgress 
} from "@mui/material";
import { PasswordOutlined, Visibility, VisibilityOff, LockOutlined, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../controllers/useAuth";
import authBg from "../../assets/images/bg-image.jpg"; 

const ResetPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false); // Naya eye toggle
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [strength, setStrength] = useState(0);

  const isMatch = formData.password !== "" && formData.password === formData.confirmPassword;

  const checkStrength = (pass) => {
    let score = 0;
    if (pass.length > 6) score += 25;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 25;
    if (/\d/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    setStrength(score);
  };

  const getStrengthColor = () => {
    if (strength <= 25) return theme.palette.error.main;
    if (strength <= 50) return "#facc15"; 
    if (strength <= 75) return "#3b82f6"; 
    return theme.palette.success.main;
  };

  const getStrengthText = () => {
    if (strength === 0) return "";
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Good";
    return "Strong Password";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") checkStrength(value);
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMatch) {
      return setStatus({ type: "error", message: "Passwords do not match!" });
    }
    if (strength < 50) {
      return setStatus({ type: "error", message: "Please use a stronger password." });
    }

    setLoading(true);
    const result = await resetPassword(token, formData.password);
    if (result.success) {
      setStatus({ type: "success", message: "Success! Redirecting to login..." });
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setStatus({ type: "error", message: result.message });
      setLoading(false);
    }
  };

  const inputStyle = {
    "& .MuiFilledInput-root": {
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      transition: "0.3s",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
      "&.Mui-focused": { backgroundColor: "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
    },
    "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": { display: "none" },
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundImage: `url(${authBg})`, backgroundSize: "cover", backgroundPosition: "center", p: 2
    }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ 
            p: { xs: 4, md: 6 }, bgcolor: "rgba(255, 255, 255, 0.85)", 
            backdropFilter: "blur(25px)", borderRadius: 8, textAlign: "center",
            boxShadow: "0 40px 100px rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.4)"
          }}>
            
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 60, height: 60, mx: "auto", mb: 2 }}>
              <LockOutlined sx={{ fontSize: 35 }} />
            </Avatar>

            <Typography variant="h4" fontWeight={900} color="#1e293b">Reset Password</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, mt: 1 }}>
              Secure your account with a strong password.
            </Typography>

            <Fade in={!!status.message}>
              <Box sx={{ mb: 3 }}>
                {status.message && <Alert severity={status.type} sx={{ borderRadius: 2 }}>{status.message}</Alert>}
              </Box>
            </Fade>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth label="New Password" name="password"
                  type={showPass ? "text" : "password"} variant="filled" required
                  sx={inputStyle} onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {formData.password && (
                  <Box sx={{ textAlign: 'left', px: 1 }}>
                    <Stack direction="row" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" fontWeight={700} color={getStrengthColor()}>
                        {getStrengthText()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">{strength}%</Typography>
                    </Stack>
                    <LinearProgress 
                      variant="determinate" 
                      value={strength} 
                      sx={{ 
                        height: 6, borderRadius: 3, bgcolor: "rgba(0,0,0,0.1)",
                        "& .MuiLinearProgress-bar": { bgcolor: getStrengthColor(), borderRadius: 3 }
                      }} 
                    />
                  </Box>
                )}

                <TextField
                  fullWidth label="Confirm Password" name="confirmPassword"
                  type={showConfirmPass ? "text" : "password"} variant="filled" required
                  sx={inputStyle} onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* Match Indicator (Green Check) */}
                        {isMatch && (
                          <CheckCircle sx={{ color: theme.palette.success.main, mr: 1, fontSize: 22 }} />
                        )}
                        <IconButton onClick={() => setShowConfirmPass(!showConfirmPass)}>
                          {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit" variant="contained" fullWidth size="large"
                  disabled={loading}
                  sx={{ py: 1.8, mt: 2, borderRadius: 3, fontWeight: 800, textTransform: "none" }}
                >
                  {loading ? "Updating..." : "Confirm New Password"}
                </Button>
              </Stack>
            </form>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResetPassword;