import { createHashRouter } from "react-router-dom";

import Root from "~/app/root";
import ErrorPage from "~/components/PageError";
import "~/styles/index.scss";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        async lazy() {
          const { App } = await import("./app");
          return {
            Component: App,
          };
        },
      },
    ],
  },
];

export const router = createHashRouter(routes);
