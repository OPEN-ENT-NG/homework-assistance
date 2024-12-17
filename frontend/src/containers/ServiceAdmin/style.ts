import { Button } from "@cgi-learning-hub/ui";
import { SxProps, styled } from "@mui/material";

import { DayButtonProps } from "./types";
import {
  columnBoxStyle,
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";

export const ServiceAdminWrapper: SxProps = {
  ...columnBoxStyle,
  justifyContent: "space-between",
  boxSizing: "border-box",
  height: "100%",
  padding: "4rem 6rem",
  gap: "2rem",
};

export const titleText = {
  fontWeight: "700",
  fontSize: "1.6rem",
  lineHeight: "1.8rem",
  color: "text.secondary",
};

export const subItemWrapper = {
  ...columnBoxStyle,
  gap: "1rem",
};

export const closingPeriodsMap = {
  ...columnBoxStyle,
  height: "10.7rem",
  maxHeight: "10.7rem",
  width: "40rem",
  maxWidth: "40rem",
  gap: ".5rem",
  overflowY: "auto",
  padding: ".5rem",
  "&::-webkit-scrollbar": {
    width: "0.8rem",
    height: "0.8rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(170,170,170,1)",
    borderRadius: "0.3rem",
  },
};

export const exclusionItemWrapper = {
  ...spaceBetweenBoxStyle,
  flexWrap: "wrap",
  boxSizing: "border-box",
};

export const weekButtonWrapper = {
  ...flexStartBoxStyle,
  flexWrap: "wrap",
  gap: "1rem",
};

export const DayButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isDayOpen",
})<DayButtonProps>(({ theme, isDayOpen }) => ({
  backgroundColor: isDayOpen
    ? theme.palette.primary.main
    : theme.palette.grey[400],
  color: isDayOpen ? "white" : theme.palette.grey[800],
  minWidth: "4.8rem",
  width: "4.8rem",
  height: "4.8rem",
  padding: "0",
  fontSize: "1.6rem",
  boxSizing: "border-box",
  borderRadius: "5px",
  textTransform: "none",
  border: `1px solid ${
    isDayOpen ? theme.palette.primary.main : theme.palette.grey[400]
  }`,
  transition: theme.transitions.create(
    ["background-color", "border-color", "box-shadow"],
    {
      duration: theme.transitions.duration.short,
    },
  ),
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: isDayOpen
      ? theme.palette.primary.main
      : theme.palette.grey[400],
    border: `1px solid ${
      isDayOpen ? theme.palette.primary.main : theme.palette.grey[400]
    }`,
  },
}));

export const hoursInputsWrapper = {
  ...flexStartBoxStyle,
  width: "fit-content",
  gap: "6rem",
  "@media (max-width: 800px)": {
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },
};

export const hoursInputItem = {
  ...flexStartBoxStyle,
  gap: "2rem",
};

export const deletePeriodButton = {
  color: "grey.400",
  border: "none",
  fontSize: "1.6rem",
  textTransform: "none",
  "&.MuiButton-root": {
    border: "none",
  },
};

export const addPeriodButton = {
  width: "fit-content",
  color: "primary.main",
  border: "none",
  fontSize: "1.6rem",
  textTransform: "none",
  "&.MuiButton-root": {
    border: "none",
  },
};

export const basicTypoNoWrap = { ...basicTypo, textWrap: "nowrap" };
