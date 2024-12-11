import { ChangeEvent, ReactNode } from "react";

export interface EditableAreaProps {
  icon?: ReactNode | null;
  width?: string;
  height?: string;
  isEditable: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export interface TextAreaWrapperProps {
  width: string | number;
  height: string | number;
}
