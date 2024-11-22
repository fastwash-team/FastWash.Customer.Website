import * as Yup from "yup";

export const ContactDetailsSchema = Yup.object().shape({
  contactPerson: Yup.string().required("You must give a contact name"),
  contactEmail: Yup.string().email().required("You must give a contact email"),
  phoneNumber: Yup.string()
    .required("You must give a phone number")
    .min(5)
    .max(11),
});
