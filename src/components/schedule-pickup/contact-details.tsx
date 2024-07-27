import React, { useEffect, useState } from "react";
// import OpayLogo from "../../assets/svgs/OPay - png.png";
import PaystackLogo from "../../assets/svgs/paystack.svg";
import { PAYMENT_TYPES } from "../../utils";
import { CustomizeWashProps as ContactDetailsProps } from "../../utils/types";
import { InfoMessage } from "../info-message";

export function ContactDetails(props: ContactDetailsProps) {
  const [paymentOption, setPaymentOption] = useState<string | null>(
    PAYMENT_TYPES.PAYSTACK
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleContactEntry = (key: string, value: string) => {
    return props.changePDInfo(key, value);
  };

  return (
    <div className='schedule-pickup__body__steps-view-render contact-details'>
      <h2>Contact details</h2>
      <p>
        We would send you updates on the status of your request at intervals
      </p>
      <div className=''>
        <label>Contact person</label>
        <input
          className='form-control'
          name='contactperson'
          id='contactperson'
          onChange={({ target: { value } }) =>
            handleContactEntry("contactperson", value)
          }
          value={props.scheduleInfo.contactperson}
        />
        {props.errors?.contactperson && (
          <InfoMessage message={props.errors.contactperson} />
        )}
      </div>
      <div className='mt-3 mb-5'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <label>Phone number</label>
            <div className='phone-input-0'>
              <span>+234</span>
              <input
                type='number'
                max={10}
                maxLength={10}
                placeholder='8000000000'
                value={props.scheduleInfo.phonenumber}
                onChange={({ target: { value } }) => {
                  if (value.length <= 10)
                    handleContactEntry("phonenumber", value);
                }}
              />
            </div>
            {props.errors?.phonenumber && (
              <InfoMessage message={props.errors.phonenumber} />
            )}
          </div>
          <div className='col-md-6 col-sm-12'>
            <label>Email</label>
            <input
              className='form-control'
              placeholder='email@address.com'
              name='contactemail'
              id='contactemail'
              onChange={({ target: { value } }) =>
                handleContactEntry("contactemail", value)
              }
              value={props.scheduleInfo.contactemail}
            />
            {props.errors?.contactemail && (
              <InfoMessage message={props.errors.contactemail} />
            )}
          </div>
        </div>
      </div>
      <div className='payments'>
        <h3>Payment</h3>
        {/* <p>Choose a payment option</p> */}
        {/* <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.WALLET && "active"
          } disabled`}
          // onClick={() => setPaymentOption(PAYMENT_TYPES.WALLET)}
        >
          <i className='bi bi-credit-card'></i>
          <p>
            <b>Pay with Wallet </b>
            <span>- NGN 5,000</span>
          </p>
        </div> */}
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
          {/* <input
            type='radio'
            checked={paymentOption === PAYMENT_TYPES.PAYSTACK}
          /> */}
        </div>
        {/* <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.OPAY && "active"
          } disabled`}
        >
          <img src={OpayLogo} alt='opay logo' />
          <p>
            <b>Pay with Opay </b>
          </p>
        </div> */}
        {/* <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.PAY_FOR_ME && "active"
          } disabled`}
        >
          <div className='user-icon'>
            <i className='bi bi-person-plus-fill'></i>
          </div>
          <p>
            <b>
              Pay for me <span>(Get a friend to pay for your wash)</span>{" "}
            </b>
          </p>
        </div> */}
        {/* <div className='coupon mt-3'>
          <input className='form-control' placeholder='Enter code here' />
          <button>Apply</button>
        </div> */}
      </div>
    </div>
  );
}
