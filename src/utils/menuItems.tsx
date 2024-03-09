import AnnouncementIcon from '@mui/icons-material/Announcement';

export const stockMenuItems = [
  {
    name: '最新動態',
    icon: <AnnouncementIcon sx={{ color: '#434343' }}></AnnouncementIcon>,
  },
  {
    name: '股票健診',
    icon: <AnnouncementIcon sx={{ color: '#434343' }}></AnnouncementIcon>,
  },
  {
    name: '財務報表',
    pathname: 'analysis',
    icon: <AnnouncementIcon sx={{ color: '#434343' }}></AnnouncementIcon>,
  },
  {
    name: '獲利能力',
    icon: <AnnouncementIcon sx={{ color: '#CA0813' }}></AnnouncementIcon>,
  },
  {
    name: '安全性分析',
    icon: <AnnouncementIcon sx={{ color: '#198420' }}> </AnnouncementIcon>,
  },
  {
    name: '成長力分析',
    icon: <AnnouncementIcon sx={{ color: '#E67820' }}></AnnouncementIcon>,
  },
  {
    name: '價值評估',
    icon: <AnnouncementIcon sx={{ color: '#345BA7' }}></AnnouncementIcon>,
  },
  {
    name: '董監與籌碼',
    icon: <AnnouncementIcon sx={{ color: '#198420' }}></AnnouncementIcon>,
  },
  {
    name: '關鍵指標',
    icon: <AnnouncementIcon sx={{ color: '#743079' }}></AnnouncementIcon>,
  },
  {
    name: '產品組合',
    icon: <AnnouncementIcon sx={{ color: '#526fd7' }}></AnnouncementIcon>,
  },
];
export const stockSubMenuItems = [
  { name: '每月營收', pathname: 'analysis' },
  { name: '每股盈餘' },
  { name: '每股淨值' },
  { name: '損益表' },
  { name: '總資產' },
  { name: '負債和股東權益' },
  { name: '現金流量表' },
  { name: '股利政策' },
  { name: '電子書' },
];
