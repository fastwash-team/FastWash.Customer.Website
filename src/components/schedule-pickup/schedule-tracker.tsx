import React from "react";

export function ScheduleTracker() {
  return (
    <>
      <div className='schedule-pickup__body__steps-tracker'>
        <h3>Track details of your request easily</h3>
        <p className='sub-text'>
          Log into your account with your email to track progress of your
          request. No password needed.
        </p>
        <div className='tracker-wrapper'>
          <div className='step'>
            <h4 className={`done`}>Received</h4>
            <p>Your request is being processed for pickup</p>
          </div>
          <div className='step'>
            <h4 className={`processing`}>Pickup</h4>
            <p>Your request is being processed for pickup</p>
          </div>
          <div className='step'>
            <h4 className={``}>Wash</h4>
            <p>Your request is being processed for pickup</p>
          </div>
          <div className='step'>
            <h4 className={``}>Dry</h4>
            <p>Your request is being processed for pickup</p>
          </div>
          <div className='step'>
            <h4 className={``}>Fold</h4>
            <p>Your request is being processed for pickup</p>
          </div>
        </div>
        <button className='login-btn'>Login</button>
      </div>
      {/* <div className='schedule-pickup__body__steps-tracker_mobile'>
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
                    <b></b>
                  </div>
                  <div className='item'>
                    <span>Pick up Time</span>
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
      </div> */}
    </>
  );
}
