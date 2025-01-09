import { SxProps } from "@mui/material";

import { columnBoxStyle, flexStartBoxStyle } from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";

export const serviceStudentWrapper: SxProps = {
  ...columnBoxStyle,
  boxSizing: "border-box",
  height: "100%",
  padding: "3rem 5rem",
  gap: "2rem",
};

export const userNameStyle: SxProps = {
  ...basicTypo,
  fontWeight: "600",
};

export const subItemStyle: SxProps = {
  ...columnBoxStyle,
  gap: "1rem",
};

export const formControlStyle: SxProps = {
  width: "20rem",
};

export const rdvWrapperStyle: SxProps = {
  ...flexStartBoxStyle,
  gap: "3rem",
  flexWrap: "wrap",
};

export const rdvItemStyle: SxProps = {
  ...flexStartBoxStyle,
  width: "auto",
  alignItems: "center",
  gap: "1rem",
};

export const phoneFieldStyle: SxProps = {
  width: "30rem",
  maxWidth: "100%",
  "& .MuiFormHelperText-root": {
    fontSize: "1.2rem",
  },
};

export const validateStudentButtonStyle = {
  fontSize: "1.6rem",
  width: "30rem",
  marginTop: "1rem",
  "@media (max-width: 800px)": {
    width: "100%",
  },
};
