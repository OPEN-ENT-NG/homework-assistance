import { SxProps } from "@mui/material";

import { columnBoxStyle, spaceBetweenBoxStyle } from "~/core/style/boxStyles";

export const previewWrapper: SxProps = {
  ...columnBoxStyle,
  boxSizing: "border-box",
  height: "100%",
  padding: "3rem 5rem",
  gap: "2rem",
};

export const secondPartTitle: SxProps = {
  color: "grey.800",
  fontWeight: "400",
  fontSize: "1.8rem",
  lineHeight: "2.1rem",
  textDecoration: "underline",
};

export const secondPartWrapper = {
  ...spaceBetweenBoxStyle,
  g: 2,
};

export const SVGWrapper = {
  width: "40%",
  "@media (max-width: 800px)": {
    display: "none",
  },
};

export const datesWrapper = {
  ...columnBoxStyle,
  g: 1,
};
