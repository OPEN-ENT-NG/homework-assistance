import {
  ChangeEvent,
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useOdeClient } from "@edifice-ui/react";
import { SelectChangeEvent } from "@mui/material";

import {
  DisplayModalsState,
  ExclusionValuesState,
  GlobalContextType,
  GlobalProviderProps,
  OpeningDaysInputValueState,
  OpeningTimeInputValueState,
  PreviewInputvalueState,
} from "./types";
import {
  defineRight,
  initialDisplayModals,
  initialOpeningDaysInputvalue,
  initialOpeningTimeInputValue,
  initialPreviewInputvalue,
  isTimeRangeValid,
} from "./utils";
import {
  MODAL_TYPE,
  OPENING_DAYS,
  PREVIEW_INPUTS,
  TIME_SCOPE,
  TIME_UNIT,
  USER_RIGHT,
} from "~/core/enums";

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
  const [exclusionValues, setExclusionValues] = useState<ExclusionValuesState>(
    [],
  );
  const [openingDaysInputValue, setOpeningDaysInputValue] =
    useState<OpeningDaysInputValueState>(initialOpeningDaysInputvalue);
  const [openingTimeInputValue, setOpeningTimeInputValue] =
    useState<OpeningTimeInputValueState>(initialOpeningTimeInputValue);
  const [displayModals, setDisplayModals] =
    useState<DisplayModalsState>(initialDisplayModals);

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
  const handleOpeningTimeInputChange =
    (firstField: TIME_SCOPE, secondField: TIME_UNIT) =>
    (event: SelectChangeEvent<string>) => {
      setOpeningTimeInputValue((prev) => ({
        ...prev,
        [firstField]: {
          ...prev[firstField],
          [secondField]: event.target.value,
        },
      }));
    };
  const toggleModal = (modalType: MODAL_TYPE) => {
    setDisplayModals((prev) => ({
      ...prev,
      [modalType]: !prev[modalType],
    }));
  };

  const handleSubmit = () => {
    if (!isTimeRangeValid(openingTimeInputValue))
      return toggleModal(MODAL_TYPE.TIME_SCOPE_ERROR);
  };

  useEffect(() => {
    handleSubmit();
  }, [previewInputValue, openingDaysInputValue, openingTimeInputValue]);
  console.log(displayModals.TIME_SCOPE_ERROR);

  const value = useMemo<GlobalContextType>(
    () => ({
      userRight,
      isAdmin,
      previewInputValue,
      handlePreviewInputChange,
      openingDaysInputValue,
      handleOpeningDaysInputChange,
      openingTimeInputValue,
      handleOpeningTimeInputChange,
      displayModals,
      toggleModal,
    }),
    [
      userRight,
      isAdmin,
      previewInputValue,
      openingDaysInputValue,
      openingTimeInputValue,
      displayModals,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
