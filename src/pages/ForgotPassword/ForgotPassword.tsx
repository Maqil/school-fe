import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeValidate, makeRequired } from "mui-rff";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import {
  FormWrapperdiv,
  LoginBox,
  LoginButton,
  LoginErrorHelperText,
  LoginHeader,
  LoginTextField
} from "../../components/LoginComponents/LoginComponents.style";
import { ForgotPasswordSchema } from "../../schema/ForgotPasswordSchema";
import { ForgotPasswordInterface } from "../../interfaces/ForgotPasswordInterface";
import { useAuth } from "../../providers/Auth";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import { TabTitle } from "../../utils/GeneralFunctions";
/**
 * Uses the optional helper makeValidate function to format the error messages
 * into something usable by final form.
 */
const validate = makeValidate(ForgotPasswordSchema, error => {
  return <span className="error">{i18n.t(error.message)}</span>;
});
/**
 * Grabs all the required fields from the schema so that they can be passed into
 * the components without having to declare them in both the schema and the component.
 */
const required = makeRequired(ForgotPasswordSchema);

const ForgotPassword = () => {

  const { t } = useTranslation();
  TabTitle(t("forgotPassword.block1.header.page-title"));
  // const { forgotPassword } = useAuth();
  const [submittedValues, setSubmittedValues] = useState<
    ForgotPasswordInterface | undefined
  >(undefined);

  const initialValues: ForgotPasswordInterface = {
    email: ""
  };

  const [showResetPassword, setShowResetPassword] = useState(false);

  const onSubmit = async (values: ForgotPasswordInterface) => {
    setSubmittedValues(values);
    // const submit: any = await forgotPassword(values.email);
    // if (submit.status === "FAIL" || submit.error) {
    //   return { [FORM_ERROR]: "forgotPassword.block-form.loginError" };
    // } else {
    //   setShowResetPassword(true);
    // }
  };

  return (
    <>
      {!showResetPassword && (
        <LoginBox>
          <Grid container sx={{ pt: 0 }}>
            <Grid item xs={12} sm={6}>
              <LoginHeader
                component="h1"
                variant="display2"
                color="fuchsiaAccessible.main"
              >
                {t("forgotPassword.block1.header.page-title")}
              </LoginHeader>
              <Typography component="p" variant="lead">
                {t("forgotPassword.block1.header.short-intro")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Form
                onSubmit={onSubmit}
                initialValues={
                  submittedValues ? submittedValues : initialValues
                }
                validate={validate}
                render={({ submitError, handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <LoginTextField
                      required={required.email}
                      label={t("forgotPassword.block-form.input.email")}
                      id="email"
                      name="email"
                      variant="filled"
                      autoComplete="email"
                      InputProps={{ disableUnderline: true }}
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
                    <FormWrapperdiv>
                      <LoginButton
                        variant="contained"
                        type="submit"
                        disabled={submitting}
                        size="large"
                        sx={{ mr: theme => theme.spacer_m }}
                        disableElevation
                      >
                        {t("forgotPassword.block-form.button.submit")}
                      </LoginButton>
                      <Typography
                        className="btn-back-login"
                        component={Link}
                        to="/login"
                        variant="body1"
                        color="fuchsiaAccessible.main"
                      >
                        {t("all.block-form.button.link")}
                      </Typography>
                    </FormWrapperdiv>
                  </form>
                )}
              />
            </Grid>
          </Grid>
        </LoginBox>
      )}
      {showResetPassword && submittedValues && (
        <ResetPassword email={submittedValues.email} />
      )}
    </>
  );
};

export default ForgotPassword;
