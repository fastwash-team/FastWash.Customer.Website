import React, { useState } from "react";
import OpayLogo from "../../assets/svgs/OPay - png.png";
import PaystackLogo from "../../assets/svgs/paystack.svg";
import { PAYMENT_TYPES } from "../../utils";
import { CustomizeWashProps as ContactDetailsProps } from "../../utils/types";
import { InfoMessage } from "../info-message";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function ContactDetails(props: ContactDetailsProps) {
  console.log({ props });
  const [paymentOption, setPaymentOption] = useState<string | null>(
    PAYMENT_TYPES.PAYSTACK
  );

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
        />
        {props.errors?.contactperson && (
          <InfoMessage message={props.errors.contactperson} />
        )}
      </div>
      <div className='mt-3 mb-5'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <label>Phone number</label>
            <PhoneInput
              country={"ng"}
              onlyCountries={["ng"]}
              countryCodeEditable={false}
              inputProps={{
                class: "form-control",
              }}
              value={props.scheduleInfo.phonenumber}
              isValid={(value) => {
                if (value.length > 14 || value.length < 13) return false;
                return true;
              }}
              onChange={(phone) => handleContactEntry("phonenumber", phone)}
            />
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
            />
            {props.errors?.contactemail && (
              <InfoMessage message={props.errors.contactemail} />
            )}
          </div>
        </div>
      </div>
      <div className='payments'>
        <h3>Payment</h3>
        <p>Choose a payment option</p>
        <div
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
          } disabled`}
          // onClick={() => setPaymentOption(PAYMENT_TYPES.OPAY)}
        >
          <img src={OpayLogo} alt='opay logo' />
          <p>
            <b>Pay with Opay </b>
          </p>
          {/* <input type='radio' checked={paymentOption === PAYMENT_TYPES.OPAY} /> */}
        </div>
        <div
          className={`payment-option ${
            paymentOption === PAYMENT_TYPES.PAY_FOR_ME && "active"
          } disabled`}
          // onClick={() => setPaymentOption(PAYMENT_TYPES.PAY_FOR_ME)}
        >
          <div className='user-icon'>
            <i className='bi bi-person-plus-fill'></i>
          </div>
          <p>
            <b>
              Pay for me <span>(Get a friend to pay for your wash)</span>{" "}
            </b>
          </p>
          {/* <input
            type='radio'
            checked={paymentOption === PAYMENT_TYPES.PAY_FOR_ME}
          /> */}
        </div>
        <div className='coupon mt-3'>
          <input className='form-control' placeholder='Enter code here' />
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}
