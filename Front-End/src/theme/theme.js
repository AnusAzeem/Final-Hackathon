import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern Blue
    },
    secondary: {
      main: '#7c3aed', // Purple accent
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 12, // Modern rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // No all-caps (Professional look)
          padding: '8px 20px',
        },
      },
    },
  },
});