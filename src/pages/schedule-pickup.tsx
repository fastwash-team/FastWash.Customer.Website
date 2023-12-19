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

export function SchedulePickup() {
  const location = useLocation();
  const [step, increaseStep] = useState(1);
  const [scheduleInfo, setScheduleInfo] = useState({
    pickupRange: "09:00 - 10:00",
    selectedWashType: PRESCHEDULED_WASH,
    address: location.state.address,
    pickupday: "Today",
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
  });

  console.log({ scheduleInfo });
  const [completeScheduling, setCompleteSchedule] = useState(false); // should be controlled from redux
  const dispatch = useDispatch();

  const handleChangeInfo = (key: string, value: string | number) => {
    console.log("sd", key, value);
    return setScheduleInfo({ ...scheduleInfo, [key]: value });
  };

  const handleNextStep = () => {
    if (step < 3) {
      increaseStep(step + 1);
    }
    if (step === 3) {
      handleFinishScheduling();
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      increaseStep(step - 1);
    }
  };

  const handleFinishScheduling = () => {
    dispatch(activate_background_loader());
    setCompleteSchedule(true);
    increaseStep(step + 1);
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
            <div className='schedule-pickup__body__flow-tracker'>
              <img
                src={
                  step === 1 || step > 1 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Pick up & Delivery</p>
            </div>
            <div className='schedule-pickup__body__flow-tracker disabled'>
              <img
                src={
                  step === 2 || step > 2 ? RadioChecked : RadioCheckedDisabled
                }
                alt=''
              />
              <p>Customize Wash</p>
            </div>
            <div className='schedule-pickup__body__flow-tracker disabled'>
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
                  address={scheduleInfo.address}
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
                  pickupRange={scheduleInfo.pickupRange}
                  address={scheduleInfo.address}
                  pickupday={scheduleInfo.pickupday}
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
            <button className='mt-4 mb-5 next-button' onClick={handleNextStep}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
