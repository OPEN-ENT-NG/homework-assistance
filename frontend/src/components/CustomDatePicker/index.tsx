import { FC } from "react";

import { DatePicker } from "@cgi-learning-hub/ui";

import {
  openPickerIconProps,
  openPickerButtonProps,
  textFieldProps,
  datePickerStyles,
  popperStyle,
} from "./style";

export const CustomDatePicker: FC = () => (
  <DatePicker
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
