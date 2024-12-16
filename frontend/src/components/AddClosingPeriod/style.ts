import { flexEndBoxStyle } from "~/core/style/boxStyles";

export const addClosingPeriodModalWrapper = {
  position: "absolute",
  top: "20%",
  left: "50%",
  width: "60%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "common.white",
  borderRadius: "1rem",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export const modalTitle = {
  fontSize: "2rem",
  lineHeight: "3.2rem",
  fontWeight: "700",
  color: "secondary.main",
};

export const closeIconButtonStyle = {
  color: "grey.800",
  fontSize: "3rem",
};

export const bottomButtonWrapper = {
  ...flexEndBoxStyle,
  gap: "2rem",
};