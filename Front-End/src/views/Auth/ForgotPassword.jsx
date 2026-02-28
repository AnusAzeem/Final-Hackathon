import React, { useState } from "react";
import { 
  Box, TextField, Button, Typography, Stack, Container, 
  useTheme, Avatar, Alert, Fade, IconButton 
} from "@mui/material";
import { LockResetOutlined, ArrowBackIosNew } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../controllers/useAuth";
import authBg from "../../assets/images/bg-image.jpg"; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const result = await forgotPassword(email);
    
    if (result.success) {
      setStatus({ type: "success", message: result.message });
      setTimeout(() => navigate("/login"), 4000);
    } else {
      setStatus({ type: "error", message: result.message });
    }
    setLoading(false);
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
      backgroundImage: `url(${authBg})`, 
      backgroundSize: "cover", backgroundPosition: "center", p: 2
    }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ 
            p: { xs: 4, md: 6 }, bgcolor: "rgba(255, 255, 255, 0.85)", 
            backdropFilter: "blur(25px)", borderRadius: 8, textAlign: "center",
            boxShadow: "0 40px 100px rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.4)",
            position: "relative"
          }}>
            
            <IconButton onClick={() => navigate("/login")} sx={{ position: "absolute", left: 20, top: 20 }}>
              <ArrowBackIosNew fontSize="small" />
            </IconButton>

            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 70, height: 70, mx: "auto", mb: 3 }}>
              <LockResetOutlined sx={{ fontSize: 40 }} />
            </Avatar>

            <Typography variant="h4" fontWeight={900} color="#1e293b" gutterBottom>
              Forgot Password?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Enter your registered email address and we'll send you a link to reset your password.
            </Typography>

            <Fade in={!!status.message}>
              <Box sx={{ mb: 3 }}>
                {status.message && <Alert severity={status.type} sx={{ borderRadius: 2 }}>{status.message}</Alert>}
              </Box>
            </Fade>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="filled"
                  required
                  sx={inputStyle}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.8, borderRadius: 3, fontWeight: 800, textTransform: "none" }}
                >
                  {loading ? "Sending Link..." : "Send Reset Link"}
                </Button>

                <Button 
                  onClick={() => navigate("/login")}
                  sx={{ fontWeight: 700, textTransform: "none", color: "text.secondary" }}
                >
                  Back to Login
                </Button>
              </Stack>
            </form>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPassword;