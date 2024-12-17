import { ID } from "edifice-ts-client";

export interface AppProps {
  _id: string;
  created: Date;
  description: string;
  map: string;
  modified: Date;
  name: string;
  owner: { userId: ID; displayName: string };
  shared: any[];
  thumbnail: string;
}

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
