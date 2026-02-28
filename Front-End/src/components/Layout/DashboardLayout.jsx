import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
  IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Avatar, Stack, Tooltip 
} from '@mui/material';
import { 
  Menu as MenuIcon, Dashboard, People, Assignment, 
  SmartToy, Logout, Settings, Subscriptions,
  History, Person, AddCircle, EventNote, Assessment, MonitorHeart
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/slices/authSlice";

const drawerWidth = 280;

const DashboardLayout = ({ children, role, name }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/logout', {}, { withCredentials: true });
      if (response.data.status === 'success') {
        dispatch(logout());
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error("Logout Error:", error);
      localStorage.clear();
      navigate('/login');
    }
  };

  // --- Updated Menu Items according to your requirements ---
  const menuItems = {
    Admin: [
      { text: 'Analytics', icon: <Assessment />, path: '/admin-dashboard' },
      { text: 'Manage Users', icon: <People />, path: '/manage-users' },
      { text: 'Subscriptions', icon: <Subscriptions />, path: '/subscription' },
      { text: 'System Monitor', icon: <MonitorHeart />, path: '/system-monitor' },
    ],
    Doctor: [
      { text: 'View Appointments', icon: <EventNote />, path: '/doctor-dashboard' },
      { text: 'Patient History', icon: <History />, path: '/patient-records' },
      { text: 'Personal Analytics', icon: <Assessment />, path: '/doctor-analytics' },
      { text: 'AI Diagnosis', icon: <SmartToy />, path: '/ai-tool' },
    ],
    Receptionist: [
      { text: 'Register Patient', icon: <Person />, path: '/receptionist-dashboard' },
      { text: 'Book Appointment', icon: <AddCircle />, path: '/book-appointment' },
      { text: 'Daily Schedule', icon: <Assignment />, path: '/daily-schedule' },
    ],
    Patient: [
      { text: 'View Profile', icon: <Person />, path: '/patient-dashboard' },
      { text: 'Appointment History', icon: <History />, path: '/my-reports' },
      { text: 'Book Appointment', icon: <AddCircle />, path: '/book-new' },
    ],
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      <Toolbar sx={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
        color: 'white', mb: 2
      }}>
        <Typography variant="h6" noWrap fontWeight="700" letterSpacing={1}>AI Clinic Management</Typography>
      </Toolbar>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems[role]?.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                  color: isActive ? '#1976d2' : '#64748b',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    color: '#1976d2',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 45, color: isActive ? '#1976d2' : '#64748b' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? '700' : '500' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2 }} />
      
      <List sx={{ px: 2, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout}
            sx={{ 
              borderRadius: '12px',
              '&:hover': { 
                bgcolor: '#fff1f2', 
                '& .MuiListItemIcon-root': { color: '#e11d48' },
                '& .MuiListItemText-primary': { color: '#e11d48' }
              }
            }}
          >
            <ListItemIcon><Logout sx={{ color: '#64748b' }} /></ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748b' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f1f5f9', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          ml: { sm: `${drawerWidth}px` }, 
          bgcolor: 'rgba(255, 255, 255, 0.8)', 
          backdropFilter: 'blur(10px)',
          color: '#1e293b', boxShadow: 'none', borderBottom: '1px solid #e2e8f0'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}><MenuIcon /></IconButton>
          <Typography variant="h6" fontWeight="700" sx={{ color: '#334155' }}>{role} Dashboard</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Settings">
              <IconButton size="small" sx={{ bgcolor: '#f1f5f9' }}><Settings fontSize="small" /></IconButton>
            </Tooltip>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" fontWeight="700">{name}</Typography>
              <Typography variant="caption" color="text.secondary">{role}</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40, boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)', fontSize: '1rem', fontWeight: 'bold' }}>
              {name ? name[0].toUpperCase() : 'U'}
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e2e8f0' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8, transition: '0.3s' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;