import React, { useState } from "react";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import RadioChecked from "../assets/svgs/input-radio-checked.svg";
import RadioCheckedDisabled from "../assets/svgs/input-radio-checked-disabled.svg";
import { useLocation } from "react-router-dom";
import { PickupDelivery } from "../components/schedule-pickup/pickup-delivery";
import { CLASSIC_WASH, PRESCHEDULED_WASH } from "../utils";

export function SchedulePickup() {
  const location = useLocation();
  const [selectedWashType, setWashType] = useState(PRESCHEDULED_WASH);
  const [pickupRange] = useState("09:00 - 10:00");
  const [step] = useState(1);
  console.log({ location });
  return (
    <div className='schedule-pickup'>
      <div className='schedule-pickup__header'>
        {/* <a href='/'>
          <img src={FashWashLogo} alt='fash-wash' className='img-fluid' />
        </a>
        <button>Menu</button> */}
        <nav className='navbar navbar-expand-lg app-landing_section-one_header-container'>
          <a className='navbar-brand' href='#'>
            <img src={FashWashLogo} alt='fash-wash' className='img-fluid' />
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarScroll'
            aria-controls='navbarScroll'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarScroll'>
            <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='#'>
                  How it works
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className='schedule-pickup__body__flow-tracker-wrapper-mobile'>
        <p>
          <i className='bi bi-chevron-left'></i>
          {step === 1 ? "Pick up & Delivery" : ""}
        </p>
        <p className='step-count'>Step {step} of 3</p>
      </div>
      <div className='schedule-pickup__body'>
        <div className='schedule-pickup__body__flow-tracker-wrapper'>
          <div className='schedule-pickup__body__flow-tracker'>
            <img src={RadioChecked} alt='' />
            <p>Pick up & Delivery</p>
          </div>
          <div className='schedule-pickup__body__flow-tracker disabled'>
            <img src={RadioCheckedDisabled} alt='' />
            <p>Customize Wash</p>
          </div>
          <div className='schedule-pickup__body__flow-tracker disabled'>
            <img src={RadioCheckedDisabled} alt='' />
            <p>Payment</p>
          </div>
        </div>
        <div className='schedule-pickup__body__steps-view'>
          <div className='row'>
            <div className='col-md-5 col-sm-12'>
              <PickupDelivery
                selectedWashType={selectedWashType}
                changeWashType={(type: string) => setWashType(type)}
              />
            </div>
            <div className='col-2'></div>
            <div className='col-md-5 col-sm-12'>
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
                      {selectedWashType === PRESCHEDULED_WASH
                        ? "Pre-Scheduled Wash"
                        : selectedWashType === CLASSIC_WASH
                        ? "Classic Wash"
                        : ""}
                    </b>
                  </div>
                  <div className='item'>
                    <span>Pick up Time</span>
                    <b>{pickupRange}</b>
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
                <div className='total'>
                  <span>Total</span>
                  <b>NGN 5690</b>
                </div>
              </div>
            </div>
          </div>
          <button className='mt-4 next-button'>Next</button>
        </div>
      </div>
    </div>
  );
}
