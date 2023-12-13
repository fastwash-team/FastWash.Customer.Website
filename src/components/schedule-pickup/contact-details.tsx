import React, { useState } from "react";
import OpayLogo from "../../assets/svgs/OPay - png.png";
import PaystackLogo from "../../assets/svgs/paystack.svg";
import { PAYMENT_TYPES } from "../../utils";

export function ContactDetails() {
  const [paymentOption, setPaymentOption] = useState<string | null>(null);
  return (
    <div className='schedule-pickup__body__steps-view-render contact-details'>
      <h2>Contact details</h2>
      <p>
        We would send you updates on the status of your request at intervals
      </p>
      <div className=''>
        <label>Contact person</label>
        <input className='form-control' />
      </div>
      <div className='mt-3 mb-5'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <label>Phone number</label>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>
                +234
              </span>
              <input type='text' className='form-control' />
            </div>
          </div>
          <div className='col-md-6 col-sm-12'>
            <label>Email</label>
            <input className='form-control' placeholder='email@address.com' />
          </div>
        </div>
      </div>
      <div className='payments'>
        <h3>Payment</h3>
        <p>Choose a payment option</p>
        <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.WALLET && "active"
          }`}
          onClick={() => setPaymentOption(PAYMENT_TYPES.WALLET)}
        >
          <i className='bi bi-credit-card'></i>
          <p>
            <b>Pay with Wallet </b>
            <span>- NGN 5,000</span>
          </p>
        </div>
        <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.PAYSTACK && "active"
          }`}
          onClick={() => setPaymentOption(PAYMENT_TYPES.PAYSTACK)}
        >
          <img src={PaystackLogo} alt='paystack logo' />
          <p>
            <b>Pay with Paystack </b>
          </p>
          <input
            type='radio'
            checked={paymentOption === PAYMENT_TYPES.PAYSTACK}
          />
        </div>
        <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.OPAY && "active"
          }`}
          onClick={() => setPaymentOption(PAYMENT_TYPES.OPAY)}
        >
          <img src={OpayLogo} alt='opay logo' />
          <p>
            <b>Pay with Opay </b>
          </p>
          <input type='radio' checked={paymentOption === PAYMENT_TYPES.OPAY} />
        </div>
        <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.PAY_FOR_ME && "active"
          }`}
          onClick={() => setPaymentOption(PAYMENT_TYPES.PAY_FOR_ME)}
        >
          <div className='user-icon'>
            <i className='bi bi-person-plus-fill'></i>
          </div>
          <p>
            <b>
              Pay for me <span>(Get a friend to pay for your wash)</span>{" "}
            </b>
          </p>
          <input
            type='radio'
            checked={paymentOption === PAYMENT_TYPES.PAY_FOR_ME}
          />
        </div>
        <div className='coupon mt-3'>
          <input className='form-control' placeholder='Enter code here' />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}
