import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ConfirmationBox, ConfirmationHeader, HomeButton } from "./Confirmation.style";
import { useNavigate } from "react-router-dom";
import { TabTitle } from "../../utils/GeneralFunctions";

const Confirmation = () => {
  const { t } = useTranslation();
  TabTitle(t("confirmation.meta.header.browser-tab-title"));
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/shipments-dashboard");
  };
  return (
    <ConfirmationBox>
      <Grid container sx={{ pt: 0 }}>
        <Grid item xs={12} sm={12}>
          <ConfirmationHeader
            component="h1"
            color="fuchsiaAccessible.main"
          >
            {t("confirmation.header.page-title")}
          </ConfirmationHeader>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography 
            component="p" 
            variant="lead"
          >
            {t("confirmation.text.page-description")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <HomeButton
            onClick={returnHome}
            variant="contained"
            type="submit"
            size="large"
            sx={{ mr: theme => theme.spacer_m }}
            disableElevation
          >
            {t("confirmation.button.label")}
          </HomeButton>
        </Grid>
      </Grid>
    </ConfirmationBox>
  );
};

export default Confirmation;
