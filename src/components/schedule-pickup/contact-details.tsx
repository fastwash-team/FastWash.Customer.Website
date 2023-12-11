import React from "react";

export function ContactDetails() {
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
        <div className='payment-option'>
          <i className='bi bi-credit-card'></i>
          <p>
            <b>Pay with Wallet </b>
            <span>- NGN 5,000</span>
          </p>
        </div>
      </div>
    </div>
  );
}
