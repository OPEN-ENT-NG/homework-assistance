import { mainContainerBackgroundColor } from "~/core/style/style";

export const globalStyle = {
  ":root": {
    "--toastify-color-light": "var(--theme-palette-common-white)",
    "--toastify-color-dark": "var(--theme-palette-common-black)",
    "--toastify-color-info": "var(--theme-palette-info-main)",
    "--toastify-color-success": "var(--theme-palette-success-main)",
    "--toastify-color-warning": "var(--theme-palette-warning-main)",
    "--toastify-color-error": "var(--theme-palette-error-main)",
    "--toastify-font-family": "helvetica",
    "--toastify-text-color-light": "var(--theme-palette-text-primary)",
    "--toastify-text-color-dark": "var(--theme-palette-common-white)",
  },
  "main.container-fluid": {
    padding: "0 !important",
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 71px)",
    maxWidth: "none",
    "--edifice-white-rgb": mainContainerBackgroundColor,
    "@media (max-width: 767px)": {
      minHeight: "calc(100vh - 43px)",
    },
  },
  "&.Toastify__toast": {
    fontSize: "1.6rem !important",
  },
  "&.Toastify__toast-body": {
    fontSize: "1.6rem !important",
  },
  "& .Toastify__toast-container .Toastify__toast .Toastify__toast-body": {
    fontSize: "1.6rem !important",
  },
};

export const loaderWrapper = {
  width: "100%",
  height: "calc(100vh - 71px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
