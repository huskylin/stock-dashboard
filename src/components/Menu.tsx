import { MenuList, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
interface Link {
  link?: string;
  icon?: any;
  name: string;
}
interface MenuProps {
  items: Link[];
}

export default function Menu({ items }: MenuProps) {
  const [selectedItem, setSelectedItem] = useState<string>();
  const handleItemClick = (item: Link) => {
    setSelectedItem(item.name);
  };
  return (
    <MenuList>
      {items.map((item: Link) => {
        return (
          <MenuItem
            key={item.name}
            sx={{
              borderLeft: `3px solid ${
                selectedItem === item.name ? '#0386f4' : 'transparent'
              }`,
              margin: '0 3px 18px 0',
              padding: '9px 15px',
              marginLeft: '-1px',
              ':hover': {
                borderLeft: '3px solid #0386f4',
                color: '#0386f4',
              },
            }}
            onClick={() => handleItemClick(item)}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {item.icon}
              {item.link ? (
                <Link href={`/${item.link}`}>{item.name}</Link>
              ) : (
                <span>{item.name}</span>
              )}
            </div>
          </MenuItem>
        );
      })}
    </MenuList>
  );
}
