import React from 'react';
import { Box, Typography, Paper, Avatar, Button, Stack, Chip, Divider } from '@mui/material';
import { Edit, Email, Phone, Home, Bloodtype, Cake } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const ViewProfile = () => (
  <DashboardLayout role="Patient" name="Ali Khan">
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header Card */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: 6, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Avatar src="/path-to-img.jpg" sx={{ width: 100, height: 100, border: '4px solid #f1f5f9' }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight="900" color="#1e293b">Ali Khan</Typography>
          <Typography variant="body1" color="#64748b" fontWeight="600">Patient ID: #P-001</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip label="Verified" size="small" color="success" sx={{ fontWeight: '700' }} />
            <Chip label="Premium Member" size="small" color="primary" sx={{ fontWeight: '700' }} />
          </Stack>
        </Box>
        <Button variant="outlined" startIcon={<Edit />} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 'bold' }}>Edit Profile</Button>
      </Paper>

      {/* Info Sections Container */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Personal Details */}
        <Paper elevation={0} sx={{ flex: '1 1 400px', p: 3, borderRadius: 5, border: '1px solid #e2e8f0' }}>
          <Typography variant="h6" fontWeight="800" sx={{ mb: 2, color: '#0f172a' }}>Personal Information</Typography>
          <Stack spacing={2.5}>
            <DetailItem icon={<Email color="primary" />} label="Email" value="ali.khan@email.com" />
            <DetailItem icon={<Phone color="primary" />} label="Phone" value="+92 300 1234567" />
            <DetailItem icon={<Home color="primary" />} label="Address" value="Gulshan-e-Iqbal, Karachi" />
            <DetailItem icon={<Cake color="primary" />} label="Date of Birth" value="15 June 1992" />
          </Stack>
        </Paper>

        {/* Medical Stats */}
        <Paper elevation={0} sx={{ flex: '1 1 300px', p: 3, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
          <Typography variant="h6" fontWeight="800" sx={{ mb: 2 }}>Medical Brief</Typography>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'white', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Bloodtype color="error" />
                <Typography fontWeight="700">Blood Group</Typography>
              </Stack>
              <Typography fontWeight="900" color="error">O+</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 3, border: '1px solid #e2e8f0' }}>
              <Typography variant="caption" color="text.secondary" fontWeight="700">Allergies</Typography>
              <Typography variant="body2" fontWeight="600">Peanuts, Penicillin</Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  </DashboardLayout>
);

const DetailItem = ({ icon, label, value }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: '#eff6ff', width: 40, height: 40 }}>{icon}</Avatar>
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: '700' }}>{label}</Typography>
      <Typography variant="body1" fontWeight="600" color="#334155">{value}</Typography>
    </Box>
  </Stack>
);

export default ViewProfile;