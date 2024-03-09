import { FormControl, MenuItem, Select } from '@mui/material';

interface TimeSelectorItem {
  value: string;
  text: string;
}
interface TimeSelectorProps {
  defaultValue?: string;
  items: TimeSelectorItem[];
  onChange: any;
}

export default function Selector({
  defaultValue = '5',
  items,
  onChange,
}: TimeSelectorProps) {
  return (
    <FormControl size="small">
      <Select
        id="year-range-select-label"
        value={defaultValue}
        onChange={onChange}
      >
        {items.map((item: TimeSelectorItem) => {
          return (
            <MenuItem key={item.text} value={item.value}>
              {item.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
