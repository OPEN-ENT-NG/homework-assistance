import { styled, TextField, Box } from "@cgi-learning-hub/ui";

import { TextAreaWrapperProps } from "./types";

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    !["isEditable", "isSmall"].includes(prop as string),
})<{ isEditable: boolean; isSmall: boolean; isDescription: boolean }>(
  ({ isEditable, isSmall, theme, isDescription }) => ({
    width: "95%",
    height: "100%",
    color: "grey.900",
    "& .MuiInputBase-root": {
      height: "100%",
      padding: isSmall ? ".5rem 1rem" : "1rem",
    },
    "& .MuiInputBase-input": {
      height: "100% !important",
      fontSize: "1.6rem",
      lineHeight: "3rem",
      overflowY: "auto !important",
      "&.Mui-disabled": {
        color: isDescription
          ? `${theme.palette.grey[500]} !important`
          : `${theme.palette.grey[900]} !important`,
        "-webkit-text-fill-color": isDescription
          ? `${theme.palette.grey[500]} !important`
          : `${theme.palette.grey[900]} !important`,
      },
      "&::-webkit-scrollbar": {
        width: "0.8rem",
        height: "0.8rem",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(170,170,170,1)",
        borderRadius: "0.3rem",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: isEditable
          ? `1px solid ${theme.palette.grey[400]}`
          : `1px solid transparent`,
      },
      "&:hover fieldset": {
        border: isEditable
          ? `1px solid ${theme.palette.grey[400]}`
          : `1px solid transparent`,
      },
      "&.Mui-focused fieldset": {
        border: isEditable
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid transparent`,
      },
      "&.Mui-blur fieldset": {
        border: isEditable
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid transparent`,
      },
      "&.Mui-disabled fieldset": {
        border: "1px solid transparent !important",
      },
    },
  }),
);

export const TextAreaWrapper = styled(Box, {
  shouldForwardProp: (prop) => !["width", "height"].includes(prop as string),
})<TextAreaWrapperProps>(({ theme, width, height }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(2),
  width: width,
  maxWidth: width,
  height: height,
  maxHeight: height,
}));

export const iconButtonStyle = {
  color: "grey.800",
  fontSize: "3rem",
};

export const iconWrapper = {
  fontSize: "2.4rem",
  color: "primary.main",
};
