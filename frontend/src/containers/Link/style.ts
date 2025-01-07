import { columnBoxStyle } from "~/core/style/boxStyles";

export const adminLinkWrapper = {
  ...columnBoxStyle,
  height: "100%",
  gap: "1rem",
  width: "100%",
  maxWidth: "100%",
  "@media (max-width: 1000px)": {
    width: "100%",
  },
};
