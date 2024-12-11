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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (e: React.FocusEvent) => {
    if (e.relatedTarget?.closest("button")) {
      return;
    }
    setIsFocused(false);
    onSubmit();
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFocused) {
      setIsFocused(false);
      onSubmit();
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <TextAreaWrapper width={width} height={height}>
      {icon && <Box sx={iconWrapper}>{icon}</Box>}
      <StyledTextField
        multiline
        fullWidth
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
