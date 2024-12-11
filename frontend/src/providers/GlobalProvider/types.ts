import { ReactNode } from "react";

export interface GlobalProviderProps {
  children: ReactNode;
}

export type GlobalContextType = {
  yes: boolean;
};
