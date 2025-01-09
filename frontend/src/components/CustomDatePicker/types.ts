import { DatePickerProps } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export interface CustomDatePickerProps {
  helperText?: string;
  value: Dayjs | null;
  onChange: DatePickerProps<Dayjs>["onChange"];
  minDate?: Dayjs;
  shouldDisableDate?: (date: Dayjs) => boolean;
  onValidationChange?: (isValid: boolean) => void;
}
