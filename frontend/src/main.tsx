/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";

import { ThemeProvider } from "@cgi-learning-hub/theme";
import { EdificeClientProvider, EdificeThemeProvider } from "@edifice.io/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "~/i18n";

import "@edifice.io/bootstrap/dist/index.css";
import "dayjs/locale/fr";
import { themeOptions } from "./core/style/themeOptions";
import { GlobalProvider } from "./providers/GlobalProvider";
import { router } from "./routes";
import { setupStore } from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

if (process.env.NODE_ENV !== "production") {
  import("@axe-core/react").then((axe) => {
    axe.default(React, root, 1000);
  });
}

const store = setupStore();

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error === "0090") window.location.replace("/auth/login");
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

dayjs.locale("fr");

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <EdificeClientProvider
        params={{
          app: "Aide aux devoirs",
        }}
      >
        <EdificeThemeProvider>
          <ThemeProvider themeId="crna" options={themeOptions}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <GlobalProvider>
                <ToastContainer
                  position="top-right"
                  autoClose={4000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <RouterProvider router={router} />
              </GlobalProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </EdificeThemeProvider>
      </EdificeClientProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
