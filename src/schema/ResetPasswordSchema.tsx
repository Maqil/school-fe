import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object({
  verificationCode: Yup.string()
    .matches(RegExp("^(\\d){6}$"), "verificationCode.block-form.error.code-min")
    .required("resetPassword.block-form.error.verificationCode-required"),
  newPassword: Yup.string()
    .required("resetPassword.block-form.error.newPassword-required")
    .min(12, "12 digits")
    .matches(RegExp("(.*[a-z].*)"), "Lowercase")
    .matches(RegExp("(.*[A-Z].*)"), "Uppercase")
    .matches(RegExp("(.*\\d.*)"), "Number")
    .matches(RegExp("[^a-zA-Z0-9]"), "Special"),
  confirmPassword: Yup.string()
    .required("resetPassword.block-form.error.confirmPassword-required")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "resetPassword.block-form.error.incorrect-newPassword"
    )
});
