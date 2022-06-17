import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object({
  oldPassword: Yup.string().required(
    "changePassword.block-form.error.oldPassword-required"
  ),
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
