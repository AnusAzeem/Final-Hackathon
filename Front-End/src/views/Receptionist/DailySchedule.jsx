import React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableHead, TableRow, Chip, Avatar, Stack, IconButton, Tooltip 
} from '@mui/material';
import { 
  AccessTime, Person, MoreVert, CalendarMonth, 
  RadioButtonChecked 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const DailySchedule = () => {
  const schedule = [
    { id: 1, time: "09:00 AM", patient: "Ahmed Ali", doctor: "Dr. Usman", status: "Arrived", color: "#10b981" },
    { id: 2, time: "10:30 AM", patient: "Sara Bakar", doctor: "Dr. Ayesha", status: "Waiting", color: "#f59e0b" },
    { id: 3, time: "11:00 AM", patient: "Bilal Sheikh", doctor: "Dr. Usman", status: "In-Progress", color: "#3b82f6" },
    { id: 4, time: "12:15 PM", patient: "Zoya Khan", doctor: "Dr. Ayesha", status: "Scheduled", color: "#64748b" },
  ];

  return (
    <DashboardLayout role="Receptionist" name="Sana (Receptionist)">
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
            Daily Schedule
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
            <CalendarMonth sx={{ fontSize: 18, color: '#64748b' }} />
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Typography>
          </Stack>
        </Box>
        <Chip 
          label={`${schedule.length} Appointments`} 
          sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: '700', borderRadius: 2, p: 1 }} 
        />
      </Box>

      {/* Table Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 5, 
          border: '1px solid #e2e8f0', 
          overflow: 'hidden',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ color: '#64748b', fontWeight: '700', py: 2.5 }}>Time Slot</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Patient Details</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Assigned Doctor</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Status</TableCell>
              <TableCell align="right" sx={{ color: '#64748b', fontWeight: '700' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/* Time Slot */}
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, bgcolor: '#f1f5f9', borderRadius: 2, display: 'flex' }}>
                      <AccessTime sx={{ fontSize: 18, color: '#1e293b' }} />
                    </Box>
                    <Typography variant="body2" fontWeight="700" color="#1e293b">
                      {row.time}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Patient Details */}
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#ddd6fe', color: '#7c3aed', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {row.patient.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight="600" color="#334155">
                      {row.patient}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Doctor */}
                <TableCell>
                  <Typography variant="body2" sx={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
                    <RadioButtonChecked sx={{ fontSize: 12, mr: 1, color: '#1976d2' }} />
                    {row.doctor}
                  </Typography>
                </TableCell>

                {/* Status Chip */}
                <TableCell>
                  <Chip 
                    label={row.status} 
                    sx={{ 
                      bgcolor: `${row.color}15`, 
                      color: row.color, 
                      fontWeight: '800', 
                      fontSize: '0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${row.color}30`
                    }} 
                    size="small" 
                  />
                </TableCell>

                {/* Action Icon */}
                <TableCell align="right">
                  <Tooltip title="Options">
                    <IconButton size="small">
                      <MoreVert fontSize="small" sx={{ color: '#94a3b8' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
};

export default DailySchedule;