import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const MainLayout = () => {
  return (
    <Stack sx={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {/* Navbar always on top */}
      {/* <Navbar /> */}

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          // border: '3px solid red', // Debugging ke liye red border hatayein ya rakhein
          // p: { xs: 2, md: 3 }, // Professional padding
          width: '100%',        // Content poori width lega
          maxWidth: '100%',     // 1440px ki limit khatam
          margin: 0,            // Center margin ki zaroorat nahi
          boxSizing: 'border-box'
        }}
      >
        <Outlet /> 
      </Box>
    </Stack>
  );
};

export default MainLayout;