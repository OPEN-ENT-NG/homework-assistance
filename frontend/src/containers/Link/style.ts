import { columnBoxStyle } from "~/core/style/boxStyles";

export const adminLinkWrapper = {
  ...columnBoxStyle,
  height: "100%",
  gap: "1rem",
  width: "50%",
  flex: 1,
  "@media (max-width: 1000px)": {
    width: "100%",
  },
};
