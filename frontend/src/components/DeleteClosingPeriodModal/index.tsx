import { FC } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { useGlobal } from "~/providers/GlobalProvider";

import { cancelButton, deleteButton } from "./style";
import { DeleteClosingPeriodModalProps } from "./types";

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
    <Dialog open={isOpen} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>{t("admin.period.delete")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("admin.period.delete.confirm", {
            startDate: closingPeriod.start,
            endDate: closingPeriod.end,
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" sx={cancelButton} onClick={() => handleClose()}>
          {t("admin.cancel")}
        </Button>
        <Button
          variant="contained"
          sx={deleteButton}
          onClick={() => void handleDeleteSubmit()}
        >
          {t("admin.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
