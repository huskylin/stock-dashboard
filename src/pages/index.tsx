import MyAppBar from "@/components/MyAppBar";
import Charts from "@/components/Chart";
import Box from "@mui/material/Box";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import Menu from "@/components/Menu";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <MyAppBar>
          <SearchBar></SearchBar>
        </MyAppBar>
      </Box>
      <Grid container spacing={0}>
        <Grid xs>
          <Menu></Menu>
        </Grid>
        {/* content */}
        <Grid xs={10}>
          <Grid container>
            <Grid xs>
              <Menu></Menu>
            </Grid>
            <Grid xs={10}>
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
