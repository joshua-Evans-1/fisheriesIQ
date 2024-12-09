import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336', // Red color
    },
    secondary: {
      main: '#ff4081', // Pink accent
    },
    background: {
      default: '#121212', // Dark background
      paper: '#000000',   // Darker paper background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Light grey for secondary text
    },
  },
});

export default theme;