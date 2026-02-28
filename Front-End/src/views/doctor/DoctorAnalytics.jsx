import React from 'react';
import { Box, Typography, Paper, Divider, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { 
  TrendingUp, People,  
  Timeline, Insights, 
  AssignmentTurnedIn
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const DoctorAnalytics = () => {
  // Hardcoded Analytics Data
  const weeklyData = [12, 18, 15, 22, 10, 8, 5];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <DashboardLayout role="Doctor" name="Dr. Muhammad Usman">
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
            Performance Analytics
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            Track your clinical reach and patient engagement metrics.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f0fdf4', px: 2, py: 1, borderRadius: 3 }}>
          <TrendingUp sx={{ color: '#16a34a' }} />
          <Typography variant="body2" fontWeight="700" color="#16a34a">+12% growth this month</Typography>
        </Box>
      </Box>

      {/* Stats Cards Row (Flexbox) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {[
          { label: 'Total Patients', value: '1,240', icon: <People />, color: '#1976d2', bg: '#e0f2fe' },
          { label: 'This Month', value: '150', icon: <AssignmentTurnedIn />, color: '#7c3aed', bg: '#f5f3ff' },
          { label: 'Avg. Rating', value: '4.9', icon: <Insights />, color: '#ea580c', bg: '#fff7ed' }
        ].map((stat, index) => (
          <Paper 
            key={index}
            elevation={0}
            sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 30%' }, 
              p: 3, borderRadius: 5, border: '1px solid #e2e8f0',
              display: 'flex', alignItems: 'center', gap: 2.5,
              transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' }
            }}
          >
            <Box sx={{ p: 2, borderRadius: 4, bgcolor: stat.bg, color: stat.color, display: 'flex' }}>
              {stat.icon}
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="900" color="#1e293b">{stat.value}</Typography>
              <Typography variant="body2" fontWeight="600" color="#64748b">{stat.label}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Charts Section (Flexbox) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            flex: { xs: '1 1 100%', lg: '1 1 60%' }, 
            p: 4, borderRadius: 5, border: '1px solid #e2e8f0' 
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h6" fontWeight="800" color="#1e293b">Patient Load</Typography>
              <Typography variant="caption" color="#64748b">Weekly statistics of treated patients</Typography>
            </Box>
            <Timeline sx={{ color: '#94a3b8' }} />
          </Stack>
          
          <Box sx={{ width: '100%', height: 300 }}>
            <BarChart
              xAxis={[{ scaleType: 'band', data: days }]}
              series={[
                { 
                  data: weeklyData, 
                  color: '#3b82f6',
                  label: 'Patients'
                }
              ]}
              height={300}
              borderRadius={8}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Box>
        </Paper>

        {/* Side Info Card */}
        <Paper 
          elevation={0} 
          sx={{ 
            flex: { xs: '1 1 100%', lg: '1 1 30%' }, 
            p: 4, borderRadius: 5, bgcolor: '#1e293b', color: 'white' 
          }}
        >
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2 }}>Monthly Goal</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 4 }}>
            You have reached 75% of your target patient goal for February. Keep it up!
          </Typography>
          
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 3 }} />
          
          <Stack spacing={3}>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>Top Category</Typography>
              <Typography variant="body1" fontWeight="700">General Checkup (62%)</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>Peak Day</Typography>
              <Typography variant="body1" fontWeight="700">Thursday (Avg. 22 pts)</Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default DoctorAnalytics;