import { SxProps } from "@mui/material";

import { columnBoxStyle } from "~/core/style/boxStyles";

export const serviceStudentWrapper: SxProps = {
  ...columnBoxStyle,
  justifyContent: "space-between",
  boxSizing: "border-box",
  height: "100%",
  padding: "4rem 6rem",
  gap: "2rem",
};
