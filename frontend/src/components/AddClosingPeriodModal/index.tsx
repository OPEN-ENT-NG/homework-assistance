import { FC, useState } from "react";

import { Box, Typography, Button, IconButton } from "@cgi-learning-hub/ui";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import {
  addClosingPeriodModalWrapper,
  bottomButtonWrapper,
  closeIconButtonStyle,
  modalTitle,
  cancelButtonStyle,
  validateButtonStyle,
  dateTextStyle,
} from "./style";
import { initalExclusion } from "./utils";
import { CustomDatePicker } from "../CustomDatePicker";
import { DATE_FORMAT, HOMEWORK_ASSISTANCE } from "~/core/const";
import { TIME_SCOPE } from "~/core/enums";
import {
  flexStartBoxStyle,
  spaceBetweenBoxStyle,
} from "~/core/style/boxStyles";
import { ModalProps } from "~/core/types/types";
import { useGlobal } from "~/providers/GlobalProvider";
import { Exclusion } from "~/providers/GlobalProvider/types";

export const AddClosingPeriodModal: FC<ModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { handleSubmit } = useGlobal();
  const [exclusion, setExclusion] = useState<Exclusion>(initalExclusion);
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  const handleCancel = () => {
    setExclusion(initalExclusion);
    handleClose();
  };

  const handleExclusionSubmit = () => {
    if (!exclusion) return;
    void handleSubmit(exclusion);
    handleCancel();
  };

  const handleDateChange = (type: TIME_SCOPE) => (date: dayjs.Dayjs | null) => {
    if (!date) return;

    setExclusion((prev) => {
      const formattedDate = date.format(DATE_FORMAT);
      const newExclusion: Exclusion = {
        start: formattedDate,
        end: formattedDate,
      };

      if (type === TIME_SCOPE.START) {
        const startDate = dayjs(formattedDate, DATE_FORMAT);

        if (prev?.end) {
          const endDate = dayjs(prev.end, DATE_FORMAT);
          return {
            start: formattedDate,
            end: startDate.isAfter(endDate) ? formattedDate : prev.end,
          };
        }

        return newExclusion;
      }

      return {
        start: prev?.start ?? formattedDate,
        end: formattedDate,
      };
    });
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
        <Box sx={flexStartBoxStyle}>
          <Typography sx={dateTextStyle}>{t("admin.date.begin")}</Typography>
          <CustomDatePicker
            value={dayjs(exclusion.start, DATE_FORMAT)}
            onChange={handleDateChange(TIME_SCOPE.START)}
          />
        </Box>
        <Box sx={flexStartBoxStyle}>
          <Typography sx={dateTextStyle}>{t("admin.date.end")}</Typography>
          <CustomDatePicker
            value={dayjs(exclusion.end, DATE_FORMAT)}
            onChange={handleDateChange(TIME_SCOPE.END)}
            minDate={
              exclusion?.start
                ? dayjs(exclusion.start, DATE_FORMAT)
                : dayjs().startOf("day")
            }
          />
        </Box>
        <Box sx={bottomButtonWrapper}>
          <Button
            variant="text"
            sx={cancelButtonStyle}
            onClick={() => handleCancel()}
          >
            {t("admin.cancel")}
          </Button>
          <Button
            variant="contained"
            sx={validateButtonStyle}
            onClick={handleExclusionSubmit}
          >
            {t("admin.validate")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
