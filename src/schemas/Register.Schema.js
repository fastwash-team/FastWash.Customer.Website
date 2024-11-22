import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Your full name is required"),
  email: Yup.string().required("Your email is required"),
  phoneNumber: Yup.string().required("Your phone number is required").max(10),
});
