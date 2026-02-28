import React from 'react';
import { 
  Box, Typography, Paper, TextField, Button, 
  Divider, Stack, Chip, LinearProgress 
} from '@mui/material';
import { 
  AutoAwesome, Psychology, Biotech, 
  HealthAndSafety, TipsAndUpdates 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const AIDiagnosis = () => (
  <DashboardLayout role="Doctor" name="Dr. Muhammad Usman">
    {/* Page Header */}
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a' }}>
          AI Diagnostic Assistant
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
          Advanced symptom analysis powered by machine learning.
        </Typography>
      </Box>
      <Psychology sx={{ fontSize: 40, color: '#1976d2', opacity: 0.8 }} />
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* Input Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          flex: { xs: '1 1 100%', lg: '1 1 55%' }, 
          p: 4, borderRadius: 5, border: '1px solid #e2e8f0' 
        }}
      >
        <Typography variant="h6" fontWeight="700" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Biotech color="primary" /> Analyze Symptoms
        </Typography>
        
        <TextField 
          fullWidth 
          multiline 
          rows={6} 
          placeholder="Describe patient symptoms in detail (e.g., 'Patient reports sharp chest pain, shortness of breath, and fatigue for 2 days')..."
          sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }}
        />
        
        <Button 
          variant="contained" 
          fullWidth
          startIcon={<AutoAwesome />} 
          sx={{ 
            py: 1.5, borderRadius: 3, fontWeight: '700', textTransform: 'none',
            background: 'linear-gradient(45deg, #1e293b 30%, #334155 90%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Generate AI Insight
        </Button>
      </Paper>

      {/* Results Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          flex: { xs: '1 1 100%', lg: '1 1 38%' }, 
          p: 4, borderRadius: 5, border: '1px solid #e2e8f0',
          bgcolor: '#f8fafc'
        }}
      >
        <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>Diagnostic Insights</Typography>
        
        <Stack spacing={3}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" fontWeight="700">Viral Infection Probability</Typography>
              <Typography variant="body2" fontWeight="700" color="primary">78%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 5 }} />
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" fontWeight="800" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TipsAndUpdates sx={{ color: '#eab308', fontSize: 20 }} /> Suggested Tests
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['CBC Count', 'Chest X-Ray', 'CRP Test'].map((test) => (
                <Chip key={test} label={test} size="small" sx={{ fontWeight: '600', bgcolor: 'white', border: '1px solid #e2e8f0' }} />
              ))}
            </Box>
          </Box>

          <Box sx={{ p: 2, bgcolor: '#eff6ff', borderRadius: 3, border: '1px solid #bfdbfe' }}>
            <Typography variant="caption" fontWeight="800" color="#1e40af" sx={{ display: 'block', mb: 0.5 }}>
              AI RECOMMENDATION:
            </Typography>
            <Typography variant="body2" color="#1e3a8a">
              Symptoms align with upper respiratory infection. Monitor oxygen levels and advise 48h observation.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  </DashboardLayout>
);

export default AIDiagnosis;