import React from "react";
import { ScheduleSummaryProps } from "../../utils/types";
import { CLASSIC_WASH, PRESCHEDULED_WASH } from "../../utils";
import { formatMoney } from "../../utils/functions";

export function ScheduleSummary(props: ScheduleSummaryProps) {
  console.log({ props }, "-----");
  return (
    <>
      <div className='schedule-pickup__body__steps-summary'>
        <h3>Request Summary</h3>
        <div className='address-block'>
          <p>Address</p>
          <b>{props.address || "-"}</b>
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
            <b>{props.pickupday}</b>
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
            <b>N {formatMoney(1000)}</b>
          </div>
          {props.washcount > 0 && (
            <div className='item'>
              <span>Wash({props.washcount})</span>
              <b>N {formatMoney(2700 * props.washcount)}</b>
            </div>
          )}
          {props.softener > 0 && (
            <div className='item'>
              <span>Softener ({props.softener})</span>
              <b>N {formatMoney(250 * props.softener)}</b>
            </div>
          )}
          {props.bleach > 0 && (
            <div className='item'>
              <span>Bleach ({props.bleach})</span>
              <b>N {formatMoney(250 * props.bleach)}</b>
            </div>
          )}
          {props.colorcatcher > 0 && (
            <div className='item'>
              <span>Color Catcher ({props.colorcatcher})</span>
              <b>N {formatMoney(250 * props.colorcatcher)}</b>
            </div>
          )}
          {props.stainremover > 0 && (
            <div className='item'>
              <span>Stain Remover ({props.stainremover})</span>
              <b>N {formatMoney(250 * props.stainremover)}</b>
            </div>
          )}
          {props.mediumLaundryBags > 0 && (
            <div className='item'>
              <span>Laundry Bags (E) ({props.mediumLaundryBags})</span>
              <b>N {formatMoney(1500 * props.mediumLaundryBags)}</b>
            </div>
          )}
          {props.largeLaundryBags > 0 && (
            <div className='item'>
              <span>Laundry Bags (X) ({props.largeLaundryBags})</span>
              <b>N {formatMoney(2500 * props.largeLaundryBags)}</b>
            </div>
          )}
        </div>
        <div className='total'>
          <span>Total</span>
          <b>NGN {formatMoney(5650)}</b>
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
