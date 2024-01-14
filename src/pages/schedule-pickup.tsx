import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import RadioChecked from "../assets/svgs/input-radio-checked.svg";
import RadioCheckedDisabled from "../assets/svgs/input-radio-checked-disabled.svg";

import { PickupDelivery } from "../components/schedule-pickup/pickup-delivery";
import { CustomizeWash } from "../components/schedule-pickup/customize-wash";
import { ContactDetails } from "../components/schedule-pickup/contact-details";

import { PRESCHEDULED_WASH } from "../utils";
import { activate_background_loader } from "../pipelines/layout/reducer";
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
import { ScheduleFormErrors } from "../utils/types";

export function SchedulePickup() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [completeScheduling, setCompleteSchedule] = useState(false); // should be controlled from redux
  const dispatch = useDispatch();

  const validateScheduleFlow = () => {
    if (step === 1) return PickUpInformationSchema;
    if (step === 2) return CustomizeWashSchema;
    if (step === 3) return ContactDetailsSchema;
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
    if (step === 3) {
      handleFinishScheduling();
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
    },
    onSubmit: (values) => {
      console.log("all values", values);
      handleNextStep();
    },
    validationSchema: validateScheduleFlow,
  });

  const scheduleInfo = formik.values;

  const handleChangeInfo = (key: string, value: string | number) => {
    return formik.setFieldValue(key, value);
  };

  const handleFinishScheduling = () => {
    dispatch(activate_background_loader());
    setCompleteSchedule(true);
    setStep(step + 1);
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
              onClick={() => formik.handleSubmit()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
