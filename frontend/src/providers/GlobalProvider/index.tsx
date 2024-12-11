import { FC, createContext, useContext, useMemo } from "react";

import { useOdeClient } from "@edifice-ui/react";

import { GlobalContextType, GlobalProviderProps } from "./types";
import { defineRight } from "./utils";
import { USER_RIGHT } from "~/core/enums";

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const { user } = useOdeClient();
  const userRight = defineRight(user);
  const isAdmin = userRight === USER_RIGHT.ADMIN;

  const value = useMemo<GlobalContextType>(
    () => ({
      userRight,
      isAdmin,
    }),
    [userRight, isAdmin],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
