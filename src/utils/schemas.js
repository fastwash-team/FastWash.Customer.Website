import * as Yup from "yup";

export const LandingPageSchema = Yup.object().shape({
  address: Yup.string().required("You need to schedule with an address"),
});
