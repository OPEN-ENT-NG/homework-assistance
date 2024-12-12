import { useMemo } from "react";

import { Preview } from "../Preview";
import { ServiceAdmin } from "../ServiceAdmin";
import { useGlobal } from "~/providers/GlobalProvider";

export const useAppContainers = () => {
  const { isAdmin } = useGlobal();

  return useMemo(
    () => ({
      firstItem: <Preview />,
      secondItem: isAdmin ? <ServiceAdmin /> : "item2",
      thirdItem: "item3",
    }),
    [isAdmin],
  );
};
