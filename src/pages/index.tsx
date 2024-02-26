import MyAppBar from '@/components/MyAppBar';
import Charts from '@/components/Chart';
import Box from '@mui/material/Box';
import SearchBar from '@/components/SearchBar';
import Table from '@/components/Table';
import Menu from '@/components/Menu';
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
        {/* content */}
        <Grid>
          <Grid container>
            <Grid>
              <Menu></Menu>
            </Grid>
            <Grid>
              <Box component="section" m={1} p={2}>
                <Charts></Charts>
              </Box>
              <Box component="section" m={1} p={2}>
                <Table></Table>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
