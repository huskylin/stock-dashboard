import { Provider, useDispatch } from 'react-redux';
import { AppProps } from 'next/app';
import store from '../store/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/style/theme';
import MyAppBar from '@/components/MyAppBar';
import SearchBar from '@/components/SearchBar';
import { Grid } from '@mui/material';
import Menu from '@/components/Menu';
import { stockMenuItems, stockSubMenuItems } from '@/utils/menuItems';
import { useRouter } from 'next/router';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { stockCode } = router.query;
  const stockCodeStr = Array.isArray(stockCode) ? stockCode[0] : stockCode;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MyAppBar>
          <SearchBar stockCode={stockCodeStr}></SearchBar>
        </MyAppBar>
        <Grid
          container
          spacing={0}
          sx={{
            minHeight: '100vh',
            background: theme.palette.background.default,
            justifyContent: 'center',
          }}
        >
          <Grid>
            <Menu items={stockMenuItems}></Menu>
          </Grid>
          <Grid>
            <Grid
              container
              sx={{ borderLeft: `1px solid ${theme.palette.grey[400]}` }}
            >
              <Grid>
                <Menu
                  items={stockSubMenuItems}
                  textAlign="start"
                  fontWeight="600"
                ></Menu>
              </Grid>
              <Grid sx={{ width: '717px' }}>
                <Component {...pageProps} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
