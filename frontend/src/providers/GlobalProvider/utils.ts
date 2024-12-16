import { IUserInfo } from "edifice-ts-client";

import {
  DisplayModalsState,
  ExclusionValuesState,
  OpeningDaysInputValueState,
  OpeningTimeInputValueState,
  PreviewInputvalueState,
} from "./types";
import {
  MODAL_TYPE,
  OPENING_DAYS,
  PREVIEW_INPUTS,
  TIME_SCOPE,
  TIME_UNIT,
  USER_ACTIONS,
  USER_RIGHT,
} from "~/core/enums";
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
