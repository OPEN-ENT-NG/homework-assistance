import { FC } from "react";

import { Box, Typography, Button } from "@cgi-learning-hub/ui";
import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";

import { timeScopeErrorModalWrapper } from "./style";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { flexEndBoxStyle } from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";
import { ModalProps } from "~/core/types/types";

export const TimeScopeErrorModal: FC<ModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={timeScopeErrorModalWrapper}>
        <Typography sx={basicTypo}>
          {t("admin.error.adminReverseTime")}
        </Typography>
        <Box sx={flexEndBoxStyle}>
          <Button
            variant="contained"
            sx={{ fontSize: "1.6rem", width: "9rem" }}
            onClick={() => handleClose()}
          >
            {t("admin.close")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
