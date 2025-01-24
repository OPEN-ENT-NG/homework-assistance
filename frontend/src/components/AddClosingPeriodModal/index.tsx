import { FC, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@cgi-learning-hub/ui";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { DATE_FORMAT, HOMEWORK_ASSISTANCE } from "~/core/const";
import { MODAL_TYPE, TIME_SCOPE } from "~/core/enums";
import { flexStartBoxStyle } from "~/core/style/boxStyles";
import { ModalProps } from "~/core/types/types";
import { useGlobal } from "~/providers/GlobalProvider";
import { Exclusion } from "~/providers/GlobalProvider/types";

import { cancelButtonStyle, validateButtonStyle, dateTextStyle } from "./style";
import { checkForOverlap, initalExclusion } from "./utils";
import { CustomDatePicker } from "../CustomDatePicker";
import { DayScopeErrorModal } from "../DayScopeErrorModal";

export const AddClosingPeriodModal: FC<ModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const {
    handleSubmit,
    exclusionValues,
    toggleModal,
    displayModals: { DAY_SCOPE_ERROR },
  } = useGlobal();
  const [exclusion, setExclusion] = useState<Exclusion>(initalExclusion);
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);

  const handleCancel = () => {
    setExclusion(initalExclusion);
    handleClose();
  };

  const handleExclusionSubmit = () => {
    if (!exclusion) return;
    if (checkForOverlap(exclusion, exclusionValues))
      return toggleModal(MODAL_TYPE.DAY_SCOPE_ERROR);
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
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      showCloseButton
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>{t("admin.add")}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
        </Box>
        {DAY_SCOPE_ERROR && (
          <DayScopeErrorModal
            isOpen={DAY_SCOPE_ERROR}
            handleClose={() => toggleModal(MODAL_TYPE.DAY_SCOPE_ERROR)}
          />
        )}
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </Dialog>
  );
};
