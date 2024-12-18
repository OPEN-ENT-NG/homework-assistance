import { useMemo } from "react";

import { Preview } from "../Preview";
import { RessourcesAndLink } from "../RessouresAndLink";
import { ServiceAdmin } from "../ServiceAdmin";
import { ServiceStudent } from "../ServiceStudent";
import { useGlobal } from "~/providers/GlobalProvider";

export const useAppContainers = () => {
  const { isAdmin } = useGlobal();

  return useMemo(
    () => ({
      firstItem: <Preview />,
      secondItem: isAdmin ? <ServiceAdmin /> : <ServiceStudent />,
      thirdItem: <RessourcesAndLink />,
    }),
    [isAdmin],
  );
};
