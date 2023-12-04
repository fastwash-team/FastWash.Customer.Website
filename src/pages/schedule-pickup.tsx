import React from "react";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import RadioChecked from "../assets/svgs/input-radio-checked.svg";
import RadioCheckedDisabled from "../assets/svgs/input-radio-checked-disabled.svg";
import { useLocation } from "react-router-dom";
import { PickupDelivery } from "../components/schedule-pickup/pickup-delivery";

export function SchedulePickup() {
  const location = useLocation();
  console.log({ location });
  return (
    <div className='schedule-pickup'>
      <div className='schedule-pickup__header'>
        <a href='/'>
          <img src={FashWashLogo} alt='fash-wash' />
        </a>
        <button>Menu</button>
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
          <PickupDelivery />
          <div className='schedule-pickup__body__steps-summary'></div>
        </div>
      </div>
    </div>
  );
}
