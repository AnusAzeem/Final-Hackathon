import React from 'react';
import { 
  Box, Typography, Paper, TextField, Button, MenuItem, 
  InputAdornment, Divider 
} from '@mui/material';
import { 
  EventAvailable, PersonSearch, LocalHospital, 
  CalendarMonth, AccessTime, Info 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const BookAppointment = () => (
  <DashboardLayout role="Receptionist" name="Sana (Receptionist)">
    {/* Page Header */}
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
          Book Appointment
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
          Schedule a new consultation for registered patients.
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, bgcolor: '#f5f3ff', p: 1.5, borderRadius: 3, color: '#7c3aed' }}>
        <EventAvailable sx={{ fontSize: 32 }} />
      </Box>
    </Box>

    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0',
        background: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* SECTION 1: Selection Details */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: '700', mb: 1, display: 'flex', alignItems: 'center', color: '#1e293b' }}>
          <Info sx={{ mr: 1, color: '#7c3aed' }} /> Appointment Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Flex Container for Selection Row */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <TextField 
            select label="Select Patient" defaultValue=""
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonSearch sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            <MenuItem value="1">Ahmed Ali (#P-001)</MenuItem>
            <MenuItem value="2">Zainab Fatima (#P-042)</MenuItem>
          </TextField>

          <TextField 
            select label="Assign Doctor" defaultValue=""
            InputProps={{ startAdornment: <InputAdornment position="start"><LocalHospital sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            <MenuItem value="1">Dr. Muhammad Usman (General Physician)</MenuItem>
            <MenuItem value="2">Dr. Ayesha Khan (Cardiologist)</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* SECTION 2: Schedule Details */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: '700', mb: 1, display: 'flex', alignItems: 'center', color: '#1e293b' }}>
          <CalendarMonth sx={{ mr: 1, color: '#7c3aed' }} /> Schedule Visit
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Flex Container for Date/Time Row */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <TextField 
            fullWidth type="date" label="Appointment Date" 
            InputLabelProps={{ shrink: true }}
            InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonth sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            fullWidth type="time" label="Preferred Time" 
            InputLabelProps={{ shrink: true }}
            InputProps={{ startAdornment: <InputAdornment position="start"><AccessTime sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Box>
      </Box>

      {/* Action Buttons (Flex Row) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        <Button 
          variant="contained" size="large" startIcon={<EventAvailable />} 
          sx={{ 
            borderRadius: 3, px: 5, py: 1.5, textTransform: 'none', fontWeight: '700',
            background: 'linear-gradient(45deg, #7c3aed 30%, #a855f7 90%)',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
            flex: { xs: '1 1 100%', sm: 'auto' },
            '&:hover': { background: 'linear-gradient(45deg, #6d28d9 30%, #9333ea 90%)' }
          }}
        >
          Confirm Appointment
        </Button>
        <Button 
          variant="outlined" size="large"
          sx={{ 
            borderRadius: 3, px: 4, textTransform: 'none', fontWeight: '600',
            color: '#64748b', borderColor: '#e2e8f0',
            flex: { xs: '1 1 100%', sm: 'auto' }
          }}
        >
          Check Availability
        </Button>
      </Box>
    </Paper>
  </DashboardLayout>
);

export default BookAppointment;