import { FC } from "react";

import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@cgi-learning-hub/ui";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import {
  formControlStyle,
  serviceStudentWrapper,
  subItemStyle,
  userNameStyle,
  rdvWrapperStyle,
  rdvItemStyle,
  phoneFieldStyle,
  validateStudentButtonStyle,
} from "./style";
import { useStudentTime } from "./utils";
import { basicTypoNoWrap } from "../ServiceAdmin/style";
import { CustomDatePicker } from "~/components/CustomDatePicker";
import { TimeSelector } from "~/components/TimeSelector";
import { DATE_FORMAT, HOMEWORK_ASSISTANCE } from "~/core/const";
import { STUDENT_INPUTS } from "~/core/enums";
import { flexEndBoxStyle } from "~/core/style/boxStyles";
import { basicTypo } from "~/core/style/style";
import { useGlobal } from "~/providers/GlobalProvider";

export const ServiceStudent: FC = () => {
  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  const {
    services,
    userNameAndClass,
    studentInputValue,
    handleStudentInputChange,
    handleStudentSubmit,
  } = useGlobal();
  const { timeProps } = useStudentTime();
  const phone = studentInputValue[STUDENT_INPUTS.PHONE];
  const isPhoneValid =
    phone.length >= 10 && (phone.startsWith("0") || phone.startsWith("+33"));

  const handleServiceChange = (event: SelectChangeEvent) => {
    const selected = services.find(
      (service) => service.value === Number(event.target.value),
    );
    handleStudentInputChange(STUDENT_INPUTS.SERVICE, selected ?? null);
  };

  const handleDateChange = () => (date: dayjs.Dayjs | null) => {
    if (!date) return;
    handleStudentInputChange(
      STUDENT_INPUTS.SCHEDULED_DATE,
      date.format(DATE_FORMAT),
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9+ ]*$/.test(value)) {
      const cleanValue = value.replace(/\s/g, "");
      handleStudentInputChange(STUDENT_INPUTS.PHONE, cleanValue);
    }
  };

  return (
    <Box sx={serviceStudentWrapper}>
      <Box sx={subItemStyle}>
        <Typography sx={basicTypo}>{t("student.title")}</Typography>
        <Typography sx={userNameStyle}>{userNameAndClass}</Typography>
      </Box>
      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel>{t("student.subject")}</InputLabel>
        <Select
          value={studentInputValue.service?.value?.toString() ?? ""}
          label={t("student.subject")}
          onChange={handleServiceChange}
        >
          {services.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={subItemStyle}>
        <Typography sx={basicTypo}>{`${t("student.rdv.title")} :`}</Typography>
        <Box sx={rdvWrapperStyle}>
          <Box sx={rdvItemStyle}>
            <Typography sx={basicTypoNoWrap}>{`${t(
              "student.rdv.day",
            )} :`}</Typography>
            <CustomDatePicker
              value={dayjs(studentInputValue.scheduled_date, DATE_FORMAT)}
              onChange={handleDateChange()}
            />
          </Box>
          <Box sx={rdvItemStyle}>
            <Typography sx={basicTypoNoWrap}>{`${t(
              "student.rdv.from",
            )} :`}</Typography>
            <TimeSelector hour={timeProps.hour} minute={timeProps.minute} />
          </Box>
        </Box>
      </Box>
      <Box sx={subItemStyle}>
        <Typography sx={basicTypo}>{t("student.tel")}</Typography>
        <TextField
          sx={phoneFieldStyle}
          variant="standard"
          value={studentInputValue[STUDENT_INPUTS.PHONE]}
          onChange={handlePhoneChange}
          placeholder="+33 (0)6..."
          type="tel"
          error={!isPhoneValid && !!studentInputValue[STUDENT_INPUTS.PHONE]}
          inputProps={{
            maxLength: 15,
          }}
        />
      </Box>
      <Box sx={subItemStyle}>
        <Typography sx={basicTypo}>{t("student.otherInformations")}</Typography>
        <TextField
          variant="standard"
          value={studentInputValue[STUDENT_INPUTS.INFOS]}
          onChange={(e) =>
            handleStudentInputChange(STUDENT_INPUTS.INFOS, e.target.value)
          }
          minRows={3}
          placeholder="Informations complémentaires..."
        />
      </Box>
      <Box sx={flexEndBoxStyle}>
        <Button
          variant="contained"
          sx={validateStudentButtonStyle}
          onClick={() => void handleStudentSubmit()}
          disabled={!isPhoneValid}
        >
          {t("student.validate")}
        </Button>
      </Box>
    </Box>
  );
};
