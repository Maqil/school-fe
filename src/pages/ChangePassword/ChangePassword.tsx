import React, { useState } from "react";
import {
  Box,
  Button,
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
  FormFieldsWrapperdiv,
  LoginBox,
  LoginErrorHelperText,
  LoginHeader,
  LoginTextField
} from "../../components/LoginComponents/LoginComponents.style";
import { ChangePasswordSchema } from "../../schema/ChangePasswordSchema";
import { ChangePasswordInterface } from "../../interfaces/ChangePaswordInterface";
import { useAuth } from "../../providers/Auth";
import { TabTitle } from "../../utils/GeneralFunctions";
/**
 * Uses the optional helper makeValidate function to format the error messages
 * into something usable by final form.
 */
const validate = makeValidate(ChangePasswordSchema, error => {
  return <span className="error">{i18n.t(error.message)}</span>;
});
/**
 * Grabs all the required fields from the schema so that they can be passed into
 * the components without having to declare them in both the schema and the component.
 */
const required = makeRequired(ChangePasswordSchema);

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  TabTitle(t("changePassword.block1.header.page-title"));
  const { user } = useAuth();
  // const { user, changePassword } = useAuth();

  const [submittedValues, setSubmittedValues] = useState<
    ChangePasswordInterface | undefined
  >(undefined);

  const initialValues: ChangePasswordInterface = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  //const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (values: ChangePasswordInterface) => {
    setSubmittedValues(values);

    //component coming from forgotPassword page
    // const data: any = await changePassword(
    //   user,
    //   values.oldPassword,
    //   values.newPassword
    // );

    // if (data.status === "FAIL" || data.error) {
    //   return { [FORM_ERROR]: "changePassword.block-form.changeError" };
    // } else {
    //   navigate("/view-profile", {
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
            {t("changePassword.block1.header.page-title")}
          </LoginHeader>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Form
            onSubmit={onSubmit}
            initialValues={submittedValues ? submittedValues : initialValues}
            validate={validate}
            render={({ submitError, handleSubmit, submitting, values }) => (
              <form onSubmit={handleSubmit} autoComplete="new-password">
                <LoginTextField
                  required={required.oldPassword}
                  type={
                    showPassword && showPassword.oldPassword
                      ? "text"
                      : "password"
                  }
                  label={t("changePassword.block-form.input.code")}
                  id="oldPassword"
                  name="oldPassword"
                  variant="filled"
                  autoComplete="current-password"
                  showError={showErrorOnBlur}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword && showPassword.oldPassword
                              ? t("all.button.password-icon-show")
                              : t("all.button.password-icon-hide")
                          }
                          onClick={() =>
                            setShowPassword(prevState => ({
                              ...prevState,
                              oldPassword: !prevState.oldPassword
                            }))
                          }
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          component="button"
                          disableRipple
                        >
                          {showPassword && showPassword.oldPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
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
                          disableRipple
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
                          disableRipple
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
                <FormFieldsWrapperdiv>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={submitting}
                    size="large"
                    disableElevation
                  >
                    {t("changePassword.block-form.button.submit")}
                  </Button>

                  <Button
                    variant="outlined"
                    disabled={submitting}
                    size="large"
                    className="btn-cancel"
                    disableElevation
                    onClick={() => navigate(-1)}
                  >
                    {t("changePassword.block-form.button.cancel")}
                  </Button>
                </FormFieldsWrapperdiv>
              </form>
            )}
          />
        </Grid>
      </Grid>
    </LoginBox>
  );
};

export default ChangePassword;
