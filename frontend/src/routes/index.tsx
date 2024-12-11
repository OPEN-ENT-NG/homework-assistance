import { createHashRouter } from "react-router-dom";

import Root from "~/app/root";
import { PageError } from "~/components/PageError";

import "~/styles/index.scss";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <PageError />,
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
