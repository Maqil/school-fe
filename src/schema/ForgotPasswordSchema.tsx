import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("login.block-form.error.email-pattern")
    .required("login.block-form.error.email-required")
});
