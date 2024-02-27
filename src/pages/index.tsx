import MyAppBar from '@/components/MyAppBar';
import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import Menu from '@/components/Menu';
import Report from '@/components/Report';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStockCodes } from '@/store/stockThunks';

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
      <Grid container spacing={0}>
        <Grid>
          <Menu></Menu>
        </Grid>
        <Grid>
          <Grid container>
            <Grid>
              <Menu></Menu>
            </Grid>
            <Report></Report>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
