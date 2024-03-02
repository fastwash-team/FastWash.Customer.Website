import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import shortUUID from "short-uuid";
import Swal from "sweetalert2";

import RadioChecked from "../assets/svgs/input-radio-checked.svg";
import RadioCheckedDisabled from "../assets/svgs/input-radio-checked-disabled.svg";

import { PickupDelivery } from "../components/schedule-pickup/pickup-delivery";
import { CustomizeWash } from "../components/schedule-pickup/customize-wash";
import { ContactDetails } from "../components/schedule-pickup/contact-details";

import { PRESCHEDULED_WASH, WASH_PRICES } from "../utils";
import { CompleteScheduleScreen } from "../components/schedule-pickup/completed";
import { ScheduleSummary } from "../components/schedule-pickup/schedule-summary";
import { ScheduleTracker } from "../components/schedule-pickup/schedule-tracker";
import { Header } from "../components/header";
import { useFormik } from "formik";
import {
  ContactDetailsSchema,
  CustomizeWashSchema,
  PickUpInformationSchema,
} from "../utils/schemas";
import { ScheduleFormErrors, ScheduleSummaryProps } from "../utils/types";
import { calculateWashPrice, errorHandler } from "../utils/functions";

export function SchedulePickup() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [completeScheduling, setCompleteSchedule] = useState(false); // should be controlled from redux

  const validateScheduleFlow = () => {
    if (step === 1) return PickUpInformationSchema;
    if (step === 2) return CustomizeWashSchema;
    if (step === 3) return ContactDetailsSchema;
  };

  const handleNextStep = (values: ScheduleSummaryProps) => {
    if (step < 3) {
      setStep(step + 1);
    }
    if (step === 3) {
      handleFinishScheduling(values);
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const formik = useFormik({
    initialValues: {
      selectedWashType: PRESCHEDULED_WASH,
      address: location?.state?.address || "",
      pickupDay: "",
      pickupWindow: "",
      washcount: 0,
      softener: 0,
      largeLaundryBags: 0,
      mediumLaundryBags: 0,
      bleach: 0,
      colorcatcher: 0,
      stainremover: 0,
      contactperson: "",
      contactemail: "",
      phonenumber: "",
      laundryInstructions: "",
    },
    onSubmit: (values) => {
      handleNextStep(values);
    },
    validationSchema: validateScheduleFlow,
  });

  const scheduleInfo = formik.values;

  const handleChangeInfo = (key: string, value: string | number) => {
    return formik.setFieldValue(key, value);
  };

  const handleFinishScheduling = (values: ScheduleSummaryProps) =>
    handleCreateWash(values);

  const total = useMemo(() => {
    return (
      scheduleInfo.washcount * WASH_PRICES.WASH +
      scheduleInfo.softener * WASH_PRICES.SOFTENER +
      WASH_PRICES.LOGISTICS +
      scheduleInfo.bleach * WASH_PRICES.BLEACH +
      scheduleInfo.colorcatcher * WASH_PRICES.COLOR_CATCHER +
      scheduleInfo.largeLaundryBags * WASH_PRICES.X_LAUNDRY_BAGS +
      scheduleInfo.mediumLaundryBags * WASH_PRICES.E_LAUNDRY_BAGS +
      scheduleInfo.stainremover * WASH_PRICES.STAIN_REMOVER
    );
  }, [scheduleInfo]);

  const handleCreateTransaction = async (
    email: string,
    amount: number,
    reference: string
  ) => {
    try {
      const {
        data: { responseObject },
      } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/payment/initiate`,
        { email, amount, reference }
      );
      return responseObject;
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  const handleCreateWash = async (values: ScheduleSummaryProps) => {
    setLoading(true);
    try {
      if (!values.contactemail) return;
      const transaction = await handleCreateTransaction(
        values.contactemail,
        total,
        shortUUID.generate()
      );
      const washItems = [];
      if (values.washcount)
        washItems.push({
          itemName: "Washes",
          numberOfItem: values.washcount,
          itemAmount: calculateWashPrice(values.washcount),
        });
      if (values.bleach)
        washItems.push({
          itemName: "bleach",
          numberOfItem: values.bleach,
          itemAmount: values.bleach * WASH_PRICES.BLEACH,
        });
      if (values.colorcatcher)
        washItems.push({
          itemName: "Color Catcher",
          numberOfItem: values.colorcatcher,
          itemAmount: values.colorcatcher * WASH_PRICES.COLOR_CATCHER,
        });
      if (values.softener)
        washItems.push({
          itemName: "Softner",
          numberOfItem: values.softener,
          itemAmount: values.softener * WASH_PRICES.SOFTENER,
        });
      if (values.stainremover)
        washItems.push({
          itemName: "Stain Remover",
          numberOfItem: values.stainremover,
          itemAmount: values.stainremover * WASH_PRICES.STAIN_REMOVER,
        });
      if (values.largeLaundryBags)
        washItems.push({
          itemName: "Laundry Bags (X)",
          numberOfItem: values.largeLaundryBags,
          itemAmount: values.largeLaundryBags * WASH_PRICES.X_LAUNDRY_BAGS,
        });
      if (values.mediumLaundryBags)
        washItems.push({
          itemName: "Laundry Bags (E)",
          numberOfItem: values.mediumLaundryBags,
          itemAmount: values.mediumLaundryBags * WASH_PRICES.E_LAUNDRY_BAGS,
        });
      const body = {
        streetAddress: values.address,
        location: values.area,
        orderDate: new Date(),
        serviceType: 1,
        internalNotes: values.laundryInstructions,
        estimatedDeliveryTime: new Date(),
        pickupTime: values.pickupWindow,
        washItems,
        userData: {
          fullName: values.contactperson,
          email: values.contactemail,
          phoneNumber: values.phonenumber,
          userType: 1,
        },
        transactionData: {
          transactionReference: transaction.reference,
          transactionAmount: total,
          transactionChannel: 1,
        },
      };
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders`,
        body
      );
      Swal.fire({
        title: "Wash Created!",
        text: "You have successfully created your wash order. We will notify your email on further steps!",
        icon: "success",
      });
      setCompleteSchedule(true);
      setStep(step + 1);
    } catch (error) {
      const errorMessage = errorHandler(error);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
      setLoading(false);
    }
  };

  const handleTitleClick = (pageNumber: number) => {
    if (pageNumber < step) setStep(pageNumber);
    return;
  };

  return (
    <div className='schedule-pickup'>
      <Header />
      {!completeScheduling && (
        <div className='schedule-pickup__body__flow-tracker-wrapper-mobile'>
          <p>
            <button className='_back' onClick={handleGoBack}>
              <i className='bi bi-chevron-left'></i>
            </button>
            {step === 1
              ? "Pick up & Delivery"
              : step === 2
              ? "Customize Wash"
              : step === 3
              ? "Contact Details"
              : null}
          </p>
          <p className='step-count'>Step {step} of 3</p>
        </div>
      )}

      <div className='schedule-pickup__body'>
        {!completeScheduling && (
          <div className='schedule-pickup__body__flow-tracker-wrapper'>
            <i className='bi bi-chevron-left' onClick={handleGoBack}></i>
            <div
              className='schedule-pickup__body__flow-tracker'
              onClick={() => handleTitleClick(1)}
            >
              <img
                src={
                  step === 1 || step > 1 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Pick up & Delivery</p>
            </div>
            <div
              className='schedule-pickup__body__flow-tracker disabled'
              onClick={() => handleTitleClick(2)}
            >
              <img
                src={
                  step === 2 || step > 2 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Customize Wash</p>
            </div>
            <div
              className='schedule-pickup__body__flow-tracker disabled'
              onClick={() => handleTitleClick(3)}
            >
              <img
                src={step === 3 ? RadioChecked : RadioCheckedDisabled}
                alt=''
              />
              <p>Payment</p>
            </div>
          </div>
        )}

        <div className='schedule-pickup__body__steps-view'>
          <div className='row'>
            <div className='col-md-5 col-sm-12'>
              {step === 1 ? (
                <PickupDelivery
                  selectedWashType={scheduleInfo.selectedWashType}
                  changePDInfo={(key: string, value: string) => {
                    handleChangeInfo(key, value);
                  }}
                  scheduleInfo={scheduleInfo}
                  errors={formik.errors as ScheduleFormErrors}
                />
              ) : step === 2 ? (
                <CustomizeWash
                  scheduleInfo={scheduleInfo}
                  changePDInfo={(key: string, value: string | number) => {
                    handleChangeInfo(key, value);
                  }}
                />
              ) : step === 3 ? (
                <ContactDetails
                  scheduleInfo={scheduleInfo}
                  changePDInfo={(key: string, value: string | number) => {
                    handleChangeInfo(key, value);
                  }}
                  errors={formik.errors as ScheduleFormErrors}
                />
              ) : step === 4 && completeScheduling ? (
                <CompleteScheduleScreen />
              ) : null}
            </div>
            <div className='col-2'></div>
            <div className='col-md-5 col-sm-12 col-summary'>
              {step === 4 && completeScheduling ? (
                <ScheduleTracker />
              ) : (
                <ScheduleSummary
                  total={total}
                  selectedWashType={scheduleInfo.selectedWashType}
                  pickupWindow={scheduleInfo.pickupWindow}
                  address={scheduleInfo.address}
                  pickupDay={scheduleInfo.pickupDay}
                  washcount={scheduleInfo.washcount}
                  area={""}
                  softener={scheduleInfo.softener}
                  bleach={scheduleInfo.bleach}
                  colorcatcher={scheduleInfo.colorcatcher}
                  stainremover={scheduleInfo.stainremover}
                  mediumLaundryBags={scheduleInfo.mediumLaundryBags}
                  largeLaundryBags={scheduleInfo.largeLaundryBags}
                  contactemail={scheduleInfo.contactemail}
                  contactperson={scheduleInfo.contactperson}
                  phonenumber={scheduleInfo.phonenumber}
                />
              )}
            </div>
          </div>
          {!completeScheduling && (
            <button
              className='mt-4 mb-5 next-button'
              disabled={loading}
              onClick={() => formik.handleSubmit()}
            >
              {loading ? (
                <div
                  className='spinner-border text-success app-spinner'
                  role='status'
                >
                  <span className='sr-only'></span>
                </div>
              ) : (
                "Next"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
