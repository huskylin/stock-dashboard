import MyAppBar from '@/components/MyAppBar';
import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import Report from '@/components/Report';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStockCodes } from '@/store/stockThunks';
import { stockMenuItems, stockSubMenuItems } from '@/utils/menuItems';

export default function Home() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchStockCodes());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar>
          <SearchBar></SearchBar>
        </MyAppBar>
      </Box>
      <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
        <Grid>
          <Menu items={stockMenuItems}></Menu>
        </Grid>
        <Grid>
          <Grid container sx={{ borderLeft: '1px solid #dddddd' }}>
            <Grid>
              <Menu items={stockSubMenuItems}></Menu>
            </Grid>
            <Grid sx={{ width: '717px' }}>
              <Report></Report>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
