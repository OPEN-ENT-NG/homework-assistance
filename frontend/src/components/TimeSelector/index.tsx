import { FC } from "react";

import { Box } from "@cgi-learning-hub/ui";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { SVGStyle, timeSelectorWrapper } from "./style";
import { TimeSelectorProps } from "./types";
import { TimeSelect } from "../TimeSelect";

export const TimeSelector: FC<TimeSelectorProps> = ({
  hour,
  minute,
  error = false,
}) => {
  const prepareValue = (value: string, possibleValues: string[]) =>
    possibleValues.includes(value) ? value : possibleValues[0];

  return (
    <Box sx={timeSelectorWrapper}>
      <AccessTimeIcon sx={SVGStyle} />
      <TimeSelect
        value={prepareValue(hour.value, hour.possibleValues)}
        possibleValues={hour.possibleValues}
        onChange={hour.onChange}
        error={error}
      />
      <TimeSelect
        value={prepareValue(minute.value, minute.possibleValues)}
        possibleValues={minute.possibleValues}
        onChange={minute.onChange}
        error={error}
      />
    </Box>
  );
};
