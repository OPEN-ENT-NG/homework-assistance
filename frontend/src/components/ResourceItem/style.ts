import { SxProps, Theme } from "@mui/material";

export const cardStyles: SxProps<Theme> = {
  padding: ".5rem",
  display: "flex",
  width: "12rem",
  height: "17.5rem",
  flexDirection: "column",
  textDecoration: "none",
  cursor: "pointer",
  border: "none",
  boxShadow: "none",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
};

export const imageContainerStyles: SxProps<Theme> = {
  height: "12.5rem",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const imageStyles = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",
} as const;

export const contentBoxStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export const titleTypographyStyles: SxProps<Theme> = {
  fontWeight: "500",
  color: "secondary.main",
  fontSize: "1.4rem",
  lineHeight: "2.1rem",
  textAlign: "center",
};

export const descriptionTypographyStyles: SxProps<Theme> = {
  fontWeight: "400",
  color: "grey.dark",
  fontSize: "1.1rem",
  lineHeight: "1.2rem",
  textAlign: "center",
};
