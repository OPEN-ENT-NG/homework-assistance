import { FC, createContext, useContext, useMemo, useState } from "react";

import { GlobalContextType, GlobalProviderProps } from "./types";

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [yes, setYes] = useState<boolean>(false);

  const value = useMemo<GlobalContextType>(
    () => ({
      yes,
    }),
    [yes],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
