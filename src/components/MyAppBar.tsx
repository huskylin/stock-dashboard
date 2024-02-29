import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import theme from '@/style/theme';

export interface MyAppBarProps {
  children?: React.ReactNode;
}

export default function MyAppBar(props: MyAppBarProps) {
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
