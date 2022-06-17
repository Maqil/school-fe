import React, { useState } from "react";
import {
  Alert,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography
} from "@mui/material";
import { makeValidate, makeRequired, showErrorOnBlur } from "mui-rff";
import { Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { FORM_ERROR } from "final-form";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import signinImg from "../../assets/images/signin-image.jpg";
import {
  CheckBoxWrapper,
  LoginBox,
  LoginButton,
  LoginErrorHelperText,
  LoginHeader,
  LoginLink,
  LoginTextField
} from "../../components/LoginComponents/LoginComponents.style";
//We are using our own version of the Checkbox instead of mui-rff's version because we need to hook into the checked and onChange props.
//This can removed this if this issue is ever addressed and fixed.
import { Checkboxes } from "../../components/Mui/RivoMuiRffCheckbox";
import { AlertStateInterface } from "../../interfaces/AlertStateInterface";
import { LoginSchema } from "../../schema/LoginSchema";
import { LoginInterface } from "../../interfaces/LoginInterface";
import { useAuth } from "../../providers/Auth";
import VerificationCode from "../../components/VerificationCode/VerificationCode";
import NewPassword from "../../components/NewPassword/NewPassword";
import { TabTitle } from "../../utils/GeneralFunctions";
/**
 * Uses the optional helper makeValidate function to format the error messages
 * into something usable by final form.
 */
const validate = makeValidate(LoginSchema, error => {
  return <span className="error">{i18n.t(error.message)}</span>;
});
/**
 * Grabs all the required fields from the schema so that they can be passed into
 * the components without having to declare them in both the schema and the component.
 */
const required = makeRequired(LoginSchema);

const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as AlertStateInterface;
  TabTitle(t("login.block1.header.page-title"));
  const { signIn } = useAuth();
  const [submittedValues, setSubmittedValues] = useState<
    LoginInterface | undefined
  >(undefined);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [unloggedUser, setUnloggedUser] = useState<any>({});
  const [rememberEmail, setRememberEmail] = useState<boolean>(
    localStorage.getItem("rememberEmail") === "true" || false
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");

  const initialValues: LoginInterface = {
    email: email,
    password: password,
    rememberEmail: rememberEmail
  };

  const onChangeRememberMe = e => {
    let value = e.target.checked;
    setRememberEmail(value);
  };

  const onChangeEmail = value => {
    setEmail(value);
  };

  const onChangePassword = value => {
    setPassword(value);
  };

  const onSubmit = async (values: LoginInterface) => {
    setSubmittedValues(values);
    // //handle rememberEmail
    // if (values.email !== "" && values.rememberEmail === true) {
    //   localStorage.setItem("rememberEmail", values.rememberEmail.toString());
    //   localStorage.setItem("email", values.email);
    // } else {
    //   localStorage.setItem("rememberEmail", "false");
    //   localStorage.setItem("email", "");
    // }

    // lowercase the email and trim white space around password

    const usr: any = await signIn(values.email.toLowerCase(), values.password.trim());
    console.debug("usr: ", usr);
    
    if (usr.status === "SUCCESS" || usr.data) {
      console.debug("SUCCESS");
      console.debug("user :", usr.data);
      navigate("/shipments-dashboard");
    } else if (usr.status === "FAIL" || usr.error){
      return { [FORM_ERROR]: "login.block-form.loginError" };
    }
    // } else if (
    //   usr.challengeName === "SMS_MFA" ||
    //   usr.challengeName === "SOFTWARE_TOKEN_MFA" ||
    //   usr.challengeName === "CUSTOM_CHALLENGE"
    // ) {
    //   setShowConfirmation(true);
    //   setUnloggedUser(usr);
    // } else if (usr.challengeName === "NEW_PASSWORD_REQUIRED") {
    //   setShowNewPassword(true);
    //   setUnloggedUser(usr);

  };

  // remove first and last name in local storage
  React.useEffect(() => {
    if (state && state.showAlert && state.message === "all.alert.logout") {
      if (sessionStorage) {       
        let sessionName = (sessionStorage.getItem("firstName"))?sessionStorage.getItem("firstName"):"";
        sessionStorage.setItem("firstName", "");
        sessionStorage.setItem("lastName", "");
        localStorage.setItem("firstName", "");
        localStorage.setItem("lastName", "");
        if (sessionName === null || (sessionName !== null && sessionName !== "")){
          window.location.reload();
        } 
      }
    }
    // eslint-disable-next-line
  }, []);
    
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <>
      {state && state.showAlert && (
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
      {!showConfirmation &&
        !showNewPassword &&
        Object.keys(unloggedUser).length === 0 && (
          <LoginBox>
            <Grid container sx={{ pt: 0 }}>
              <Grid item xs={12} sm={5}>
              <img className="signin-img" src={signinImg} alt="" />
                {/* <LoginHeader
                  component="h1"
                  variant="display2"
                  color="fuchsiaAccessible.main"
                >
                  {t("login.block1.header.page-title")}
                </LoginHeader>
                <Typography component="p" variant="lead">
                  {t("login.block1.header.short-intro")}
                </Typography> */}
              </Grid>
              <Grid item xs={12} sm={7}>
                <Form
                  onSubmit={onSubmit}
                  initialValues={
                    submittedValues ? submittedValues : initialValues
                  }
                  validate={validate}
                  render={({ submitError, handleSubmit, submitting }) => (
                    <form
                      onSubmit={handleSubmit}
                      //noValidate={true}
                      autoComplete="new-password"
                    >
                      <LoginTextField
                        type="text"
                        required={required.email}
                        label={t("login.block-form.input.email")}
                        id="email"
                        name="email"
                        variant="filled"
                        autoComplete="email"
                        InputProps={{ disableUnderline: true }}
                        showError={showErrorOnBlur}
                        value={email}
                      />
                      <OnChange name="email">
                        {value => {
                          onChangeEmail(value);
                        }}
                      </OnChange>
                      <LoginTextField
                        required={required.password}
                        type={showPassword ? "text" : "password"}
                        label={t("login.block-form.input.password")}
                        id="password"
                        name="password"
                        variant="filled"
                        autoComplete="current-password"
                        showError={showErrorOnBlur}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword
                                    ? t("all.button.password-icon-show")
                                    : t("all.button.password-icon-hide")
                                }
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                component="button"
                                disableRipple
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <OnChange name="password">
                        {value => {
                          onChangePassword(value);
                        }}
                      </OnChange>
                      <CheckBoxWrapper
                        sx={{
                          display: "block"
                        }}
                      >
                        <Checkboxes
                          required={required.rememberEmail}
                          id="rememberEmail"
                          name="rememberEmail"
                          data={{
                            label: t("login.block-form.input.checkbox"),
                            value: true,
                            onChange: onChangeRememberMe,
                            checked: rememberEmail
                          }}
                          disableRipple
                        />
                      </CheckBoxWrapper>
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
                        {t("login.block-form.button.submit")}
                      </LoginButton>
                      <LoginLink
                        component={Link}
                        to="/forgot-password"
                        variant="body1"
                        color="fuchsiaAccessible.main"
                      >
                        {t("login.block-form.button.link")}
                      </LoginLink>
                      <Box sx={{ my: theme => theme.spacer_l }}>
                        <Typography
                          component="p"
                          variant="h4"
                          sx={{ mb: theme => theme.spacer_m }}
                        >
                          {t("login.block2.text.account")}
                        </Typography>
                        <Typography component="p" variant="caption">
                          {t("login.block2.text.link")}
                        </Typography>
                      </Box>
                    </form>
                  )}
                />
              </Grid>
            </Grid>
          </LoginBox>
        )}
      {showConfirmation && Object.keys(unloggedUser).length > 0 && (
        <VerificationCode user={unloggedUser} />
      )}
      {showNewPassword && Object.keys(unloggedUser).length > 0 && (
        <NewPassword user={unloggedUser} />
      )}
    </>
  );
};

export default Login;
