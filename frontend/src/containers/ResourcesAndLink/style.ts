import { SxProps } from "@mui/material";

import { spaceBetweenBoxStyle } from "~/core/style/boxStyles";

export const RessourcesAndLinkWrapper: SxProps = {
  ...spaceBetweenBoxStyle,
  boxSizing: "border-box",
  height: "100%",
  padding: "4rem 6rem",
  gap: "2rem",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
  },
};
