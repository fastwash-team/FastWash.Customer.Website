import * as Yup from "yup";

export const LandingPageSchema = Yup.object().shape({
  address: Yup.string().required("You need to schedule with an address"),
});

export const PickUpInformationSchema = Yup.object().shape({
  address: Yup.string().required("You need to give an address for pickup"),
  // area: Yup.string().required(""),
  pickupDay: Yup.string().required("You should choose a day for pickup"),
  pickupWindow: Yup.string().required(
    "You need to pick a timeframe for pickup"
  ),
});

export const CustomizeWashSchema = Yup.object().shape({});
export const ContactDetailsSchema = Yup.object().shape({
  contactperson: Yup.string().required("You must give a contact name"),
  contactemail: Yup.string().email().required("You must give a contact email"),
  phonenumber: Yup.string()
    .required("You must give a phone number")
    .min(5)
    .max(11),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("You must give an email"),
});

export const ValidateTokenSchema = Yup.object().shape({
  token: Yup.string().required("You must provide token"),
});

export const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Your full name is required"),
  email: Yup.string().required("Your email is required"),
  phoneNumber: Yup.string().required("Your phone number is required").max(10),
});
