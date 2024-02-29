import { TypeBackground, createTheme } from '@mui/material/styles';

interface ExtendedTypeBackground extends TypeBackground {
  appBar: string;
}

const theme = createTheme({
  palette: {
    background: {
      default: '#ededed',
      paper: '#ffffff',
    },
  },
});

export default theme;
