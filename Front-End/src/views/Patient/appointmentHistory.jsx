import React from 'react';
import { Box, Typography, Paper, Chip, Avatar, Button, Stack } from '@mui/material';
import { EventAvailable, History, Message, Download } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const AppointmentHistory = () => {
  const appointments = [
    { doctor: "Dr. Muhammad Usman", date: "12 Feb 2026", time: "10:30 AM", status: "Completed", type: "General Checkup" },
    { doctor: "Dr. Ayesha Khan", date: "05 Jan 2026", time: "02:15 PM", status: "Cancelled", type: "Skin Consultation" },
  ];

  return (
    <DashboardLayout role="Patient" name="Ali Khan">
      <Typography variant="h4" fontWeight="900" sx={{ mb: 4, color: '#0f172a' }}>Appointment History</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {appointments.map((apt, i) => (
          <Paper key={i} elevation={0} sx={{ 
            p: 3, borderRadius: 5, border: '1px solid #e2e8f0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2,
            transition: '0.3s', '&:hover': { boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
          }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: apt.status === 'Completed' ? '#dcfce7' : '#fee2e2', color: apt.status === 'Completed' ? '#166534' : '#991b1b' }}>
                <History />
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="800" color="#1e293b">{apt.doctor}</Typography>
                <Typography variant="body2" color="#64748b" fontWeight="600">{apt.type} • {apt.date} at {apt.time}</Typography>
              </Box>
            </Stack>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={apt.status} 
                color={apt.status === 'Completed' ? 'success' : 'error'} 
                size="small" 
                sx={{ fontWeight: 'bold', borderRadius: '6px' }} 
              />
              {apt.status === 'Completed' && (
                <Button size="small" variant="text" startIcon={<Download />} sx={{ fontWeight: '700' }}>Prescription</Button>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </DashboardLayout>
  );
};

export default AppointmentHistory;