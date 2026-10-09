import { createTheme } from '@mui/material/styles';
import materialTheme from './material-theme.json';

// Extract light scheme from Material Theme Builder JSON
const lightScheme = materialTheme.schemes.light;

const theme = createTheme({
  palette: {
    // JSON fallback for general UI elements, but enforce
    // Brand NFRs for core semantic colors
    primary: {
      main: '#005A9C', // Brand / Link (NFR)
    },
    error: {
      main: '#D32F2F', // Error / Warning (NFR)
    },
    text: {
      primary: '#1A1A1A', // Primary Text (NFR)
      secondary: '#595959', // Secondary Text (NFR)
    },
    background: {
      default: '#FFFFFF', // Background (NFR)
      paper: lightScheme.surface, 
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    // Example of applying the secondary font to code/monospace elements
    fontFamilyMonospace: '"Fira Code", monospace',
  },
});

export default theme;