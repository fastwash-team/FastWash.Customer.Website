import React, { useMemo } from "react";
import CircleCalendar from "../../assets/svgs/1.svg";
import CircleTruck from "../../assets/svgs/2.svg";
import CheckedRadioButton from "../../assets/svgs/input-radio-checked.svg";
import { CLASSIC_WASH, PRESCHEDULED_WASH, supportedAreas } from "../../utils";
import { PickupDeliveryProps } from "../../utils/types";
import { GoogleAddressInput } from "../google-address-input";
import { getPickUpDay, getPickupWindow } from "../../utils/functions";
import { InfoMessage } from "../info-message";

export function PickupDelivery({
  selectedWashType,
  scheduleInfo,
  changePDInfo,
  errors,
}: PickupDeliveryProps) {
  const isWashPrescheduled = selectedWashType === PRESCHEDULED_WASH;
  const isClassicWash = selectedWashType === CLASSIC_WASH;
  const pickUpDaysList = getPickUpDay();

  const pickUpWindowList = useMemo(() => {
    return getPickupWindow(scheduleInfo.pickupDay);
  }, [scheduleInfo.pickupDay]);

  return (
    <div className='schedule-pickup__body__steps-view-render'>
      <h2>Pick up & Delivery</h2>
      <p>Where and how are we picking up your clothes?</p>
      <div className='__options'>
        <div
          className={`option ${isWashPrescheduled && "active"}`}
          onClick={() => changePDInfo("selectedWashType", PRESCHEDULED_WASH)}
        >
          <div className='imgs'>
            <img src={CircleCalendar} alt='' className='option-img' />
            {isWashPrescheduled && <img src={CheckedRadioButton} alt='' />}
          </div>
          <h3>Pre-Scheduled Wash</h3>
          <p>
            Your clothes get picked up and delivered only at specified times
            based on your location during the week.
          </p>
        </div>
        <div
          className={`option ${isClassicWash && "active"}`}
          onClick={() => changePDInfo("selectedWashType", CLASSIC_WASH)}
        >
          <div className='imgs'>
            <img src={CircleTruck} alt='' className='option-img' />
            {isClassicWash && <img src={CheckedRadioButton} alt='' />}
          </div>
          <h3>Classic Wash</h3>
          <p>
            Your clothes get picked up immediately anytime during the week by
            our rider and gets returned same day.
          </p>
        </div>
      </div>

      <div className='mt-3'>
        <label>Address</label>
        <GoogleAddressInput
          handleChange={(address) => changePDInfo("address", address)}
          address={scheduleInfo.address}
        />
        {errors?.address && <InfoMessage message={errors.address} />}
      </div>
      <div className='mt-3'>
        <label>Choose area</label>
        <select
          className='form-select'
          aria-label='Default select example'
          onChange={({ target: { value } }) => changePDInfo("area", value)}
        >
          {supportedAreas.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
        {errors?.area && <InfoMessage message={errors.area} />}
      </div>
      <div className='mt-3'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <label>Choose Day</label>
            <select
              className='form-select'
              aria-label='Default select example'
              onChange={({ target: { value } }) =>
                changePDInfo("pickupDay", value)
              }
            >
              <option selected={!scheduleInfo.pickupDay} disabled>
                Choose pickup day
              </option>
              {pickUpDaysList.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            {errors?.pickupDay && <InfoMessage message={errors.pickupDay} />}
          </div>
          <div className='col-md-6 col-sm-12'>
            <label>Pick up window</label>
            <select
              className='form-select'
              aria-label='Default select example'
              onChange={({ target: { value } }) =>
                changePDInfo("pickupWindow", value)
              }
            >
              <option selected={!scheduleInfo.pickupWindow} disabled>
                Choose pickup window
              </option>
              {!pickUpWindowList.length && (
                <option selected disabled>
                  We have closed {scheduleInfo.pickupDay}{" "}
                </option>
              )}
              {pickUpWindowList.map((el, i) => (
                <option key={i}>{el}</option>
              ))}
            </select>
            {errors?.pickupWindow && (
              <InfoMessage message={errors.pickupWindow} />
            )}
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <div className='etd'>
          <i className='bi bi-truck'></i>
          <p>
            Your laundry will be delivered to you{" "}
            <b>{selectedWashType === CLASSIC_WASH ? "4hrs" : "Today"}</b>
          </p>
        </div>
      </div>
      <div className='mt-3'>
        <label>Laundry Instructions</label>
        <textarea
          className='form-control'
          placeholder='Add any special instructions for the driver'
          id='floatingTextarea'
        />
      </div>
    </div>
  );
}
