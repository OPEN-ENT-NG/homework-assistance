import { SxProps } from "@cgi-learning-hub/ui";

import { flexStartBoxStyle } from "~/core/style/boxStyles";

export const mainLayout = {
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  padding: "2rem 4rem 4rem 4rem",
  height: "calc(100vh - 67px)",
  maxHeight: "calc(100vh - 67px)",
  minHeight: 0,
  overflowY: "auto",
  boxSizing: "border-box",
  "@media (max-width: 767px)": {
    minHeight: "calc(100vh - 43px)",
  },
};

export const titleBox = {
  ...flexStartBoxStyle,
  gap: "2rem",
};

export const appIconWrapper = {
  width: "3.5rem",
};

export const titleStyle = {
  fontWeight: "500",
  fontSize: "2.4rem",
  color: "secondary.main",
};

export const containerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  flex: 1,
  minHeight: 0,
};

export const topRowStyle: SxProps = {
  display: "flex",
  gap: 3,
  flex: "0 0 60%",
  "@media (max-width: 1000px)": {
    flexDirection: "column",
  },
};

export const topItemStyle: SxProps = {
  width: "50%",
  bgcolor: "common.white",
  borderRadius: 2,
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  "@media (max-width: 1000px)": {
    width: "100%",
  },
};

export const bottomItemStyle: SxProps = {
  flex: 1,
  bgcolor: "common.white",
  borderRadius: 2,
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
};
