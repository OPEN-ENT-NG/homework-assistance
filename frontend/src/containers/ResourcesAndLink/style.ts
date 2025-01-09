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
    alignItems: "stretch",
  },
};

export const ItemWrapper: SxProps = {
  flex: 1,
  minWidth: 0,
  height: "100%",
  "@media (max-width: 1000px)": {
    width: "100%",
  },
};
