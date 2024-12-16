import { FC, useState } from "react";

import { Box, Typography, Button, IconButton } from "@cgi-learning-hub/ui";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  addClosingPeriodModalWrapper,
  bottomButtonWrapper,
  closeIconButtonStyle,
  modalTitle,
} from "./style";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import {
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/core/style/boxStyles";
import { ModalProps } from "~/core/types/types";
import { Exclusion } from "~/providers/GlobalProvider/types";
import { basicTypo } from "~/core/style/style";
import { CustomDatePicker } from "../CustomDatePicker";

export const AddClosingPeriodModal: FC<ModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [exclusion, setExclusion] = useState<Exclusion | null>(null);
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  const handleCancel = () => {
    setExclusion(null), handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <Box sx={addClosingPeriodModalWrapper}>
        <Box sx={spaceBetweenBoxStyle}>
          <Typography sx={modalTitle}>{t("admin.add")}</Typography>
          <IconButton onClick={handleCancel} sx={closeIconButtonStyle}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box sx={{ ...flexStartBoxStyle }}>
          <Typography sx={{ ...basicTypo, width: "20rem" }}>
            {t("admin.date.begin")}
          </Typography>
          <CustomDatePicker/>
        </Box>
        <Box sx={{ ...flexStartBoxStyle }}>
          <Typography sx={{ ...basicTypo, width: "20rem" }}>
            {t("admin.date.end")}
          </Typography>
          <CustomDatePicker />
        </Box>
        <Box sx={bottomButtonWrapper}>
          <Button
            variant="text"
            sx={{ fontSize: "1.6rem", width: "9rem", border: "none" }}
            onClick={() => handleCancel()}
          >
            {t("admin.cancel")}
          </Button>
          <Button
            variant="contained"
            sx={{ fontSize: "1.6rem", width: "9rem" }}
            onClick={() => handleCancel()}
          >
            {t("admin.validate")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
