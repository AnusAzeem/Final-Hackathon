import React from 'react';
import { 
  Box, Typography, Paper, TextField, Button, MenuItem, 
  InputAdornment, Divider 
} from '@mui/material';
import { 
  PersonAdd, Person, Phone, Badge, Wc, Home, 
  ContactPhone, Bloodtype 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const RegisterPatient = () => (
  <DashboardLayout role="Receptionist" name="Sana (Receptionist)">
    {/* Page Header */}
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
          Patient Registration
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
          Create a digital medical profile for new visitors.
        </Typography>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, bgcolor: '#e0f2fe', p: 1.5, borderRadius: 3, color: '#0369a1' }}>
        <PersonAdd sx={{ fontSize: 32 }} />
      </Box>
    </Box>

    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 3, md: 5 }, borderRadius: 5, border: '1px solid #e2e8f0',
        background: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* SECTION 1: Personal Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: '700', mb: 1, display: 'flex', alignItems: 'center', color: '#1e293b' }}>
          <Person sx={{ mr: 1, color: '#1976d2' }} /> Personal Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Flex Container for Row 1 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <TextField 
            label="Full Name" placeholder="e.g. John Doe"
            InputProps={{ startAdornment: <InputAdornment position="start"><Badge sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            label="Age" type="number"
            sx={{ flex: { xs: '1 1 45%', md: '1 1 20%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            select label="Gender" defaultValue=""
            InputProps={{ startAdornment: <InputAdornment position="start"><Wc sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 45%', md: '1 1 20%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Box>
      </Box>

      {/* SECTION 2: Contact Details */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: '700', mb: 1, display: 'flex', alignItems: 'center', color: '#1e293b' }}>
          <ContactPhone sx={{ mr: 1, color: '#1976d2' }} /> Contact Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Flex Container for Row 2 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <TextField 
            label="Contact Number" placeholder="+92 XXX XXXXXXX"
            InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ color: '#94a3b8' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            select label="Blood Group" defaultValue=""
            InputProps={{ startAdornment: <InputAdornment position="start"><Bloodtype sx={{ color: '#e11d48' }} /></InputAdornment> }}
            sx={{ flex: { xs: '1 1 100%', md: '1 1 48%' }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="O+">O+</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
          </TextField>
        </Box>

        {/* Address Field (Full Width Flex) */}
        <Box sx={{ display: 'flex', width: '100%' }}>
          <TextField 
            fullWidth multiline rows={3} label="Residential Address" placeholder="House #, Street, City..."
            InputProps={{ startAdornment: <InputAdornment position="start"><Home sx={{ color: '#94a3b8', mt: -4 }} /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
        </Box>
      </Box>

      {/* Action Buttons (Flex Row) */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        <Button 
          variant="contained" size="large" startIcon={<PersonAdd />} 
          sx={{ 
            borderRadius: 3, px: 5, py: 1.5, textTransform: 'none', fontWeight: '700',
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
            flex: { xs: '1 1 100%', sm: 'auto' }
          }}
        >
          Create Profile
        </Button>
        <Button 
          variant="outlined" size="large"
          sx={{ 
            borderRadius: 3, px: 4, textTransform: 'none', fontWeight: '600',
            color: '#64748b', borderColor: '#e2e8f0',
            flex: { xs: '1 1 100%', sm: 'auto' }
          }}
        >
          Clear Form
        </Button>
      </Box>
    </Paper>
  </DashboardLayout>
);

export default RegisterPatient;