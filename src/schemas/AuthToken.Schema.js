import * as Yup from "yup";

export const ValidateTokenSchema = Yup.object().shape({
  token: Yup.string().required("You must provide token"),
});
