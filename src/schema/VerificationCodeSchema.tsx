import * as Yup from "yup";

export const VerificationCodeSchema = Yup.object({
  verificationCode: Yup.string()
    .matches(RegExp("^(\\d){6}$"), "verificationCode.block-form.error.code-min")
    .required("verificationCode.block-form.error.code-required")
});
