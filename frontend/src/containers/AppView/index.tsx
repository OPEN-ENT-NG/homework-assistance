import { FC } from "react";

import { Box, Loader } from "@cgi-learning-hub/ui";
import { GlobalStyles } from "@mui/material";

import { globalStyle, loaderWrapper } from "./style";
import { useAppContainers } from "./utils";
import { TimeScopeErrorModal } from "~/components/TimeScopeErrorModal";
import { MODAL_TYPE } from "~/core/enums";
import { AppLayout } from "~/layouts/AppLayout";
import { useGlobal } from "~/providers/GlobalProvider";
import { AddClosingPeriodModal } from "~/components/AddClosingPeriod";

export const AppView: FC = () => {
  const {
    userRight,
    displayModals: { TIME_SCOPE_ERROR, ADD_CLOSING_PERIOD },
    toggleModal,
  } = useGlobal();
  const appContainers = useAppContainers();
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
