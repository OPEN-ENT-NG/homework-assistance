import { TextFieldVariants } from "@mui/material/TextField";

export const textFieldProps = {
  size: "medium" as const,
  variant: "outlined" as TextFieldVariants,
  sx: {
    "& .MuiInputBase-input": {
      fontSize: "1.6rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.6rem",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: "1.6rem",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1.2rem",
      marginLeft: 0,
    },
  },
};

export const datePickerStyles = {
  textField: {
    width: "17rem",
    minWidth: "17rem",
    "& .MuiInputBase-input": {
      fontSize: "1.6rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "1.6rem",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1.2rem",
      marginLeft: 0,
    },
  },
  input: {
    "& .MuiSvgIcon-root": {
      fontSize: "1.6rem",
    },
  },
  inputProps: {
    sx: {
      fontSize: "1.6rem",
    },
  },
};

export const openPickerButtonProps = {
  sx: {
    "& .MuiTypography-root": {
      fontSize: "1.6rem",
    },
  },
};

export const openPickerIconProps = {
  sx: {
    fontSize: "1.6rem",
  },
};

export const popperStyle = {
  "& .MuiPickersCalendarHeader-label": {
    fontSize: "1.6rem",
  },
  "& .MuiPickersDay-root": {
    fontSize: "1.6rem",
  },
  "& .MuiDayCalendar-weekDayLabel": {
    fontSize: "1.6rem",
  },
  "& .MuiPickersYear-yearButton": {
    fontSize: "1.6rem",
  },
  "& .MuiPickersMonth-monthButton": {
    fontSize: "1.6rem",
  },
  "& .MuiPickersArrowSwitcher-button svg": {
    fontSize: "1.6rem",
  },
};
