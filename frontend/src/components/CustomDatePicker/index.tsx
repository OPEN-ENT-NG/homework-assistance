import { FC } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import {
  openPickerIconProps,
  openPickerButtonProps,
  textFieldProps,
  datePickerStyles,
  popperStyle,
} from "./style";
import { CustomDatePickerProps } from "./types";
import { DATE_FORMAT } from "~/core/const";

export const CustomDatePicker: FC<CustomDatePickerProps> = ({
  value,
  onChange,
  minDate = dayjs().startOf("day"),
  shouldDisableDate,
}) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      format={DATE_FORMAT}
      minDate={minDate}
      shouldDisableDate={shouldDisableDate}
      slotProps={{
        openPickerIcon: openPickerIconProps,
        openPickerButton: openPickerButtonProps,
        textField: {
          ...textFieldProps,
          sx: datePickerStyles.textField,
          InputProps: {
            sx: datePickerStyles.input,
          },
          inputProps: {
            ...datePickerStyles.inputProps,
          },
        },
        popper: {
          sx: popperStyle,
        },
      }}
    />
  );
};
