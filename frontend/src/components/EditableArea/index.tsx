import { FC, useRef, useState } from "react";

import { Box, IconButton } from "@cgi-learning-hub/ui";
import EditIcon from "@mui/icons-material/Edit";

import {
  iconButtonStyle,
  iconWrapper,
  StyledTextField,
  TextAreaWrapper,
} from "./style";
import { EditableAreaProps } from "./types";

export const EditableArea: FC<EditableAreaProps> = ({
  width = "100%",
  height = "auto",
  isEditable = false,
  value,
  onChange,
  onSubmit,
  icon = null,
  isSmall = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitAndBlur = async () => {
    try {
      await onSubmit();
      setIsFocused(false);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget?.closest("button")) {
      return;
    }
    void handleSubmitAndBlur();
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isFocused) {
      void handleSubmitAndBlur();
      inputRef.current?.blur();
    } else {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  };

  return (
    <TextAreaWrapper width={width} height={height}>
      {icon && <Box sx={iconWrapper}>{icon}</Box>}
      <StyledTextField
        isSmall={isSmall}
        multiline
        value={value}
        onChange={onChange}
        disabled={!isEditable}
        isEditable={isEditable}
        inputRef={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      {isEditable && (
        <IconButton onClick={handleIconClick}>
          <EditIcon sx={iconButtonStyle} />
        </IconButton>
      )}
    </TextAreaWrapper>
  );
};
