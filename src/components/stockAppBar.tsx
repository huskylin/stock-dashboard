import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import theme from '@/style/theme';

export interface StockAppBarProps {
  children?: React.ReactNode;
}

export default function stockAppBar(props: StockAppBarProps) {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'center', padding: '0px' }}
      >
        {props?.children}
      </Toolbar>
    </AppBar>
  );
}
