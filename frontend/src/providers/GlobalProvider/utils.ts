import { IUserInfo } from "edifice-ts-client";

import { USER_ACTIONS, USER_RIGHT } from "~/core/enums";

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
