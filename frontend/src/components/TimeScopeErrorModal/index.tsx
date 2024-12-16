import { FC } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@cgi-learning-hub/ui";
import { useTranslation } from "react-i18next";

import { cancelButtonStyle } from "./style";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { ModalProps } from "~/core/types/types";

export const TimeScopeErrorModal: FC<ModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogContent>
        <DialogContentText>
          {t("admin.error.adminReverseTime")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={cancelButtonStyle}
          onClick={() => handleClose()}
        >
          {t("admin.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
