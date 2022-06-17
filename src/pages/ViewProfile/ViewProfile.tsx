import React from "react";
import {
  AccordionDetails,
  Alert,
  Box,
  Grid,
  Link,
  Paper,
  Typography
} from "@mui/material";
import {
  SmallTextTypo,
  LargeTextTypo,
  ItemHeader,
  FooterBox
} from "./ViewProfile.style";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { TabTitle } from "../../utils/GeneralFunctions";
import { useCustomer } from "../../providers/CustomerProvider";
import { AlertStateInterface } from "../../interfaces/AlertStateInterface";

const ViewProfile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as AlertStateInterface;
  TabTitle(t("view-profile.block1.header.page-title"));
  const { mainCustomerData, customerData } = useCustomer();
  const accountNumber =
    (customerData.length > 0 &&
      customerData[0].accountNumber &&
      customerData[0].accountNumber.split(";")) ||
    [];
  const mobileNumber =
    (customerData.length > 0 &&
      customerData[0].mobile &&
      customerData[0].mobile
        .replace("+1", "") // remove country code +1
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")) ||
    "";

  return (
    <>
      {state?.showAlert && (
        <Alert
          severity={
            state.severity === "success"
              ? "success"
              : state.severity === "error"
              ? "error"
              : state.severity === "info"
              ? "info"
              : "warning"
          }
        >
          {t(state.message)}
        </Alert>
      )}
      <Box sx={{ mx: theme => theme.spacer_m }}>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ textAlign: "left" }}>
              <Typography component="h3" variant="h3">
                {t("view-profile.block1.header.page-title")}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Box pt={3}>
          <Paper variant="section" sx={{ padding: 0 }}>
            <ItemHeader>
              <Typography component="h2" variant="sectionTitle">
                {customerData.length > 0 &&
                  `${customerData[0].firstName} ${customerData[0].lastName}`}
              </Typography>
            </ItemHeader>
            <AccordionDetails>
              <Box pt={5}>
                <Grid container spacing={4}>
                  <Grid item md={2} sx={{ textAlign: "left" }}>
                    <SmallTextTypo>
                      {t("view-profile.block1.form.input-company")}
                    </SmallTextTypo>
                    <LargeTextTypo>
                      {mainCustomerData && mainCustomerData.Name}
                    </LargeTextTypo>
                  </Grid>
                  <Grid item md={2} sx={{ textAlign: "left" }}>
                    <SmallTextTypo>
                      {t("view-profile.block1.form.input-mobile")}
                    </SmallTextTypo>
                    <LargeTextTypo>
                      {customerData.length > 0 && mobileNumber}
                    </LargeTextTypo>
                  </Grid>
                  <Grid item md={4} sx={{ textAlign: "left" }}>
                    <SmallTextTypo>
                      {t("view-profile.block1.form.input-email")}
                    </SmallTextTypo>
                    <LargeTextTypo style={{ wordWrap: "break-word" }}>
                      {customerData.length > 0 && customerData[0].emailId}
                    </LargeTextTypo>
                  </Grid>
                  <Grid item md={4} sx={{ textAlign: "left" }}>
                    <SmallTextTypo>
                      {t("view-profile.block1.form.input-billing-address")}
                    </SmallTextTypo>
                    <LargeTextTypo>
                      {customerData.length > 0 &&
                        `${customerData[0].mailingStreet}, ${customerData[0].mailingCity}, ${customerData[0].mailingState} ${customerData[0].mailingPostalCode}, ${customerData[0].mailingCountry}`}
                    </LargeTextTypo>
                  </Grid>
                </Grid>
                <Grid
                  item
                  md={12}
                  sx={{ textAlign: "left", padding: "3rem 0 0 0" }}
                >
                  <SmallTextTypo>
                    {t("view-profile.block1.form.input-account-number")}
                  </SmallTextTypo>
                  {accountNumber.length > 0 &&
                    accountNumber.map(accountNum => (
                      <LargeTextTypo key={accountNum}>
                        {accountNum}
                      </LargeTextTypo>
                    ))}
                </Grid>
                <Grid item md={12} sx={{ textAlign: "left" }}></Grid>
              </Box>
            </AccordionDetails>
            <FooterBox>
              <Link href="./change-password">
                {t("view-profile.block1.form.button-resetPassword")}
              </Link>
            </FooterBox>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ViewProfile;
