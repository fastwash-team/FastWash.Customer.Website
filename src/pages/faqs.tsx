import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";

export function FAQs() {
  const navigate = useNavigate();
  return (
    <div className='__dashboard faqs'>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 col-sm-12'>
            <div className=''>
              <i
                className='bi bi-arrow-left-short _back'
                onClick={() => navigate(-1)}
              />
              <br />
              <br />
              <h4>FAQs</h4>
              <h6>Get answers to questions people commonly ask at FastWash</h6>
              <div className='accordion' id='accordionExample'>
                <div className='accordion-item'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseOne'
                    aria-expanded='false'
                    aria-controls='collapseOne'
                  >
                    How do I schedule my first FastWash?
                  </button>

                  <div
                    id='collapseOne'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      You can click{" "}
                      <a href='/schedule-pickup' target='_blank'>
                        here
                      </a>{" "}
                      to schedule your first wash. Choose a convenient wash
                      schedule, select the number of washes and any laundry
                      extras, and make your payment. Each wash includes
                      detergent and a free wrap bag.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseTwo'
                    aria-expanded='false'
                    aria-controls='collapseTwo'
                  >
                    What is the latest time to schedule for pickup for that day?
                  </button>
                  <div
                    id='collapseTwo'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      The latest available time for scheduling a pickup is
                      typically around 3:30 PM to 4 PM to guarantee same-day
                      delivery of your laundry.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseThree'
                    aria-expanded='false'
                    aria-controls='collapseThree'
                  >
                    How many clothes are in one wash load?
                  </button>
                  <div
                    id='collapseThree'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      One Wash load usually consists of 10-25 items, but thicker
                      fabrics like duvets count as one full load. We recommend
                      washing more than 5 white items separately as a single
                      wash load to prevent staining. Additionally, you can opt
                      to include laundry extras like bleach for a thorough
                      cleaning.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseFour'
                    aria-expanded='false'
                    aria-controls='collapseFour'
                  >
                    What is Softener?
                  </button>
                  <div
                    id='collapseFour'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      Fabric softener a liquid used when washing clothes and
                      other laundry to soften the fabric, fight wrinkles, reduce
                      static and add a fresh scent to laundry.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseFive'
                    aria-expanded='false'
                    aria-controls='collapseFive'
                  >
                    Will I be notified prior to pick up or delivery of my
                    laundry?
                  </button>
                  <div
                    id='collapseFive'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      Yes, you will receive a notification within the hour your
                      laundry is to be picked up and delivered. Login to also
                      track your washes.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseSix'
                    aria-expanded='false'
                    aria-controls='collapseSix'
                  >
                    How do I make payment for my wash?
                  </button>
                  <div
                    id='collapseSix'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      You can make payment through our platform after you have
                      chosen the number of washes needed. Payment can be made
                      via card or bank transfer using Paystack or Opay payment
                      links.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapse7'
                    aria-expanded='false'
                    aria-controls='collapse7'
                  >
                    How does laundry service work?
                  </button>
                  <div
                    id='collapse7'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      We provide a Wash, Dry, and Fold service, handling laundry
                      on a per-load basis. Your clothes are washed, dried in a
                      tumble dryer, and carefully folded to maintain their
                      smoothness.
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <button
                    className='accordion-button collapsed'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapse8'
                    aria-expanded='false'
                    aria-controls='collapse8'
                  >
                    Can a customer add a delivery note?
                  </button>
                  <div
                    id='collapse8'
                    className='accordion-collapse collapse'
                    data-bs-parent='#accordionExample'
                  >
                    <div className='accordion-body'>
                      Instructions for Pickup and Delivery can be added in the
                      Laundry notes section. You will receive notifications
                      regarding the scheduled times for pickup and delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
}
