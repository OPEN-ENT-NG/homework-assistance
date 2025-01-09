import { SxProps } from "@mui/material";

import { columnBoxStyle, spaceBetweenBoxStyle } from "~/core/style/boxStyles";

export const previewWrapper: SxProps = {
  ...columnBoxStyle,
  justifyContent: "flex-start",
  boxSizing: "border-box",
  height: "100%",
  padding: "3rem 5rem",
  gap: "1rem",
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
  marginTop: "1rem",
  g: 2,
  "@media (max-width: 800px)": {
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
};

export const datesWrapper = {
  ...columnBoxStyle,
  gap: "1rem",
  height: "100%",
  flex: "1 1 auto",
};

export const SVGWrapper = {};
