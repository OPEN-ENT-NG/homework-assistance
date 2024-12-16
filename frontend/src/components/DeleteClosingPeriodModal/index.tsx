import { FC } from "react";

import { Box, Typography, Button, IconButton } from "@cgi-learning-hub/ui";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";

import {
  bottomButtonWrapper,
  cancelButton,
  closeIconButtonStyle,
  deleteButton,
  deleteClosingPeriodModalWrapper,
  modalTitle,
} from "./style";
import { DeleteClosingPeriodModalProps } from "./types";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { spaceBetweenBoxStyle } from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const DeleteClosingPeriodModal: FC<DeleteClosingPeriodModalProps> = ({
  isOpen,
  handleClose,
  closingPeriod,
}) => {
  const { handleSubmit } = useGlobal();
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  const handleDeleteSubmit = async () => {
    try {
      await handleSubmit(closingPeriod, true);
      handleClose();
    } catch (error) {
      console.error("Failed to delete closing period:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={deleteClosingPeriodModalWrapper}>
        <Box sx={spaceBetweenBoxStyle}>
          <Typography sx={modalTitle}>{t("admin.period.delete")}</Typography>
          <IconButton onClick={handleClose} sx={closeIconButtonStyle}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Typography sx={basicTypo}>
          {t("admin.confirm.delete.period", {
            startDate: closingPeriod.start,
            endDate: closingPeriod.end,
          })}
        </Typography>
        <Box sx={bottomButtonWrapper}>
          <Button
            variant="text"
            sx={cancelButton}
            onClick={() => handleClose()}
          >
            {t("admin.cancel")}
          </Button>
          <Button
            variant="contained"
            sx={deleteButton}
            onClick={() => void handleDeleteSubmit()}
          >
            {t("admin.delete")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
