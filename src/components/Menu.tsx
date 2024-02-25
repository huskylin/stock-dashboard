import { MenuList, MenuItem, Divider } from "@mui/material";

export default function Menu() {
  return (
    <MenuList>
      <MenuItem selected>Item 1</MenuItem>

      <MenuItem>Item 2</MenuItem>

      <MenuItem>Item 3</MenuItem>
    </MenuList>
  );
}
