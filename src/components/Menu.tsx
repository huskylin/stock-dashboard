import theme from '@/style/theme';
import { MenuList, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface Link {
  name: string;
  link?: string;
  icon?: any;
  pathname?: string;
}
interface MenuProps {
  items: Link[];
  textAlign?: string;
  fontWeight?: string;
}

export default function Menu({
  items,
  textAlign = 'center',
  fontWeight = '400',
}: MenuProps) {
  const router = useRouter();
  const { pathname } = router;
  const pathParts = pathname.split('/');
  const analysisPart = pathParts[1];

  return (
    <MenuList>
      {items.map((item: Link) => {
        return (
          <MenuItem
            key={item.name}
            sx={{
              borderLeft: `3px solid ${
                item.pathname === analysisPart
                  ? theme.palette.primary.main
                  : 'transparent'
              }`,
              margin: item.icon ? '0 3px 18px 0' : '',
              padding: '9px 15px',
              marginLeft: '-1px',
              ':hover': {
                borderLeft: `3px solid ${theme.palette.primary.main}`,
                color: `${theme.palette.primary.main}`,
              },
            }}
            selected={item.pathname === analysisPart}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: textAlign,
                fontWeight,
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
