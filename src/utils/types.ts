import React from "react";
import { CLASSIC_WASH, PRESCHEDULED_WASH } from ".";
import { FormikErrors, FormikTouched, FormikValues } from "formik";

export interface ScheduleFormErrors {
  address: string;
  area: string;
  pickupDay: string;
  pickupWindow: string;
}

export interface PickupDeliveryProps {
  selectedWashType: string;
  scheduleInfo: ScheduleSummaryProps;
  changePDInfo: (e: string, f: string) => void;
  errors: ScheduleFormErrors;
}

export interface InfoMessageComponentProps {
  message: string;
  type?: string;
  // message: FormikErrors<FormikValues>["message"];
}

export interface CounterComponentProps {
  handleAdd: () => void;
  handleMinus: () => void;
  count: number | undefined;
}

// declare const enum WASH_TYPES {
//   prescheduled_wash = PRESCHEDULED_WASH,
//   classic_wash = CLASSIC_WASH,
// }

// type WASHTYPE = WASH_TYPES.prescheduled_wash | WASH_TYPES.classic_wash;

export interface ScheduleSummaryProps {
  // selectedWashType: WASH_TYPES.classic_wash;
  selectedWashType: string;
  pickupWindow: string;
  address: string;
  pickupDay: string;
  area?: string;
  washcount: number;
  softener: number;
  bleach: number;
  colorcatcher: number;
  stainremover: number;
  mediumLaundryBags: number;
  largeLaundryBags: number;
  contactperson?: string;
  phonenumber?: string;
  contactemail?: string;
}

export interface CustomizeWashProps {
  scheduleInfo: ScheduleSummaryProps;
  changePDInfo: (e: string, f: string | number) => void;
}

export interface WashItem {
  itemno: string;
  status: string;
  date: string;
  extras: string[];
}

export interface PaymentItem {
  itemno: string;
  currency: string;
  amount: number;
  status: string;
  type: string;
  date: string;
}

export interface GoogleAddressInputProps {
  handleChange: (e: string) => void;
  address: string;
}
