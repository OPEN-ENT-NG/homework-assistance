import { FC, useEffect } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { DATE_FORMAT } from "~/core/const";

import {
  openPickerIconProps,
  openPickerButtonProps,
  textFieldProps,
  datePickerStyles,
  popperStyle,
} from "./style";
import { CustomDatePickerProps } from "./types";

export const CustomDatePicker: FC<CustomDatePickerProps> = ({
  value,
  helperText,
  onChange,
  minDate = dayjs().startOf("day"),
  shouldDisableDate,
  onValidationChange,
}) => {
  const isDisabled = value ? shouldDisableDate?.(value) : false;

  useEffect(() => {
    onValidationChange?.(!isDisabled);
  }, [isDisabled, onValidationChange]);

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
          helperText: isDisabled ? helperText : "",
        },
        popper: {
          sx: popperStyle,
        },
        dialog: {
          sx: popperStyle,
        },
      }}
    />
  );
};
