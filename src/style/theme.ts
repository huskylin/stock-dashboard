import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ededed',
      paper: '#ffffff',
    },
    primary: {
      main: '#0386f4',
      light: '#0386f4',
    },
    secondary: {
      main: '#f6d699',
      light: '#f6d699'
    }
  },
  typography: {
    fontFamily: ['HanHei TC', 'PingFang TC', 'Helvetica Neue', 'Helvetica', 'STHeitiTC-Light', 'Arial', 'sans-serif'].join(', '),
    fontSize: 13,
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

export default theme;
