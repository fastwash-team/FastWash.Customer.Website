import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("You must give an email"),
});
