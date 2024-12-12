import { IUserInfo } from "edifice-ts-client";

import { OpeningDaysInputValueState, PreviewInputvalueState } from "./types";
import {
  OPENING_DAYS,
  PREVIEW_INPUTS,
  USER_ACTIONS,
  USER_RIGHT,
} from "~/core/enums";

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
