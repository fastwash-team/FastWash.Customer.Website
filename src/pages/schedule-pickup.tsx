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
  const [selectedWashType, setWashType] = useState(PRESCHEDULED_WASH);
  const [pickupRange] = useState("09:00 - 10:00");
  const [step, increaseStep] = useState(1);
  const [completeScheduling, setCompleteSchedule] = useState(false); // should be controlled from redux
  const dispatch = useDispatch();

  console.log({ location });

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
                  selectedWashType={selectedWashType}
                  changeWashType={(type: string) => setWashType(type)}
                />
              ) : step === 2 ? (
                <CustomizeWash />
              ) : step === 3 ? (
                <ContactDetails />
              ) : step === 4 && completeScheduling ? (
                <CompleteScheduleScreen />
              ) : null}
            </div>
            <div className='col-2'></div>
            <div className='col-md-5 col-sm-12'>
              {step === 4 && completeScheduling ? (
                <ScheduleTracker />
              ) : (
                <ScheduleSummary
                  selectedWashType={selectedWashType}
                  pickupRange={pickupRange}
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
