import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeValidate, makeRequired, showErrorOnBlur } from "mui-rff";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import {
  LoginBox,
  LoginButton,
  LoginErrorHelperText,
  LoginHeader,
  LoginTextField
} from "../../components/LoginComponents/LoginComponents.style";
import { VerificationCodeSchema } from "../../schema/VerificationCodeSchema";

import { VerificationCodeInterface } from "../../interfaces/VerificationCodeInterface";
import { useAuth } from "../../providers/Auth";
import { TabTitle } from "../../utils/GeneralFunctions";
/**
 * Uses the optional helper makeValidate function to format the error messages
 * into something usable by final form.
 */
const validate = makeValidate(VerificationCodeSchema, error => {
  return <span className="error">{i18n.t(error.message)}</span>;
});
/**
 * Grabs all the required fields from the schema so that they can be passed into
 * the components without having to declare them in both the schema and the component.
 */
const required = makeRequired(VerificationCodeSchema);

const VerificationCode = ({ user }) => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  TabTitle(t("verificationCode.block1.header.page-title"));
  // const { confirmSignIn } = useAuth();
  const [submittedValues, setSubmittedValues] = useState<
    VerificationCodeInterface | undefined
  >(undefined);

  const initialValues: VerificationCodeInterface = {
    verificationCode: ""
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const onSubmit = async (values: VerificationCodeInterface) => {
    setSubmittedValues(values);

    // const data: any = await confirmSignIn(user, values.verificationCode);
    // if (data.status === "FAIL" || data.error) {
    //   return { [FORM_ERROR]: "verificationCode.block-form.loginError" };
    // } else {
    //   navigate("/shipments-dashboard");
    // }
  };

  return (
    <LoginBox>
      <Grid container sx={{ pt: 0 }}>
        <Grid item xs={12} sm={6}>
          <LoginHeader
            component="h1"
            variant="display2"
            color="fuchsiaAccessible.main"
          >
            {t("verificationCode.block1.header.page-title")}
          </LoginHeader>
          <Typography component="p" variant="lead">
            {user.challengeName === "SMS_MFA"
              ? t("verificationCode.block1.header.short-intro-sms", {
                  sms: user.challengeParam.CODE_DELIVERY_DESTINATION
                })
              : user.challengeParam === "CUSTOM_CHALLENGE"
              ? t("verificationCode.block1.header.short-intro-email", {
                  email: user.challengeParam?.CODE_DELIVERY_DESTINATION
                })
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Form
            onSubmit={onSubmit}
            initialValues={submittedValues ? submittedValues : initialValues}
            validate={validate}
            render={({ submitError, handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit}>
                <LoginTextField
                  required={required.verificationCode}
                  label={t("verificationCode.block-form.input.code")}
                  id="verificationCode"
                  name="verificationCode"
                  variant="filled"
                  showError={showErrorOnBlur}
                  InputProps={{ disableUnderline: true }}
                  autoComplete="off"
                />
                {submitError && (
                  <LoginErrorHelperText
                    variant="filled"
                    filled
                    required
                    component="p"
                  >
                    <span className="error">{t(submitError)}</span>
                  </LoginErrorHelperText>
                )}
                <LoginButton
                  variant="contained"
                  type="submit"
                  disabled={submitting}
                  size="large"
                  sx={{ mr: theme => theme.spacer_m }}
                  disableElevation
                >
                  {t("verificationCode.block-form.button.submit")}
                </LoginButton>
                <Typography
                  component={Link}
                  to="/login"
                  variant="body1"
                  color="fuchsiaAccessible.main"
                  onClick={refreshPage}
                >
                  {t("all.block-form.button.link")}
                </Typography>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </LoginBox>
  );
};

export default VerificationCode;
