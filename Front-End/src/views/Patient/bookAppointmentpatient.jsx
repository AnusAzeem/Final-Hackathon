import React from 'react';
import { Box, Typography, Paper, TextField, Button, Avatar, Stack, RadioGroup, FormControlLabel, Radio, Chip, Divider } from '@mui/material';
import { DateRange, AccessTime, Search } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const BookAppointmentPatient = () => (
  <DashboardLayout role="Patient" name="Ali Khan">
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight="900" color="#0f172a">Book Appointment</Typography>
      <Typography variant="body1" color="#64748b">Find the best specialist and book your slot instantly.</Typography>
    </Box>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* Search & Doctor Selection */}
      <Box sx={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: '1px solid #e2e8f0' }}>
          <TextField 
            fullWidth 
            placeholder="Search by Doctor Name or Specialty..." 
            InputProps={{ startAdornment: <Search sx={{ mr: 1, color: '#94a3b8' }} /> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc' } }}
          />
        </Paper>

        <Typography variant="h6" fontWeight="800">Available Specialists</Typography>
        
        {['Dr. Muhammad Usman', 'Dr. Ayesha Khan'].map((doc) => (
          <Paper key={doc} elevation={0} sx={{ 
            p: 2.5, borderRadius: 5, border: '1px solid #e2e8f0', 
            display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer',
            '&:hover': { border: '1px solid #1976d2', bgcolor: '#f0f9ff' }
          }}>
            <Avatar sx={{ width: 50, height: 50, bgcolor: '#e0f2fe', color: '#0369a1' }}>D</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="800" color="#1e293b">{doc}</Typography>
              <Typography variant="caption" fontWeight="700" color="#0369a1">Cardiologist • 12 years exp.</Typography>
            </Box>
            <Button size="small" variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>Select</Button>
          </Paper>
        ))}
      </Box>

      {/* Booking Slot Panel */}
      <Paper elevation={0} sx={{ flex: '1 1 300px', p: 4, borderRadius: 6, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
        <Typography variant="h6" fontWeight="800" sx={{ mb: 3 }}>Schedule Your Visit</Typography>
        
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" fontWeight="800" color="#64748b" sx={{ mb: 1, display: 'block' }}>SELECT DATE</Typography>
            <TextField type="date" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }} />
          </Box>

          <Box>
            <Typography variant="caption" fontWeight="800" color="#64748b" sx={{ mb: 1, display: 'block' }}>AVAILABLE SLOTS</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                <Chip key={time} label={time} clickable sx={{ fontWeight: '700', borderRadius: 2, bgcolor: 'white', border: '1px solid #e2e8f0' }} />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Button 
            variant="contained" 
            fullWidth 
            sx={{ py: 2, borderRadius: 4, fontWeight: '900', fontSize: '1rem', textTransform: 'none', background: '#0f172a' }}
          >
            Confirm Booking
          </Button>
        </Stack>
      </Paper>
    </Box>
  </DashboardLayout>
);

export default BookAppointmentPatient;