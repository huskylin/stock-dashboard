import { defaultYearRange } from '@/utils/date';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface TimeSelectorItem {
  value: string;
  text: string;
}
interface TimeSelectorProps {
  defaultValue?: string;
  items: TimeSelectorItem[];
  onChange: (event: SelectChangeEvent) => void;
}

export default function Selector({
  defaultValue = defaultYearRange,
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
