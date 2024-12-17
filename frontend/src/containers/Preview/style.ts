import { SxProps } from "@mui/material";

import { columnBoxStyle, spaceBetweenBoxStyle } from "~/core/style/boxStyles";

export const previewWrapper: SxProps = {
  ...columnBoxStyle,
  justifyContent: "space-between",
  boxSizing: "border-box",
  height: "100%",
  padding: "4rem 6rem",
  gap: "2rem",
};

export const secondPartTitle: SxProps = {
  color: "grey.800",
  fontWeight: "400",
  fontSize: "1.8rem",
  lineHeight: "2.1rem",
};

export const secondPartWrapper = {
  ...spaceBetweenBoxStyle,
  alignItems: "flex-end",
  g: 2,
  "@media (max-width: 800px)": {
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
};

export const datesWrapper = {
  ...columnBoxStyle,
  gap: "2rem",
  height: "100%",
  flex: "1 1 auto",
};

export const SVGWrapper = {};
