import { ReactNode } from "react";

import { USER_RIGHT } from "~/core/enums";

export interface GlobalProviderProps {
  children: ReactNode;
}

export type GlobalContextType = {
  userRight: USER_RIGHT | null;
  isAdmin: boolean;
};
