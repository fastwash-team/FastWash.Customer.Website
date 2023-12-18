import React from "react";
import { ScheduleSummaryProps } from "../../utils/types";
import { CLASSIC_WASH, PRESCHEDULED_WASH } from "../../utils";

export function ScheduleSummary(props: ScheduleSummaryProps) {
  return (
    <>
      <div className='schedule-pickup__body__steps-summary'>
        <h3>Request Summary</h3>
        <div className='address-block'>
          <p>Address</p>
          <b>No 4, Queen Street, Alagomeji-Yaba, Yaba, Lagos</b>
        </div>
        <div className='billing-items'>
          <div className='item'>
            <span>Service Type</span>
            <b>
              {props.selectedWashType === PRESCHEDULED_WASH
                ? "Pre-Scheduled Wash"
                : props.selectedWashType === CLASSIC_WASH
                ? "Classic Wash"
                : ""}
            </b>
          </div>
          <div className='item'>
            <span>Pick up Time</span>
            <b>{props.pickupRange}</b>
          </div>
          <div className='item'>
            <span>Est Delivery Time</span>
            <b>Today</b>
          </div>
          <div className='item'>
            <span>
              Logistics{" "}
              <i
                data-bs-toggle='tooltip'
                data-bs-title='Default tooltip'
                className='bi bi-info-circle-fill'
              />
            </span>
            <b>NGN 1000</b>
          </div>
        </div>
        <div className='total'>
          <span>Total</span>
          <b>NGN 5690</b>
        </div>
      </div>
      <div className='schedule-pickup__body__steps-summary_mobile'>
        <div className='accordion' id='accordionExample'>
          <div className='accordion-item'>
            <h2 className='accordion-header'>
              <button
                className='accordion-button'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#collapseOne'
                aria-expanded='false'
                aria-controls='collapseOne'
              >
                Request Summary
              </button>
            </h2>
            <div
              id='collapseOne'
              className='accordion-collapse collapse'
              data-bs-parent='#accordionExample'
            >
              <div className='accordion-body'>
                <div className='address-block'>
                  <p>Address</p>
                  <b>No 4, Queen Street, Alagomeji-Yaba, Yaba, Lagos</b>
                </div>
                <div className='billing-items'>
                  <div className='item'>
                    <span>Service Type</span>
                    <b>
                      {props.selectedWashType === PRESCHEDULED_WASH
                        ? "Pre-Scheduled Wash"
                        : props.selectedWashType === CLASSIC_WASH
                        ? "Classic Wash"
                        : ""}
                    </b>
                  </div>
                  <div className='item'>
                    <span>Pick up Time</span>
                    <b>{props.pickupRange}</b>
                  </div>
                  <div className='item'>
                    <span>Est Delivery Time</span>
                    <b>Today</b>
                  </div>
                  <div className='item'>
                    <span>Logistics</span>
                    <b>NGN 1000</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='total'>
          <span>Total</span>
          <b>NGN 5690</b>
        </div>
      </div>
    </>
  );
}
