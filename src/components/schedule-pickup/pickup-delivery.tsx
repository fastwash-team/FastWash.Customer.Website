import React from "react";
import CircleCalendar from "../../assets/svgs/1.svg";
import CircleTruck from "../../assets/svgs/2.svg";
import CheckedRadioButton from "../../assets/svgs/input-radio-checked.svg";
import { CLASSIC_WASH, PRESCHEDULED_WASH, supportedAreas } from "../../utils";
import { PickupDeliveryProps } from "../../utils/types";

export function PickupDelivery({
  selectedWashType,
  changeWashType,
}: PickupDeliveryProps) {
  const isWashPrescheduled = selectedWashType === PRESCHEDULED_WASH;
  const isClassicWash = selectedWashType === CLASSIC_WASH;
  return (
    <div className='schedule-pickup__body__steps-view-render'>
      <h2>Pick up & Delivery</h2>
      <p>Where and how are we picking up your clothes?</p>
      <div className='__options'>
        <div
          className={`option ${isWashPrescheduled && "active"}`}
          onClick={() => changeWashType(PRESCHEDULED_WASH)}
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
          onClick={() => changeWashType(CLASSIC_WASH)}
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
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>
            <i className='bi bi-geo-alt'></i>
          </span>
          <input
            type='text'
            className='form-control'
            placeholder='Selected Address'
            aria-describedby='basic-addon1'
          />
        </div>
      </div>
      <div className='mt-3'>
        <label>Choose area</label>
        <select className='form-select' aria-label='Default select example'>
          {supportedAreas.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
      </div>
      <div className='mt-3'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <label>Choose Day</label>
            <select className='form-select' aria-label='Default select example'>
              {["Today", "Tomorrow", "Wed, 18th Oct", "Thu, 19th Oct"].map(
                (el, i) => (
                  <option key={i}>{el}</option>
                )
              )}
            </select>
          </div>
          <div className='col-md-6 col-sm-12'>
            <label>Pick up window</label>
            <select className='form-select' aria-label='Default select example'>
              <option>09:00 - 10:00</option>
              <option>10:00 - 11:00</option>
            </select>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <div className='etd'>
          <i className='bi bi-truck'></i>
          <p>
            Your laundry will be delivered to you <b>Today</b>
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
