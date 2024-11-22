import * as Yup from "yup";

export const PickUpInformationSchema = Yup.object().shape({
  address: Yup.string().required("You need to give an address for pickup"),
  area: Yup.string().required("You need to select an area for pickup"),
  pickupDay: Yup.string().required("You should choose a day for pickup"),
  pickupWindow: Yup.string().required(
    "You need to pick a time-frame for pickup"
  ),
});
