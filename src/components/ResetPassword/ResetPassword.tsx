import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography
} from "@mui/material";
import { makeValidate, makeRequired, showErrorOnBlur } from "mui-rff";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import PasswordChecklist from "react-password-checklist";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  LoginBox,
  LoginButton,
  LoginErrorHelperText,
  LoginHeader,
  LoginTextField
} from "../LoginComponents/LoginComponents.style";
import { ResetPasswordSchema } from "../../schema/ResetPasswordSchema";
import { ResetPasswordInterface } from "../../interfaces/ResetPasswordInterface";
import { useAuth } from "../../providers/Auth";
import { TabTitle } from "../../utils/GeneralFunctions";
// import { useAuth } from "../../providers/Auth";

/**
 * Uses the optional helper makeValidate function to format the error messages
 * into something usable by final form.
 */
const validate = makeValidate(ResetPasswordSchema, error => {
  return <span className="error">{i18n.t(error.message)}</span>;
});
/**
 * Grabs all the required fields from the schema so that they can be passed into
 * the components without having to declare them in both the schema and the component.
 */
const required = makeRequired(ResetPasswordSchema);

const ResetPassword = ({ email }) => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  TabTitle(t("resetPassword.block1.header.page-title"));
  // const { forgotPasswordSubmit } = useAuth();

  const [submittedValues, setSubmittedValues] = useState<
    ResetPasswordInterface | undefined
  >(undefined);

  const initialValues: ResetPasswordInterface = {
    verificationCode: "",
    newPassword: "",
    confirmPassword: ""
  };

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });

  const onSubmit = async (values: ResetPasswordInterface) => {
    setSubmittedValues(values);
    // const data: any = await forgotPasswordSubmit(
    //   email,
    //   values.verificationCode,
    //   values.newPassword
    // );

    // if (data.status === "FAIL" || data.error) {
    //   return { [FORM_ERROR]: "resetPassword.block-form.resetError" };
    // } else {
    //   navigate("/login", {
    //     state: {
    //       showAlert: true,
    //       severity: "success",
    //       message: "resetPassword.header.page-success-alert"
    //     }
    //   });
    // }
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
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
            {t("resetPassword.block1.header.page-title")}
          </LoginHeader>
          <Typography component="p" variant="lead">
            {t("resetPassword.block1.header.short-intro", { email: email })}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Form
            onSubmit={onSubmit}
            initialValues={submittedValues ? submittedValues : initialValues}
            validate={validate}
            render={({ submitError, handleSubmit, submitting, values }) => (
              <form
                onSubmit={handleSubmit}
                noValidate={true}
                autoComplete="new-password"
              >
                <LoginTextField
                  required={required.verificationCode}
                  type="text"
                  label={t("verificationCode.block-form.input.code")}
                  id="verificationCode"
                  name="verificationCode"
                  variant="filled"
                  autoComplete="current-password"
                  showError={showErrorOnBlur}
                  InputProps={{
                    disableUnderline: true
                  }}
                />
                <LoginTextField
                  required={required.newPassword}
                  type={
                    showPassword && showPassword.newPassword
                      ? "text"
                      : "password"
                  }
                  label={t("resetPassword.block-form.input.newPassword")}
                  id="newPassword"
                  name="newPassword"
                  variant="filled"
                  showError={() => {
                    return;
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword && showPassword.newPassword
                              ? t("all.button.password-icon-show")
                              : t("all.button.password-icon-hide")
                          }
                          onClick={() =>
                            setShowPassword(prevState => ({
                              ...prevState,
                              newPassword: !prevState.newPassword
                            }))
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          component="button"
                        >
                          {showPassword && showPassword.newPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Typography
                  component="p"
                  variant="h4"
                  sx={{ mb: theme => theme.spacer_n }}
                >
                  {t("resetPassword.block-form.text.newPassword")}:
                </Typography>
                <Box sx={{ mb: theme => theme.spacer_n }}>
                  <PasswordChecklist
                    rules={[
                      "minLength",
                      "specialChar",
                      "number",
                      "capital",
                      "lowercase"
                    ]}
                    minLength={12}
                    value={
                      values && values.newPassword ? values.newPassword : ""
                    }
                    valueAgain={
                      values && values.confirmPassword
                        ? values.confirmPassword
                        : ""
                    }
                    invalidColor="#E10993"
                    validColor="#E10993"
                    messages={{
                      minLength: t(
                        "resetPassword.block-form.error.password-characters-minimum"
                      ),
                      specialChar: t(
                        "resetPassword.block-form.error.password-special-character-minimum"
                      ),
                      number: t(
                        "resetPassword.block-form.error.password-number-minimum"
                      ),
                      capital: t(
                        "resetPassword.block-form.error.password-uppercase-minimum"
                      ),
                      lowercase: t(
                        "resetPassword.block-form.error.password-lowercase-minimum"
                      )
                    }}
                  />
                </Box>
                <LoginTextField
                  required={required.confirmPassword}
                  type={
                    showPassword && showPassword.confirmPassword
                      ? "text"
                      : "password"
                  }
                  label={t("resetPassword.block-form.input.confirmPassword")}
                  id="confirmPassword"
                  name="confirmPassword"
                  variant="filled"
                  showError={showErrorOnBlur}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword && showPassword.confirmPassword
                              ? t("all.button.password-icon-show")
                              : t("all.button.password-icon-hide")
                          }
                          onClick={() =>
                            setShowPassword(prevState => ({
                              ...prevState,
                              confirmPassword: !prevState.confirmPassword
                            }))
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          component="button"
                        >
                          {showPassword && showPassword.confirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
                  sx={{
                    mr: theme => theme.spacer_m,
                    mb: theme => theme.spacer_m
                  }}
                  disableElevation
                >
                  {t("resetPassword.block-form.button.submit")}
                </LoginButton>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </LoginBox>
  );
};

export default ResetPassword;
