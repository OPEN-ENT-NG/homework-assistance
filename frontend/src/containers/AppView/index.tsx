import { FC } from "react";

import { appContainers } from "./utils";
import { AppLayout } from "~/layouts/AppLayout";

export const AppView: FC = () => {
  return <AppLayout items={appContainers} />;
};
