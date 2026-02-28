import React from 'react';
import { Box, Typography, Paper, Stack, Avatar, Divider } from '@mui/material';
import { 
  TrendingUp, People, LocalHospital, AttachMoney, 
  MoreVert, FileDownload, CalendarMonth 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { LineChart } from '@mui/x-charts/LineChart';

const Analytics = () => {
  // Stats data array
  const stats = [
    { id: 1, label: 'Total Patients', value: '1,240', icon: <People />, color: '#1976d2', bg: '#e0f2fe' },
    { id: 2, label: 'Active Doctors', value: '45', icon: <LocalHospital />, color: '#2e7d32', bg: '#dcfce7' },
    { id: 3, label: 'Avg. Consultations', value: '120/day', icon: <TrendingUp />, color: '#ed6c02', bg: '#fff7ed' },
    { id: 4, label: 'Monthly Revenue', value: '$12,400', icon: <AttachMoney />, color: '#9c27b0', bg: '#f3e8ff' },
  ];

  return (
    <DashboardLayout role="Admin" name="Super Admin">
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
            System Analytics
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            Real-time overview of hospital performance and growth.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, bgcolor: 'white', px: 2, py: 1, borderRadius: 3, border: '1px solid #e2e8f0' }}>
            <CalendarMonth sx={{ fontSize: 18, color: '#64748b' }} />
            <Typography variant="body2" fontWeight="700" color="#1e293b">March 2026</Typography>
          </Box>
          <Avatar sx={{ bgcolor: '#0f172a', cursor: 'pointer' }}>
            <FileDownload sx={{ fontSize: 20 }} />
          </Avatar>
        </Stack>
      </Box>
      
      {/* Stats Cards Row (Flexbox) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {stats.map((stat) => (
          <Paper 
            key={stat.id}
            elevation={0}
            sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' }, 
              p: 3, borderRadius: 5, border: '1px solid #e2e8f0',
              display: 'flex', alignItems: 'center', gap: 2.5,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)' }
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: stat.bg, 
                color: stat.color, 
                width: 60, height: 60,
                borderRadius: 4
              }}
            >
              {stat.icon}
            </Avatar>
            <Box>
              <Typography variant="body2" color="#64748b" fontWeight="600" sx={{ mb: 0.5 }}>
                {stat.label}
              </Typography>
              <Typography variant="h4" fontWeight="800" color="#0f172a">
                {stat.value}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Analytics Chart Section (Flexbox) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Paper 
          elevation={0}
          sx={{ 
            flex: { xs: '1 1 100%', lg: '1 1 65%' },
            p: 4, borderRadius: 6, border: '1px solid #e2e8f0',
            background: '#ffffff'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h6" fontWeight="800" sx={{ color: '#1e293b' }}>
                Patient Admittance Growth
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: '500' }}>
                Last 6 months data analysis
              </Typography>
            </Box>
            <MoreVert sx={{ color: '#94a3b8', cursor: 'pointer' }} />
          </Stack>

          <Box sx={{ width: '100%', height: 350 }}>
            <LineChart
              xAxis={[{ 
                data: [1, 2, 3, 4, 5, 6], 
                scaleType: 'point',
                dataKey: 'month',
                valueFormatter: (v) => `Month ${v}`
              }]}
              series={[
                { 
                  data: [200, 450, 300, 900, 600, 1200], 
                  area: true, 
                  color: '#1976d2',
                  label: 'New Patients',
                  showMark: true,
                }
              ]}
              height={350}
              margin={{ left: 50, right: 30, top: 30, bottom: 50 }}
              sx={{
                '.MuiAreaElement-root': {
                  fill: 'url(#paint0_linear)',
                  fillOpacity: 0.2,
                },
              }}
            />
          </Box>
        </Paper>

        {/* Quick Insights Sidebar */}
        <Paper 
          elevation={0}
          sx={{ 
            flex: { xs: '1 1 100%', lg: '1 1 30%' },
            p: 4, borderRadius: 6, bgcolor: '#0f172a', color: 'white'
          }}
        >
          <Typography variant="h6" fontWeight="700" sx={{ mb: 3 }}>System Health</Typography>
          
          <Stack spacing={4}>
            <Box>
              <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mb: 1 }}>Server Status</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 10, height: 10, bgcolor: '#22c55e', borderRadius: '50%' }} />
                <Typography variant="body2" fontWeight="700">Online & Optimized</Typography>
              </Stack>
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />

            <Box>
              <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mb: 1 }}>Top Performing Dept.</Typography>
              <Typography variant="body1" fontWeight="700">Cardiology</Typography>
              <Typography variant="caption" color="#94a3b8">+24% revenue share</Typography>
            </Box>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                "System is running at 98% efficiency. No pending maintenance alerts."
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default Analytics;