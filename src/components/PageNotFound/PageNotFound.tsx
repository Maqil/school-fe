import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { TabTitle } from "../../utils/GeneralFunctions";
function PageNotFound() {
  const { t } = useTranslation();
  TabTitle(t("pageNotFound.header.title.text"));
  return (
    <Typography component="p" variant="lead">
      {t("pageNotFound.header.title.text")}
    </Typography>
  );
}

export default PageNotFound;
