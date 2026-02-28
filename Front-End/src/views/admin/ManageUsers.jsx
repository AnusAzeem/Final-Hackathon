import React from 'react';
import { 
  Button, Table, TableBody, TableCell, TableHead, TableRow, 
  Paper, Chip, Box, Typography, IconButton, Stack, Avatar, 
  TextField, InputAdornment 
} from '@mui/material';
import { 
  Add, Edit, Delete, Search, FilterList, 
  MailOutline, AdminPanelSettings 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const ManageUsers = () => {
  // Data Array (Ab row manually likhne ki zaroorat nahi)
  const users = [
    { id: 1, name: "Dr. Muhammad Usman", email: "usman@clinic.com", role: "Doctor", status: "Active", initial: "U" },
    { id: 2, name: "Dr. Ayesha Khan", email: "ayesha@clinic.com", role: "Doctor", status: "Active", initial: "A" },
    { id: 3, name: "Sana Ahmed", email: "sana@reception.com", role: "Receptionist", status: "Active", initial: "S" },
    { id: 4, name: "Zubair Ali", email: "zubair@admin.com", role: "Admin", status: "Inactive", initial: "Z" },
  ];

  // Role ke mutabiq color set karne ka logic
  const getRoleChip = (role) => {
    const configs = {
      Doctor: { color: '#0ea5e9', bg: '#e0f2fe' },
      Receptionist: { color: '#8b5cf6', bg: '#f5f3ff' },
      Admin: { color: '#f43f5e', bg: '#fff1f2' }
    };
    const style = configs[role] || configs.Admin;
    return (
      <Chip 
        label={role} 
        size="small" 
        sx={{ bgcolor: style.bg, color: style.color, fontWeight: '700', borderRadius: '6px' }} 
      />
    );
  };

  return (
    <DashboardLayout role="Admin" name="Super Admin">
      {/* Page Header Area */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
            User Management
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
            Create, edit and manage system access for clinical staff.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          sx={{ 
            borderRadius: 3, px: 3, py: 1.2, textTransform: 'none', fontWeight: '800',
            background: '#0f172a', '&:hover': { background: '#1e293b' },
            boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.2)'
          }}
        >
          Add New User
        </Button>
      </Box>

      {/* Search & Filter Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField 
          placeholder="Search users by name or email..."
          size="small"
          sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#94a3b8' }} /></InputAdornment>,
          }}
        />
        <Button variant="outlined" sx={{ borderRadius: 3, borderColor: '#e2e8f0', color: '#64748b' }} startIcon={<FilterList />}>
          Filters
        </Button>
      </Stack>

      {/* Users Table */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 5, border: '1px solid #e2e8f0', overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ color: '#64748b', fontWeight: '700', py: 2.5 }}>Full Name</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Email Address</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>System Role</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: '700' }}>Account Status</TableCell>
              <TableCell align="right" sx={{ color: '#64748b', fontWeight: '700' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/* User Info with Avatar */}
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#f1f5f9', color: '#0f172a', fontSize: '0.9rem', fontWeight: 'bold', border: '1px solid #e2e8f0' }}>
                      {user.initial}
                    </Avatar>
                    <Typography variant="body2" fontWeight="700" color="#334155">
                      {user.name}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Email with Icon */}
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ color: '#64748b' }}>
                    <MailOutline sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{user.email}</Typography>
                  </Stack>
                </TableCell>

                {/* Dynamic Role Chip */}
                <TableCell>
                  {getRoleChip(user.role)}
                </TableCell>

                {/* Status Chip */}
                <TableCell>
                  <Chip 
                    label={user.status} 
                    size="small"
                    variant={user.status === 'Active' ? 'filled' : 'outlined'}
                    color={user.status === 'Active' ? 'success' : 'default'}
                    sx={{ fontWeight: '800', fontSize: '0.7rem' }}
                  />
                </TableCell>

                {/* Action Buttons */}
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <IconButton size="small" sx={{ color: '#6366f1', bgcolor: '#eef2ff', '&:hover': { bgcolor: '#e0e7ff' } }}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#f43f5e', bgcolor: '#fff1f2', '&:hover': { bgcolor: '#ffe4e6' } }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DashboardLayout>
  );
};

export default ManageUsers;