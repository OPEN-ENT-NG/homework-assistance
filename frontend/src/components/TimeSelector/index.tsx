import { FC } from "react";

import { Box } from "@cgi-learning-hub/ui";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { SVGStyle, timeSelectorWrapper } from "./style";
import { TimeSelectorProps } from "./types";
import { TimeSelect } from "../TimeSelect";

export const TimeSelector: FC<TimeSelectorProps> = ({ hour, minute }) => (
  <Box sx={timeSelectorWrapper}>
    <AccessTimeIcon sx={SVGStyle} />
    <TimeSelect
      value={hour.value}
      possibleValues={hour.possibleValues}
      onChange={hour.onChange}
    />
    <TimeSelect
      value={minute.value}
      possibleValues={minute.possibleValues}
      onChange={minute.onChange}
    />
  </Box>
);
