import { SelectChangeEvent } from "@mui/material";

export interface TimeSelectProps {
  value: string;
  possibleValues: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
  error?: boolean;
}
