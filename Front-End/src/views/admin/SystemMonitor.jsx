import React from 'react';
import { 
  Paper, Typography, Box, LinearProgress, Stack, 
  Chip, Avatar, Divider, IconButton 
} from '@mui/material';
import { 
  Storage, Memory, Speed, Terminal, 
  Refresh, FiberManualRecord, Shield 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const SystemMonitor = () => {
  const logs = [
    { time: "10:15 AM", event: "DB Connection: Stable", type: "info" },
    { time: "10:20 AM", event: "New Doctor Registration: Dr. Usman", type: "success" },
    { time: "10:45 AM", event: "AI Model Update: v2.4 deployed", type: "info" },
    { time: "11:02 AM", event: "System Alert: High traffic (Karachi)", type: "warning" }
  ];

  return (
    <DashboardLayout role="Admin" name="Super Admin">
      {/* Header with Status Indicator */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-1px' }}>
            System Monitor
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <FiberManualRecord sx={{ fontSize: 12, color: '#22c55e', animation: 'pulse 2s infinite' }} />
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: '600' }}>
              System Live: All services operational
            </Typography>
          </Stack>
        </Box>
        <IconButton sx={{ border: '1px solid #e2e8f0', borderRadius: 3, bgcolor: 'white' }}>
          <Refresh sx={{ color: '#64748b' }} />
        </IconButton>
      </Box>

      {/* Main Flex Container */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        
        {/* Resource Usage Card */}
        <Paper 
          elevation={0} 
          sx={{ 
            flex: { xs: '1 1 100%', lg: '1 1 48%' }, 
            p: 4, borderRadius: 6, border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
          }}
        >
          <Typography variant="h6" fontWeight="800" sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Speed color="primary" /> Infrastructure Health
          </Typography>

          <Stack spacing={4}>
            {[
              { label: 'CPU Usage', val: 42, icon: <Speed />, col: '#3b82f6' },
              { label: 'RAM Memory', val: 68, icon: <Memory />, col: '#f59e0b' },
              { label: 'Cloud Storage', val: 15, icon: <Storage />, col: '#10b981' }
            ].map((resource, i) => (
              <Box key={i}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Typography variant="body2" fontWeight="700" color="#475569">{resource.label}</Typography>
                  <Typography variant="body2" fontWeight="800" color={resource.col}>{resource.val}%</Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={resource.val} 
                  sx={{ 
                    height: 10, borderRadius: 5, bgcolor: '#f1f5f9',
                    '& .MuiLinearProgress-bar': { bgcolor: resource.col, borderRadius: 5 }
                  }} 
                />
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 4 }} />
          
          <Stack direction="row" spacing={2}>
            <Chip icon={<Shield sx={{ fontSize: '16px !important' }} />} label="Firewall Active" size="small" sx={{ fontWeight: 700, bgcolor: '#f0fdf4', color: '#16a34a' }} />
            <Chip label="SSL Secure" size="small" sx={{ fontWeight: 700, bgcolor: '#f0f9ff', color: '#0369a1' }} />
          </Stack>
        </Paper>

        {/* Live Logs Terminal */}
        <Paper 
          elevation={0} 
          sx={{ 
            flex: { xs: '1 1 100%', lg: '1 1 48%' }, 
            p: 3, borderRadius: 6, bgcolor: '#0f172a',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)'
          }}
        >
          {/* Terminal Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, opacity: 0.8 }}>
            <Terminal sx={{ color: '#10b981', fontSize: 20 }} />
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold', letterSpacing: 1 }}>
              SYSTEM_LOGS_STREAM_V3
            </Typography>
          </Box>

          <Box sx={{ 
            fontFamily: "'Fira Code', 'Courier New', monospace", 
            fontSize: '13px', 
            color: '#10b981',
            maxHeight: '350px',
            overflowY: 'auto'
          }}>
            {logs.map((log, i) => (
              <Box key={i} sx={{ mb: 1.5, display: 'flex', gap: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', minWidth: '70px' }}>
                  [{log.time}]
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: log.type === 'warning' ? '#f59e0b' : log.type === 'success' ? '#10b981' : '#34d399',
                  fontWeight: '500'
                }}>
                  {log.event}
                </Typography>
              </Box>
            ))}
            <Typography variant="body2" sx={{ mt: 3, color: '#334155', animation: 'blink 1s step-end infinite' }}>
              &gt; _
            </Typography>
          </Box>
        </Paper>

      </Box>

      {/* Global CSS for Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </DashboardLayout>
  );
};

export default SystemMonitor;