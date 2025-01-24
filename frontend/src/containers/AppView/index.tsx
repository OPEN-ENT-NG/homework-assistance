import { FC, useEffect } from "react";

import { Box, Loader } from "@cgi-learning-hub/ui";
import { GlobalStyles } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AddClosingPeriodModal } from "~/components/AddClosingPeriodModal";
import { TimeScopeErrorModal } from "~/components/TimeScopeErrorModal";
import { HOMEWORK_ASSISTANCE } from "~/core/const";
import { MODAL_TYPE } from "~/core/enums";
import { AppLayout } from "~/layouts/AppLayout";
import { useGlobal } from "~/providers/GlobalProvider";

import { globalStyle, loaderWrapper } from "./style";
import { useAppContainers } from "./utils";

export const AppView: FC = () => {
  const {
    userRight,
    displayModals: { TIME_SCOPE_ERROR, ADD_CLOSING_PERIOD },
    toggleModal,
  } = useGlobal();
  const appContainers = useAppContainers();

  const { t } = useTranslation(HOMEWORK_ASSISTANCE);
  useEffect(() => {
    const checkTitle = () => {
      if (document.title !== t("homework-assistance.title")) {
        document.title = t("homework-assistance.title");
      }
    };
    const intervalId = setInterval(checkTitle, 250);
    return () => clearInterval(intervalId);
  }, [t]);

  return (
    <>
      <GlobalStyles styles={globalStyle} />
      {userRight ? (
        <>
          <AppLayout items={appContainers} />
          <TimeScopeErrorModal
            isOpen={TIME_SCOPE_ERROR}
            handleClose={() => toggleModal(MODAL_TYPE.TIME_SCOPE_ERROR)}
          />
          <AddClosingPeriodModal
            isOpen={ADD_CLOSING_PERIOD}
            handleClose={() => toggleModal(MODAL_TYPE.ADD_CLOSTING_PERIOD)}
          />
        </>
      ) : (
        <Box sx={loaderWrapper}>
          <Loader />
        </Box>
      )}
    </>
  );
};
