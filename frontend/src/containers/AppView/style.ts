import { mainContainerBackgroundColor } from "~/core/style/style";

export const globalStyle = {
  "main.container-fluid": {
    padding: "0 !important",
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 67px)",
    maxWidth: "none",
    "--edifice-white-rgb": mainContainerBackgroundColor,
    "@media (max-width: 800px)": {
      minHeight: "calc(100vh - 43px)",
    },
  },
};

export const loaderWrapper = {
  width: "100%",
  height: "calc(100vh - 67px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
