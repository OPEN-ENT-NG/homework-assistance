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
  Exclusion,
  ExclusionValuesState,
  GlobalContextType,
  GlobalProviderProps,
  OpeningDaysInputValueState,
  OpeningTimeInputValueState,
  PreviewInputvalueState,
} from "./types";
import {
  createConfigPayload,
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
import {
  useGetConfigQuery,
  useUpdateConfigMutation,
} from "~/services/api/configApi";

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
  const [updateConfig] = useUpdateConfigMutation();
  const [openingDaysInputValue, setOpeningDaysInputValue] =
    useState<OpeningDaysInputValueState>(initialOpeningDaysInputvalue);
  const [openingTimeInputValue, setOpeningTimeInputValue] =
    useState<OpeningTimeInputValueState>(initialOpeningTimeInputValue);
  const [displayModals, setDisplayModals] =
    useState<DisplayModalsState>(initialDisplayModals);
  const { data: configData } = useGetConfigQuery();

  useEffect(() => {
    if (configData) {
      setPreviewInputValue(configData.messages);
      setOpeningDaysInputValue(configData.settings.opening_days);
      setOpeningTimeInputValue(configData.settings.opening_time);
      setExclusionValues(configData.settings.exclusions);
    }
  }, [configData]);

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

  const handleSubmit = async (exclusion?: Exclusion, isDeleting?: boolean) => {
    if (!isTimeRangeValid(openingTimeInputValue)) {
      return toggleModal(MODAL_TYPE.TIME_SCOPE_ERROR);
    }

    const filteredExclusions =
      exclusion && isDeleting
        ? exclusionValues.filter(
            (item) =>
              !(item.start === exclusion.start && item.end === exclusion.end),
          )
        : exclusionValues;

    const newExclusions =
      exclusion && !isDeleting
        ? [...exclusionValues, exclusion]
        : filteredExclusions;

    const payload = createConfigPayload(
      previewInputValue,
      openingDaysInputValue,
      openingTimeInputValue,
      newExclusions,
    );

    try {
      await updateConfig(payload).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void handleSubmit();
  }, [openingDaysInputValue, openingTimeInputValue]);

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
      exclusionValues,
      handleSubmit,
    }),
    [
      userRight,
      isAdmin,
      previewInputValue,
      openingDaysInputValue,
      openingTimeInputValue,
      displayModals,
      exclusionValues,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
