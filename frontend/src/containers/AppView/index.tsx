import { FC } from "react";

import { Box, Loader } from "@cgi-learning-hub/ui";
import { GlobalStyles } from "@mui/material";

import { globalStyle, loaderWrapper } from "./style";
import { useAppContainers } from "./utils";
import { AppLayout } from "~/layouts/AppLayout";
import { useGlobal } from "~/providers/GlobalProvider";

export const AppView: FC = () => {
  const { userRight } = useGlobal();
  const appContainers = useAppContainers();
  return (
    <>
      <GlobalStyles styles={globalStyle} />
      {userRight ? (
        <AppLayout items={appContainers} />
      ) : (
        <Box sx={loaderWrapper}>
          <Loader />
        </Box>
      )}
    </>
  );
};
