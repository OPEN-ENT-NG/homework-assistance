import { FC } from "react";

import { Box, Typography, Button } from "@cgi-learning-hub/ui";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { exclusions } from "./mock";
import {
  basicTypo,
  closingPeriodsMap,
  DayButton,
  exclusionItemWrapper,
  ServiceAdminWrapper,
  subItemWrapper,
  titleText,
  weekButtonWrapper,
} from "./style";
import { useWeekDaysButtonsConfig } from "./utils";
import { HOMEWORK_ASSISTANCE } from "~/core/const";

export const ServiceAdmin: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const weekDaysButtonConfig = useWeekDaysButtonsConfig();

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
    </Box>
  );
};
