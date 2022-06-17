import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("login.block-form.error.email-pattern")
    .required("login.block-form.error.email-required"),
  password: Yup.string().required("login.block-form.error.password-required"),
  available: Yup.boolean()
});
