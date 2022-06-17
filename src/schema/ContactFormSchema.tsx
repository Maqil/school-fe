import * as Yup from "yup";

export const ContactFormSchma = Yup.object({
  description: Yup.string().required('form-contact.block-form.input.claim-description-required')
});