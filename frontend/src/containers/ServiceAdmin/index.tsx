import { FC } from "react";

import { Box, Typography, Button } from "@cgi-learning-hub/ui";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { exclusions } from "./mock";
import {
  closingPeriodsMap,
  DayButton,
  exclusionItemWrapper,
  hoursInputItem,
  hoursInputsWrapper,
  ServiceAdminWrapper,
  subItemWrapper,
  titleText,
  weekButtonWrapper,
} from "./style";
import { useTimeSelector, useWeekDaysButtonsConfig } from "./utils";
import { MODAL_TYPE } from "../../core/enums";
import { TimeSelector } from "~/components/TimeSelector";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { TIME_SCOPE } from "~/core/enums";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const ServiceAdmin: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const { toggleModal } = useGlobal();
  const weekDaysButtonConfig = useWeekDaysButtonsConfig();
  const startTimeProps = useTimeSelector(TIME_SCOPE.START);
  const endTimeProps = useTimeSelector(TIME_SCOPE.END);

  return (
    <Box sx={ServiceAdminWrapper}>
      <Typography sx={titleText}>{t("admin.title")}</Typography>
      <Box sx={subItemWrapper}>
        <Typography sx={basicTypo}>{t("admin.period.title")}</Typography>
        <Box sx={closingPeriodsMap}>
          {exclusions.map((item) => (
            <Box key={uuidv4()} sx={exclusionItemWrapper}>
              <Typography sx={basicTypo}>
                {t("admin.period.from") +
                  item.start +
                  t("admin.period.to") +
                  item.end}
              </Typography>
              <Button
                startIcon={<DeleteIcon />}
                sx={{
                  color: "grey.400",
                  border: "none",
                  fontSize: "1.6rem",
                  textTransform: "none",
                  "&.MuiButton-root": {
                    border: "none",
                  },
                }}
              >
                {t("admin.delete")}
              </Button>
            </Box>
          ))}
        </Box>
        <Button
          startIcon={<AddCircleIcon />}
          onClick={() => toggleModal(MODAL_TYPE.ADD_CLOSTING_PERIOD)}
          sx={{
            width: "fit-content",
            color: "primary.main",
            border: "none",
            fontSize: "1.6rem",
            textTransform: "none",
            "&.MuiButton-root": {
              border: "none",
            },
          }}
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
            <Typography sx={{ ...basicTypo, textWrap: "nowrap" }}>
              {t("admin.availabilityHours.from")}
            </Typography>
            <TimeSelector
              hour={startTimeProps.hour}
              minute={startTimeProps.minute}
            />
          </Box>
          <Box sx={hoursInputItem}>
            <Typography sx={{ ...basicTypo, textWrap: "nowrap" }}>
              {t("admin.availabilityHours.to")}
            </Typography>
            <TimeSelector
              hour={endTimeProps.hour}
              minute={endTimeProps.minute}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
