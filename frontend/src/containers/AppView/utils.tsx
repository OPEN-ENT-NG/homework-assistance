import { useMemo } from "react";

import { useGlobal } from "~/providers/GlobalProvider";

import { Preview } from "../Preview";
import { ResourcesAndLink } from "../ResourcesAndLink";
import { ServiceAdmin } from "../ServiceAdmin";
import { ServiceStudent } from "../ServiceStudent";

export const useAppContainers = () => {
  const { isAdmin } = useGlobal();

  return useMemo(
    () => ({
      firstItem: <Preview />,
      secondItem: isAdmin ? <ServiceAdmin /> : <ServiceStudent />,
      thirdItem: <ResourcesAndLink />,
    }),
    [isAdmin],
  );
};
