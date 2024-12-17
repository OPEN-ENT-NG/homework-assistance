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
  Service,
  StudentInputValueKeys,
  StudentInputValueState,
  TimeExclusionState,
} from "./types";
import {
  createCallbackPayload,
  createConfigPayload,
  defineRight,
  initialDisplayModals,
  initialOpeningDaysInputvalue,
  initialOpeningTimeInputValue,
  initialPreviewInputvalue,
  initialStudentInputvalue,
  initialTimeExclusion,
  isTimeRangeValid,
} from "./utils";
import {
  MODAL_TYPE,
  OPENING_DAYS,
  PREVIEW_INPUTS,
  STUDENT_INPUTS,
  TIME_SCOPE,
  TIME_UNIT,
  USER_RIGHT,
} from "~/core/enums";
import {
  useCreateCallbackMutation,
  useGetServicesQuery,
} from "~/services/api/callBackApi";
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
  const [updateConfig, { isLoading }] = useUpdateConfigMutation();
  const [openingDaysInputValue, setOpeningDaysInputValue] =
    useState<OpeningDaysInputValueState>(initialOpeningDaysInputvalue);
  const [openingTimeInputValue, setOpeningTimeInputValue] =
    useState<OpeningTimeInputValueState>(initialOpeningTimeInputValue);
  const [displayModals, setDisplayModals] =
    useState<DisplayModalsState>(initialDisplayModals);
  const [services, setServices] = useState<Service[]>([]);
  const [studentInputValue, setStudentInputValue] =
    useState<StudentInputValueState>(initialStudentInputvalue);
  const [timeExclusions, setTimeExclusions] =
    useState<TimeExclusionState>(initialTimeExclusion);
  const { data: configData } = useGetConfigQuery();
  const { data: servicesData } = useGetServicesQuery();
  const [createCallback] = useCreateCallbackMutation();
  const userNameAndClass = `${user?.lastName} ${user?.firstName} (${user?.classNames[0]})`;

  useEffect(() => {
    if (configData) {
      setPreviewInputValue(configData.messages);
      setOpeningDaysInputValue(configData.settings.opening_days);
      setOpeningTimeInputValue(configData.settings.opening_time);
      setExclusionValues(configData.settings.exclusions);
      setTimeExclusions({
        exclusions: configData.settings.exclusions,
        openingDays: configData.settings.opening_days,
        openingTime: configData.settings.opening_time,
      });
    }
  }, [configData]);

  useEffect(() => {
    if (servicesData) {
      const transformedServices = Object.entries(servicesData).map(
        ([key, value]) => ({
          name: key,
          value: value,
        }),
      );
      setServices(transformedServices);
      setStudentInputValue((prev) => ({
        ...prev,
        [STUDENT_INPUTS.SERVICE]: transformedServices[0],
      }));
    }
  }, [servicesData]);

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
  const handleStudentInputChange = <K extends StudentInputValueKeys>(
    key: K,
    value: StudentInputValueState[K],
  ) => {
    setStudentInputValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleModal = (modalType: MODAL_TYPE) => {
    setDisplayModals((prev) => ({
      ...prev,
      [modalType]: !prev[modalType],
    }));
  };

  const handleSubmit = async (exclusion?: Exclusion, isDeleting?: boolean) => {
    if (!isTimeRangeValid(openingTimeInputValue) || !isAdmin) {
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

  const handleStudentSubmit = async () => {
    const phone = studentInputValue[STUDENT_INPUTS.PHONE];
    const isPhoneValid =
      phone.length >= 10 && (phone.startsWith("0") || phone.startsWith("+33"));

    if (!isPhoneValid || !user) {
      return;
    }
    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      school: user.structureNames[0],
      className: user.classNames[0],
    };
    const payload = createCallbackPayload(studentInputValue, userData);
    try {
      await createCallback(payload).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoading) return;
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
      studentInputValue,
      handleStudentInputChange,
      exclusionValues,
      timeExclusions,
      handleSubmit,
      handleStudentSubmit,
      services,
      userNameAndClass,
    }),
    [
      userRight,
      isAdmin,
      previewInputValue,
      openingDaysInputValue,
      openingTimeInputValue,
      displayModals,
      exclusionValues,
      services,
      studentInputValue,
      timeExclusions,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
