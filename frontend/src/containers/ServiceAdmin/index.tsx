import { FC, useState } from "react";

import { Box, Typography, Button } from "@cgi-learning-hub/ui";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { DeleteClosingPeriodModal } from "~/components/DeleteClosingPeriodModal";
import { TimeSelector } from "~/components/TimeSelector";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { TIME_SCOPE } from "~/core/enums";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";
import { Exclusion } from "~/providers/GlobalProvider/types";
import { isTimeRangeValid } from "~/providers/GlobalProvider/utils";

import {
  addPeriodButton,
  basicTypoNoWrap,
  closingPeriodsMap,
  DayButton,
  deletePeriodButton,
  exclusionItemWrapper,
  hoursInputItem,
  hoursInputsWrapper,
  ServiceAdminWrapper,
  subItemWrapper,
  titleText,
  weekButtonWrapper,
} from "./style";
import {
  sortExclusionsByStartDate,
  useTimeSelector,
  useWeekDaysButtonsConfig,
} from "./utils";
import { MODAL_TYPE } from "../../core/enums";

export const ServiceAdmin: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const {
    toggleModal,
    exclusionValues,
    displayModals: { DELETE_CLOSING_PERIOD },
    openingTimeInputValue,
  } = useGlobal();
  const weekDaysButtonConfig = useWeekDaysButtonsConfig();
  const [selectedPeriod, setSelectedPeriod] = useState<Exclusion | null>(null);
  const startTimeProps = useTimeSelector(TIME_SCOPE.START);
  const endTimeProps = useTimeSelector(TIME_SCOPE.END);
  const sortedExclusions = sortExclusionsByStartDate(exclusionValues);

  const toggleDeleteModal = (item?: Exclusion) => {
    toggleModal(MODAL_TYPE.DELETE_CLOSING_PERIOD);
    setSelectedPeriod(item ?? null);
  };

  return (
    <Box sx={ServiceAdminWrapper}>
      <Typography sx={titleText}>{t("admin.title")}</Typography>
      <Box sx={subItemWrapper}>
        <Typography sx={basicTypo}>{t("admin.period.title")}</Typography>
        <Box sx={closingPeriodsMap}>
          {sortedExclusions.length ? (
            sortedExclusions.map((item) => (
              <Box key={uuidv4()} sx={exclusionItemWrapper}>
                <Typography sx={basicTypo}>
                  {t("admin.period.from") +
                    item.start +
                    t("admin.period.to") +
                    item.end}
                </Typography>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => toggleDeleteModal(item)}
                  sx={deletePeriodButton}
                >
                  {t("admin.delete")}
                </Button>
              </Box>
            ))
          ) : (
            <Typography
              sx={{ ...basicTypo, color: "text.disabled", fontStyle: "italic" }}
            >
              {t("admin.period.placeholder")}
            </Typography>
          )}
        </Box>
        <Button
          startIcon={<AddCircleIcon />}
          onClick={() => toggleModal(MODAL_TYPE.ADD_CLOSTING_PERIOD)}
          sx={addPeriodButton}
        >
          {t("admin.add")}
        </Button>
      </Box>
      <Box sx={subItemWrapper}>
        <Typography sx={basicTypo}>{t("admin.availabilityDays")}</Typography>
        <Box sx={weekButtonWrapper}>
          {weekDaysButtonConfig.map((item) => (
            <DayButton
              key={item.day}
              isDayOpen={item.isDayOpen}
              onClick={item.onClick}
            >
              {item.label}
            </DayButton>
          ))}
        </Box>
      </Box>
      <Box sx={subItemWrapper}>
        <Typography sx={basicTypo}>
          {t("admin.availabilityHours.title")}
        </Typography>
        <Box sx={hoursInputsWrapper}>
          <Box sx={hoursInputItem}>
            <Typography sx={basicTypoNoWrap}>
              {t("admin.availabilityHours.from")}
            </Typography>
            <TimeSelector
              hour={startTimeProps.hour}
              minute={startTimeProps.minute}
              error={!isTimeRangeValid(openingTimeInputValue)}
            />
          </Box>
          <Box sx={hoursInputItem}>
            <Typography sx={basicTypoNoWrap}>
              {t("admin.availabilityHours.to")}
            </Typography>
            <TimeSelector
              hour={endTimeProps.hour}
              minute={endTimeProps.minute}
              error={!isTimeRangeValid(openingTimeInputValue)}
            />
          </Box>
        </Box>
      </Box>
      {DELETE_CLOSING_PERIOD && selectedPeriod && (
        <DeleteClosingPeriodModal
          isOpen={DELETE_CLOSING_PERIOD && !!selectedPeriod}
          handleClose={() => toggleDeleteModal()}
          closingPeriod={selectedPeriod}
        />
      )}
    </Box>
  );
};
