/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react";

import { ThemeProvider } from "@cgi-learning-hub/theme";
import {
  OdeClientProvider,
  ThemeProvider as ThemeProviderEdifice,
} from "@edifice-ui/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "~/i18n";

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

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <OdeClientProvider
        params={{
          app: "homework-assistance",
        }}
      >
        <ThemeProviderEdifice>
          <ThemeProvider themeId="crna">
            <RouterProvider router={router} />
          </ThemeProvider>
        </ThemeProviderEdifice>
      </OdeClientProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
