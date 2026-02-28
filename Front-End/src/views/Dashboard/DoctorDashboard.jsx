import React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableHead, TableRow, Chip, Avatar, Stack, IconButton 
} from '@mui/material';
import { 
  AccessTime, Person, CheckCircle, PendingActions, 
  HourglassEmpty, Cancel, ChevronRight 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const DoctorAppointments = () => {
  const appointments = [
    { id: 1, patient: "Ahmed Khan", time: "09:00 AM", type: "Regular Checkup", status: "Confirmed", color: "#10b981" },
    { id: 2, patient: "Sara Ali", time: "10:30 AM", type: "Follow-up", status: "Pending", color: "#f59e0b" },
    { id: 3, patient: "Zeeshan Ahmed", time: "11:15 AM", type: "Emergency", status: "In-Progress", color: "#3b82f6" },
    { id: 4, patient: "Fatima Bi", time: "12:00 PM", type: "Regular Checkup", status: "Confirmed", color: "#10b981" },
    { id: 5, patient: "Bilal Sheikh", time: "02:30 PM", type: "Consultation", status: "Cancelled", color: "#ef4444" },
  ];

  const stats = [
    { label: "Confirmed", count: 2, icon: <CheckCircle />, color: "#10b981" },
    { label: "Pending", count: 1, icon: <HourglassEmpty />, color: "#f59e0b" },
    { label: "In-Progress", count: 1, icon: <PendingActions />, color: "#3b82f6" },
  ];

  return (
    <DashboardLayout role="Doctor" name="Dr. Muhammad Usman">
      {/* Header & Stats Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', mb: 3 }}>
          Today's Appointments
        </Typography>
        
        {/* Flexbox for Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {stats.map((stat, index) => (
            <Paper 
              key={index}
              sx={{ 
                flex: { xs: '1 1 100%', sm: '1 1 30%' }, 
                p: 2.5, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2,
                border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: `${stat.color}15`, color: stat.color, display: 'flex' }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ color: '#1e293b' }}>{stat.count}</Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: '500' }}>{stat.label}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Appointments Table */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 5, border: '1px solid #e2e8f0', overflow: 'hidden',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ color: '#64748b', fontWeight: '700', py: 2.5 }}>Patient Name</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Time</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Visit Type</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Status</TableCell>
              <TableCell align="right" sx={{ color: '#64748b', fontWeight: '700' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((apt) => (
              <TableRow key={apt.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#e0f2fe', color: '#0369a1', width: 36, height: 36, fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {apt.patient[0]}
                    </Avatar>
                    <Typography variant="body2" fontWeight="700" color="#334155">{apt.patient}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTime sx={{ fontSize: 18, color: '#94a3b8' }} />
                    <Typography variant="body2" fontWeight="500" color="#475569">{apt.time}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {apt.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={apt.status} 
                    sx={{ 
                      bgcolor: `${apt.color}15`, color: apt.color, fontWeight: '800', 
                      fontSize: '0.75rem', borderRadius: '8px', border: `1px solid ${apt.color}30`
                    }} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" sx={{ bgcolor: '#f1f5f9' }}>
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
};

export default DoctorAppointments;