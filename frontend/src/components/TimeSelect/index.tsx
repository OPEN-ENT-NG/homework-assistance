import { FC } from "react";

import { FormControl, Select, MenuItem } from "@cgi-learning-hub/ui";

import { selectStyle } from "./style";
import { TimeSelectProps } from "./types";

export const TimeSelect: FC<TimeSelectProps> = ({
  value,
  possibleValues,
  onChange,
}) => {
  return (
    <FormControl variant="standard">
      <Select value={value} onChange={onChange} sx={selectStyle}>
        {possibleValues.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
