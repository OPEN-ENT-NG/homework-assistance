import { SelectChangeEvent } from "@mui/material";

import { TIME_UNIT } from "~/core/enums";

export interface TimeSelectorProps {
  [TIME_UNIT.HOUR]: {
    value: string;
    possibleValues: string[];
    onChange: (event: SelectChangeEvent<string>) => void;
  };
  [TIME_UNIT.MINUTE]: {
    value: string;
    possibleValues: string[];
    onChange: (event: SelectChangeEvent<string>) => void;
  };
}
