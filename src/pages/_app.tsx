import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import store from '../store/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/style/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
