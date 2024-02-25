import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export interface MyAppBarProps {
  children?: React.ReactNode;
}

export default function MyAppBar(props: MyAppBarProps) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        {props?.children}
      </Toolbar>
    </AppBar>
  );
}
