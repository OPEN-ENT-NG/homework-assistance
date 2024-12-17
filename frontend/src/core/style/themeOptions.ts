import { ThemeOptions } from "@cgi-learning-hub/ui";

export const themeOptions: ThemeOptions = {
  components: {
    MuiDialogTitle: {
      styleOverrides: {
        root: () => ({
          fontSize: "2rem",
          lineHeight: "3.2rem",
          fontWeight: 700,
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
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.6rem",
          lineHeight: "1.6rem",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: "1.6rem",
          lineHeight: "2rem",
        },
      },
    },
  },
};
