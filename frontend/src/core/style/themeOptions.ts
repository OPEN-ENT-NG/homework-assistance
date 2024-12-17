import { ThemeOptions } from "@cgi-learning-hub/ui";

export const themeOptions: ThemeOptions = {
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "2rem",
          lineHeight: "3.2rem",
          fontWeight: 700,
          color: theme.palette.secondary.main,
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "3rem",
          "& .MuiSvgIcon-root": {
            fontSize: "inherit",
          },
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
        },
      },
    },
  },
};
