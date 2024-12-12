import {
  ChangeEvent,
  FC,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { useOdeClient } from "@edifice-ui/react";

import {
  GlobalContextType,
  GlobalProviderProps,
  OpeningDaysInputValueState,
  PreviewInputvalueState,
} from "./types";
import {
  defineRight,
  initialOpeningDaysInputvalue,
  initialPreviewInputvalue,
} from "./utils";
import { OPENING_DAYS, PREVIEW_INPUTS, USER_RIGHT } from "~/core/enums";

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
  const [previewInputValue, setPreviewInputValue] =
    useState<PreviewInputvalueState>(initialPreviewInputvalue);
  const [openingDaysInputValue, setOpeningDaysInputValue] =
    useState<OpeningDaysInputValueState>(initialOpeningDaysInputvalue);

  const isAdmin = userRight === USER_RIGHT.ADMIN;

  const handlePreviewInputChange =
    (field: PREVIEW_INPUTS) => (event: ChangeEvent<HTMLInputElement>) => {
      setPreviewInputValue((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleOpeningDaysInputChange = (field: OPENING_DAYS) => {
    setOpeningDaysInputValue((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const value = useMemo<GlobalContextType>(
    () => ({
      userRight,
      isAdmin,
      previewInputValue,
      handlePreviewInputChange,
      openingDaysInputValue,
      handleOpeningDaysInputChange
    }),
    [userRight, isAdmin, previewInputValue,openingDaysInputValue],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
