import dayjs from "dayjs";
import { IUserInfo } from "edifice-ts-client";

import {
  DisplayModalsState,
  ExclusionValuesState,
  OpeningDaysInputValueState,
  OpeningTimeInputValueState,
  PreviewInputvalueState,
  StudentInputValueState,
} from "./types";
import { DATE_FORMAT } from "~/core/const";
import {
  MODAL_TYPE,
  OPENING_DAYS,
  PREVIEW_INPUTS,
  STUDENT_INPUTS,
  TIME_SCOPE,
  TIME_UNIT,
  USER_ACTIONS,
  USER_RIGHT,
} from "~/core/enums";
import { CallbackPayload } from "~/services/api/callBackApi/types";
import { ConfigPayload } from "~/services/api/configApi/types";

export const initialPreviewInputvalue = Object.values(PREVIEW_INPUTS).reduce(
  (acc, key) => ({
    ...acc,
    [key]: "",
  }),
  {} as PreviewInputvalueState,
);
export const initialOpeningDaysInputvalue = Object.values(OPENING_DAYS).reduce(
  (acc, key) => ({
    ...acc,
    [key]: false,
  }),
  {} as OpeningDaysInputValueState,
);

export const initialDisplayModals = Object.values(MODAL_TYPE).reduce(
  (acc, key) => ({
    ...acc,
    [key]: false,
  }),
  {} as DisplayModalsState,
);

export const initialOpeningTimeInputValue: OpeningTimeInputValueState = {
  [TIME_SCOPE.START]: {
    [TIME_UNIT.HOUR]: "08",
    [TIME_UNIT.MINUTE]: "00",
  },
  [TIME_SCOPE.END]: {
    [TIME_UNIT.HOUR]: "23",
    [TIME_UNIT.MINUTE]: "00",
  },
};
const today = dayjs().format(DATE_FORMAT);

export const initialStudentInputvalue: StudentInputValueState = {
  [STUDENT_INPUTS.SERVICE]: null,
  [STUDENT_INPUTS.SCHEDULED_DATE]: today,
  [STUDENT_INPUTS.SCHEDULED_TIME]: {
    [TIME_UNIT.HOUR]: "08",
    [TIME_UNIT.MINUTE]: "00",
  },
  [STUDENT_INPUTS.PHONE]: "",
  [STUDENT_INPUTS.INFOS]: "",
};

const findRight = (user: IUserInfo, userAction: USER_ACTIONS) =>
  user.authorizedActions.find((item) => item.name === (userAction as string));

export const defineRight = (user: IUserInfo | undefined) => {
  if (!user) return null;

  const admingRight = findRight(user, USER_ACTIONS.ADMIN);
  const studentRight = findRight(user, USER_ACTIONS.STUDENT);

  if (admingRight) return USER_RIGHT.ADMIN;
  if (studentRight) return USER_RIGHT.STUDENT;

  return null;
};

export const isTimeRangeValid = (
  timeRange: OpeningTimeInputValueState,
): boolean => {
  const startMinutes =
    parseInt(timeRange[TIME_SCOPE.START][TIME_UNIT.HOUR]) * 60 +
    parseInt(timeRange[TIME_SCOPE.START][TIME_UNIT.MINUTE]);

  const endMinutes =
    parseInt(timeRange[TIME_SCOPE.END][TIME_UNIT.HOUR]) * 60 +
    parseInt(timeRange[TIME_SCOPE.END][TIME_UNIT.MINUTE]);

  return endMinutes > startMinutes;
};

export const createConfigPayload = (
  preview: PreviewInputvalueState,
  openingDays: OpeningDaysInputValueState,
  openingTime: OpeningTimeInputValueState,
  exclusions: ExclusionValuesState,
): ConfigPayload => {
  return {
    id: null,
    messages: preview,
    settings: {
      exclusions: exclusions,
      opening_days: openingDays,
      opening_time: openingTime,
    },
  };
};

export const createCallbackPayload = (
  studentInputValue: StudentInputValueState,
  userData: {
    firstName: string;
    lastName: string;
    school: string;
    className: string;
  },
): CallbackPayload => {
  const formattedDate = dayjs(
    studentInputValue[STUDENT_INPUTS.SCHEDULED_DATE],
    "DD/MM/YYYY",
  ).format("YYYY-MM-DDT00:00:00[Z]");

  return {
    [STUDENT_INPUTS.PHONE]: studentInputValue[STUDENT_INPUTS.PHONE],
    [STUDENT_INPUTS.SCHEDULED_DATE]: formattedDate,
    [STUDENT_INPUTS.SCHEDULED_TIME]: {
      hour: studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.HOUR],
      minute: Number(
        studentInputValue[STUDENT_INPUTS.SCHEDULED_TIME][TIME_UNIT.MINUTE],
      ),
    },
    userdata: {
      prenom: userData.firstName,
      nom: userData.lastName,
      etablissement: userData.school,
      classe: userData.className,
      matiere: studentInputValue[STUDENT_INPUTS.SERVICE]?.name || "",
      service: studentInputValue[STUDENT_INPUTS.SERVICE]?.value || 0,
    },
    [STUDENT_INPUTS.INFOS]: studentInputValue[STUDENT_INPUTS.INFOS] || null,
  };
};
