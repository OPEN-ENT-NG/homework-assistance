import { FC } from "react";

import { FormControl, Select, MenuItem } from "@cgi-learning-hub/ui";
import { v4 as uuidv4 } from "uuid";

import { TimeSelectProps } from "./types";

export const TimeSelect: FC<TimeSelectProps> = ({
  value,
  possibleValues,
  onChange,
}) => {
  return (
    <FormControl variant="standard">
      <Select
        value={value}
        onChange={onChange}
        sx={{ fontSize: "1.6rem", border: "none" }}
      >
        {possibleValues.map((item) => (
          <MenuItem key={uuidv4()} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
