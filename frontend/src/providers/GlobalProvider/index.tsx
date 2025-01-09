import {
  ChangeEvent,
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useOdeClient } from "@edifice-ui/react";
import { SelectChangeEvent } from "@mui/material";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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
  initialTimeExclusion,
  isTimeRangeValid,
  useInitialStudentInputvalue,
} from "./utils";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
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
import { useGetResourcesQuery } from "~/services/api/resourcesApi";
import { FeaturedResource } from "~/services/api/resourcesApi/types";

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
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  const { data: configData } = useGetConfigQuery();
  const { data: servicesData } = useGetServicesQuery();
  const { data: resourcesData } = useGetResourcesQuery();
  const [createCallback] = useCreateCallbackMutation();
  const [updateConfig, { isLoading }] = useUpdateConfigMutation();
  const isFromRefetch = useRef(false);

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
  const [services, setServices] = useState<Service[]>([]);
  const [timeExclusions, setTimeExclusions] =
    useState<TimeExclusionState>(initialTimeExclusion);
  const initialStudentInputValue = useInitialStudentInputvalue(timeExclusions);
  const [studentInputValue, setStudentInputValue] =
    useState<StudentInputValueState>(initialStudentInputValue);
  const [resources, setResources] = useState<FeaturedResource[]>([]);

  const lastBackendState = useRef({
    openingDays: initialOpeningDaysInputvalue,
    openingTime: initialOpeningTimeInputValue,
    messages: initialPreviewInputvalue,
    exclusions: [] as ExclusionValuesState,
  });

  const userRight = defineRight(user);
  const isAdmin = userRight === USER_RIGHT.ADMIN;
  const userNameAndClass = `${user?.lastName} ${user?.firstName} (${user?.classNames[0]?.split(
    "$",
  )[1]})`;

  useEffect(() => {
    setStudentInputValue(initialStudentInputValue);
  }, [initialStudentInputValue]);

  useEffect(() => {
    if (resourcesData) {
      setResources(resourcesData);
    }
  }, [resourcesData]);

  useEffect(() => {
    if (configData) {
      isFromRefetch.current = true;

      lastBackendState.current = {
        openingDays: configData.settings.opening_days,
        openingTime: configData.settings.opening_time,
        messages: configData.messages,
        exclusions: configData.settings.exclusions,
      };

      setPreviewInputValue(configData.messages);
      setOpeningDaysInputValue(configData.settings.opening_days);
      setOpeningTimeInputValue(configData.settings.opening_time);
      setExclusionValues(configData.settings.exclusions);
      setTimeExclusions({
        exclusions: configData.settings.exclusions,
        openingDays: configData.settings.opening_days,
        openingTime: configData.settings.opening_time,
      });

      setTimeout(() => {
        isFromRefetch.current = false;
      }, 0);
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

  useEffect(() => {
    if (isLoading || isFromRefetch.current) return;
    void handleSubmit();
  }, [openingDaysInputValue, openingTimeInputValue]);

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

  const hasStateChanged = (newExclusions: ExclusionValuesState) => {
    const hasOpeningDaysChanged = !_.isEqual(
      openingDaysInputValue,
      lastBackendState.current.openingDays,
    );
    const hasOpeningTimeChanged = !_.isEqual(
      openingTimeInputValue,
      lastBackendState.current.openingTime,
    );
    const hasMessagesChanged = !_.isEqual(
      previewInputValue,
      lastBackendState.current.messages,
    );
    const hasExclusionsChanged = !_.isEqual(
      newExclusions,
      lastBackendState.current.exclusions,
    );

    return (
      hasOpeningDaysChanged ||
      hasOpeningTimeChanged ||
      hasMessagesChanged ||
      hasExclusionsChanged
    );
  };

  const handleSubmit = async (exclusion?: Exclusion, isDeleting?: boolean) => {
    if (!isAdmin) return;
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

    if (!hasStateChanged(newExclusions)) {
      return;
    }

    const payload = createConfigPayload(
      previewInputValue,
      openingDaysInputValue,
      openingTimeInputValue,
      newExclusions,
    );

    try {
      isFromRefetch.current = true;
      await updateConfig(payload).unwrap();

      lastBackendState.current = {
        openingDays: openingDaysInputValue,
        openingTime: openingTimeInputValue,
        messages: previewInputValue,
        exclusions: newExclusions,
      };

      toast.success(t("admin.save"));
    } catch (error) {
      toast.error(t("admin.error.postConfig"));
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
      toast.success(t("student.send"));
    } catch (error) {
      toast.error(t("student.error.sendForm"));
      console.error(error);
    }
  };

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
      resources,
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
      resources,
    ],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
