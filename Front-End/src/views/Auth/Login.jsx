import React, { useState } from "react";
import {
  Box, TextField, Button, Typography, Stack, IconButton,
  InputAdornment, Container, useTheme, Avatar, Alert, Fade,
  MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import {
  Visibility, VisibilityOff, LockOutlined, EmailOutlined, PersonOutline
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../controllers/useAuth";
import bgimage from "../../assets/images/bg-image.jpg";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  
  // Role field add kar diya
  const [formData, setFormData] = useState({ email: "", password: "", role: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) {
      setStatus({ type: "error", message: "Please select your role first!" });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const result = await loginUser(formData);

      if (result.success) {
        const userData = result.data?.data;
        dispatch(setUser(userData));

        setStatus({ type: "success", message: "Login successful! Redirecting..." });

        if (result.data?.token) {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("role", userData.role); // Role ko storage mein rakhein navigation ke liye
        }

        // Role based navigation logic
        setTimeout(() => {
          const role = userData.role;
          if (role === "Admin") navigate("/admin-dashboard");
          else if (role === "Doctor") navigate("/doctor-dashboard");
          else if (role === "Receptionist") navigate("/receptionist-dashboard");
          else if (role === "Patient") navigate("/patient-dashboard");
          else navigate("/dashboard");
        }, 1500);
      } else {
        setLoading(false);
        setStatus({ type: "error", message: result.message || "Invalid credentials." });
      }
    } catch (error) {
      setLoading(false);
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  };

  const inputStyle = {
    "& .MuiFilledInput-root": {
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      transition: "0.3s",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
    "& .MuiFilledInput-underline:before, & .MuiFilledInput-underline:after": {
      display: "none",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${bgimage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Stack
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(20px)",
              borderRadius: 6,
              boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {/* Header */}
              <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 56, height: 56, mb: 1,
                    boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)"
                  }}
                >
                  <LockOutlined sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="h4" fontWeight={800} color="#1e293b">
                  Portal Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your clinic with AI assistance
                </Typography>
              </Stack>

              {/* Status Alert */}
              <Fade in={!!status.message}>
                <Box sx={{ mb: 2 }}>
                  {status.message && (
                    <Alert severity={status.type} variant="filled" sx={{ borderRadius: 2 }}>
                      {status.message}
                    </Alert>
                  )}
                </Box>
              </Fade>

              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  
                  {/* Role Selector */}
                  <FormControl fullWidth variant="filled" sx={inputStyle} required>
                    <InputLabel id="role-label">Select Your Role</InputLabel>
                    <Select
                      labelId="role-label"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disableUnderline
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Doctor">Doctor</MenuItem>
                      <MenuItem value="Receptionist">Receptionist</MenuItem>
                      <MenuItem value="Patient">Patient</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Email Field */}
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    variant="filled"
                    required
                    sx={inputStyle}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Password Field */}
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    variant="filled"
                    required
                    sx={inputStyle}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ cursor: 'pointer', fontWeight: 600, color: theme.palette.primary.main }}>
                      Forgot Password?
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      py: 1.8,
                      borderRadius: 3,
                      fontWeight: 800,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      boxShadow: `0 10px 20px ${theme.palette.primary.main}40`,
                    }}
                  >
                    {loading ? "Authenticating..." : "Sign In"}
                  </Button>

                </Stack>
              </form>
            </Box>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;