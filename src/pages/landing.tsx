import React, { useState } from "react";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import FashWashTransparent from "../assets/imgs/fash-wash-transparent.png";
import Hanger from "../assets/svgs/hanger.svg";
import AffordableWallet from "../assets/svgs/affordable-wallet.svg";
import CustomerCare from "../assets/svgs/customer.svg";
import LaundryBag from "../assets/svgs/laundry-bag.svg";
import Motorcycle from "../assets/svgs/motorcycle.svg";
import Calendar from "../assets/svgs/calender-half.svg";
import CircleCalendar from "../assets/svgs/circle-calendar.svg";
import CircleTruck from "../assets/svgs/circle-truck.svg";
import ReviewerOne from "../assets/imgs/reviewer-one.jpg";
import ReviewerTwo from "../assets/imgs/reviewer-two.jpg";
import QuotesMark from "../assets/svgs/quotation.svg";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { GoogleAddressInput } from "../components/google-input/google-address-input";
import { WASH_PRICES } from "../utils";
import { isUserLoggedIn } from "../utils/functions";

const Landing: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();

  const locations = [
    "Yaba/Shomolu",
    1500,
    "Gbagada",
    1500,
    "Surulere",
    1500,
    "Maryland Ikeja",
    1500,
    "Ikoyi/VI",
    1500,
    "Lekki Phase I",
    1500,
  ];

  const handleSchedulePickup = () => {
    navigate("/schedule-pickup/1", { state: { address } });
    return window.scrollTo({ top: 0 });
  };

  return (
    <div className='app-landing' data-bs-spy='scroll'>
      <div className='app-landing_section-one'>
        <div className='container'>
          <nav className='navbar navbar-expand-lg app-landing_section-one_header-container'>
            <a className='navbar-brand' href='#'>
              <img src={FashWashLogo} alt='fash-wash' />
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
                  <a
                    className='nav-link active'
                    aria-current='page'
                    href='#how-it-works'
                  >
                    How it works
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#services'>
                    Our Services
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a className='nav-link' href='#pricing'>
                    Pricing
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#customers'>
                    Customers
                  </a>
                </li>
              </ul>
              <div className='login-section'>
                {isUserLoggedIn() ? (
                  <a href='/dashboard'>Dashboard</a>
                ) : (
                  <a href='/login'>Login</a>
                )}
                <button onClick={handleSchedulePickup}>Schedule Now</button>
              </div>
            </div>
          </nav>
          <div className='row app-landing_section-one_body'>
            <div className='col-md-6 col-sm-12 _location'>
              <div className='_location-info'>
                <i className='bi bi-geo-alt'></i>
                <p>
                  Live in{" "}
                  <TypeAnimation
                    sequence={locations}
                    speed={40}
                    repeat={Infinity}
                    cursor={false}
                  />
                </p>
              </div>
              <h1>
                Affordable laundry service in less than <span>24 hours</span>
              </h1>
              <p className='_location-prompt' id='pickup-address'>
                Enter a pick location to start
              </p>
              <GoogleAddressInput
                handleChange={(address: string) => setAddress(address)}
                address={address}
              />
              <button
                className='_location-schedule-button'
                onClick={handleSchedulePickup}
              >
                Schedule Pickup
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='app-landing_section-two' data-bs-spy='scroll'>
        {/* <div className='container'> */}
        <div className='_attributes' id='how-it-works'>
          <div className='container'>
            <h1 className='attributes_head'>
              Wash, dry, fold and delivered on the same day
            </h1>
            <div className='_attributes-body'>
              <div className='_attributes-body-item'>
                <p className='icon-wrapper'>
                  <img src={AffordableWallet} />
                </p>
                <div className=''>
                  <p className='header'>Affordable</p>
                  <p className='info'>
                    Get your laundry pickup for as low as N1000
                  </p>
                </div>
              </div>
              <div className='_attributes-body-item'>
                <p className='icon-wrapper'>
                  <img src={Hanger} />
                </p>
                <div className=''>
                  <p className='header'>Convenience</p>
                  <p className='info'>Tailored services for your comfort.</p>
                </div>
              </div>
              <div className='_attributes-body-item'>
                <p className='icon-wrapper'>
                  <img src={CustomerCare} />
                </p>
                <div className=''>
                  <p className='header'>Fast</p>
                  <p className='info'>Same day delivery on all requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='benefit'>
            <h1>Pack up your Laundry</h1>
            <p>Gather all your dirty laundry in a bag</p>
            <p>
              One wash load typically consists of either one duvet or
              approximately 15 to 25 items of clothing.
            </p>
            <p>
              We offer complimentary wrap bags with every order, or you can opt
              to include a laundry bag in your laundry cycle.
            </p>
            <img src={LaundryBag} alt='' />
          </div>
          <div className='benefits-flex'>
            <div className='benefit'>
              <h1>Schedule Wash</h1>
              <p>
                Enter your address, choose your desired <br />
                service, and the your most convenient <br /> schedule.
              </p>
              <p>
                Select the number of washes and any
                <br /> other laundry extras you may need.
              </p>
              <p>
                Simple make payment, your fast and <br />
                convenient laundry experience begins.
              </p>
              <img src={Calendar} alt='' />
            </div>
            <div className='benefit'>
              <h1>Fast Cycle</h1>
              <p className='check-icon'>Pickup Laundry</p>
              <p className='check-icon'>Wash Laundry</p>
              <p className='check-icon'>Dry Laundry</p>
              <p className='check-icon'>Fold Laundry</p>
              <p className='check-icon'>Deliver Laundry the same day</p>
              <img src={Motorcycle} alt='' />
            </div>
          </div>
        </div>

        <div className='container' id='services'>
          <div className='_services'>
            <h1>Our Services</h1>
            <div className='services-flex'>
              <div className='service'>
                <img src={CircleCalendar} alt='' />
                <div className='_text-section'>
                  <h2>Pre Scheduled Wash</h2>
                  <p>Do you want affordable pickup and delivery fee?</p>
                  <p>
                    Select a pre-scheduled time for your location and have your
                    laundry, picked up, washed and delivered the same day.
                  </p>
                </div>
                <a
                  href='/schedule-pickup/1'
                  type='button'
                  className='schedule-pickup-btn'
                >
                  Schedule Pickup
                </a>
              </div>
              <div className='service'>
                <img src={CircleTruck} alt='' />
                <div className='_text-section'>
                  <h2>Classic Wash</h2>
                  <p>
                    Need your laundry picked up on your time? Looking for fast
                    delivery? We've got you covered!
                  </p>
                  <p>
                    We pick up your dirty laundry, get it washed, and deliver it
                    on time, all on the same day.
                  </p>
                </div>
                <a
                  href='/schedule-pickup/1'
                  type='button'
                  className='schedule-pickup-btn'
                >
                  Schedule Pickup
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='container' id='pricing'>
          <div className='_pricing'>
            <h1>Pricing</h1>
            <div className='pricing-flex'>
              <div className='pricing'>
                <h2>One Wash</h2>
                <p className='_price'>N{WASH_PRICES.WASH}</p>
                <p className='_loads'>One load of laundry</p>
                <div className='_benefits'>
                  <p>One detergent</p>
                  <p>Free wrap bags</p>
                </div>
                <a
                  href='/schedule-pickup/1'
                  type='button'
                  className='schedule-pickup-btn'
                >
                  Schedule Pickup
                </a>
              </div>
              <div className='pricing'>
                <h2>Two Washes</h2>
                <p className='_price'>N{WASH_PRICES.TWO_WASHES}</p>
                <p className='_loads'>Two loads of laundry</p>
                <div className='_benefits'>
                  <p>Two detergent</p>
                  <p>Free wrap bags</p>
                </div>
                <a
                  href='/schedule-pickup/1'
                  type='button'
                  className='schedule-pickup-btn'
                >
                  Schedule Pickup
                </a>
              </div>
              <div className='pricing'>
                <h2>PRO</h2>
                <p className='_price'>2+ washes</p>
                <p className='_loads'>Minimum of three loads of laundry</p>
                <div className='_benefits'>
                  <p>Discounted wash</p>
                  <p>Detergents</p>
                  <p>Free wrap bags</p>
                </div>
                <a
                  href='/schedule-pickup/1'
                  type='button'
                  className='schedule-pickup-btn'
                >
                  Schedule Pickup
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='_extras'>
            <h1>Extras</h1>
            <div className='_extras-box'>
              <div className='extra'>
                <p>Softner</p>
                <p>N{WASH_PRICES.SOFTENER}</p>
              </div>
              <div className='extra'>
                <p>Bleach</p>
                <p>N{WASH_PRICES.BLEACH}</p>
              </div>
              <div className='extra'>
                <p>Color Catcher</p>
                <p>N{WASH_PRICES.COLOR_CATCHER}</p>
              </div>
              <div className='extra'>
                <p>Extra Detergent</p>
                <p>N{WASH_PRICES.EXTRA_DETERGENT}</p>
              </div>
              <div className='extra'>
                <p>Dryer Sheets</p>
                <p>N{WASH_PRICES.DRYER_SHEETS}</p>
              </div>
              <div className='extra'>
                <p>Laundry Bags(E)</p>
                <p>N{WASH_PRICES.E_LAUNDRY_BAGS}</p>
              </div>
              <div className='extra'>
                <p>Laundry Bags(X)</p>
                <p>N{WASH_PRICES.X_LAUNDRY_BAGS}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container' id='customers'>
          <div className='_reviews'>
            <h1>What our customers are saying</h1>
            <div className='reviews-flex'>
              <div className='review-container'>
                <img
                  src={QuotesMark}
                  alt='quotemarks'
                  className='quotes-mark'
                />
                <p>
                  FastWash is incredibly efficient and reliable. Their services
                  are truly express. I particularly like the scent of my laundry
                  when they deliver. They mentioned it's due to the laundry
                  softener they use. All in all, I'm quite pleased with their
                  service.
                </p>
                <div className='reviewer'>
                  <div className='info'>
                    <span>Ayomide</span>
                    <span>Architect</span>
                  </div>
                  <div className='_wrapper'>
                    <img src={ReviewerOne} alt='' className='img-fluid' />
                  </div>
                </div>
              </div>
              <div className='review-container'>
                <img
                  src={QuotesMark}
                  alt='quotemarks'
                  className='quotes-mark'
                />
                <p>
                  My first time using FastWash and I tried the classic wash
                  option. The experience was superb, I was impressed with the
                  speed of their service. I had my laundry back in less than 3
                  hours, all neatly folded.
                </p>
                <div className='reviewer'>
                  <div className='info'>
                    <span>Yusuf Hakeem</span>
                    <span>Chef</span>
                  </div>
                  <div className='_wrapper'>
                    <img src={ReviewerTwo} alt='' className='img-fluid' />
                  </div>
                </div>
              </div>
              <div className='review-container'>
                <img
                  src={QuotesMark}
                  alt='quotemarks'
                  className='quotes-mark'
                />
                <p>
                  FastWash is a lifesaver! As a busy entrepreneur, I barely have
                  time for laundry. I am so relieved that FastWash takes care of
                  the most time-consuming chore for me, allowing me to save
                  time, money, and not worry about the weather.
                </p>
                <div className='reviewer'>
                  <div className='info'>
                    <span>David Olamide</span>
                    <span>Entrepreneur</span>
                  </div>
                  <div className='_wrapper'>
                    <img src={ReviewerOne} alt='' className='img-fluid' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='app-landing_section-three' data-bs-spy='scroll'>
        <div className='container' id='faq-questions'>
          <div className='_faqs'>
            <h1>Your questions, answered</h1>
            <div className='row'>
              <div className='col-md-6 col-sm-12'>
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
                        <a href='/schedule-pickup/1' target='_blank'>
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
                      What is the latest time to schedule for pickup for that
                      day?
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
                        One Wash load usually consists of 10-25 items, but
                        thicker fabrics like duvets count as one full load. We
                        recommend washing more than 5 white items separately as
                        a single wash load to prevent staining. Additionally,
                        you can opt to include laundry extras like bleach for a
                        thorough cleaning.
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
                        other laundry to soften the fabric, fight wrinkles,
                        reduce static and add a fresh scent to laundry.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div className='accordion' id='accordionExample'>
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
                        Yes, you will receive a notification within the hour
                        your laundry is to be picked up and delivered. Login to
                        also track your washes.
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
                        We provide a Wash, Dry, and Fold service, handling
                        laundry on a per-load basis. Your clothes are washed,
                        dried in a tumble dryer, and carefully folded to
                        maintain their smoothness.
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
          </div>
        </div>
        <div className='container'>
          <div className='_current-location'>
            <h1>Currently live in</h1>
            <div>
              <p>Yaba</p>
              <p>Gbagada</p>
              <p>Surulere</p>
              <p>Maryland Ikeja</p>
              <p>Ikoyi/VI</p>
              <p>Lekki Phase I</p>
            </div>
          </div>
        </div>
        <div className='_footer'>
          <div className='container'>
            <div className='_footer-elements'>
              <div className='logo-section'>
                <img src={FashWashTransparent} alt='' />
                <p>FastWash Technologies Limited</p>
              </div>
              <a href='/terms'>Terms & Conditions</a>
              <ul>
                <li>
                  <a
                    href='https://x.com/fastwashafrica?s=11&t=UY9bR4lRRRLR9aj6XjKa4g'
                    target='_blank'
                  >
                    <i className='bi bi-twitter'></i>
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.instagram.com/fastwashafrica?igsh=bGQ5cHA1cHRqaXF4&utm_source=qr'
                    target='_blank'
                  >
                    <i className='bi bi-instagram'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
