import React, { useRef, useEffect, useState } from "react";
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
import ReviewerOne from "../assets/svgs/customer-one.svg";
import ReviewerTwo from "../assets/svgs/customer-two.svg";
import QuotesMark from "../assets/svgs/quotation.svg";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

console.log("proces", process.env.GOOGLE_LOCATION_KEY);

const Landing: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [address, setAddress] = useState<string>("");
  const locations = [
    "Yaba",
    1500,
    "Gbagada",
    1500,
    "Surulere",
    1500,
    "Ikoyi",
    1500,
    "VI",
    1500,
    "Lekki Phase I",
    1500,
  ];

  useEffect(() => {
    const googleScript = document.createElement("script");
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key='AIzaSyCFTa4JnSNnsj0FmSDgOFr4ESmTUUUp1kE'&libraries=places`;
    googleScript.async = true;
    googleScript.defer = true;

    googleScript.onload = () => {
      // Initialize Autocomplete after Google Maps script is loaded
      if (inputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            types: ["geocode"],
            componentRestrictions: { country: "NG" },
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected Place:", place);
          setAddress(place.formatted_address || "");
        });
      }
    };

    document.head.appendChild(googleScript);

    return () => {
      // Cleanup: remove the script when the component unmounts
      document.head.removeChild(googleScript);
    };
  }, []); // Empty dependency array ensures that this useEffect runs only once on mount

  const handleSchedulePickup = () => {
    navigate("/schedule-pickup", { state: { address } });
  };

  return (
    <div className='app-landing'>
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
                  <a className='nav-link active' aria-current='page' href='#'>
                    How it works
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Our Services
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a className='nav-link' href='#'>
                    Pricing
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link'>Customers</a>
                </li>
              </ul>
              <div className='login-section'>
                <p>Login</p>
                <button>Schedule Now</button>
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
              <p className='_location-prompt'>Enter a pick location to start</p>
              <div className='input-group flex-nowrap _location-input-wrapper'>
                <span
                  className='input-group-text _location-input-wrapper-addon'
                  id='addon-wrapping'
                >
                  <i className='bi bi-geo-alt'></i>
                </span>
                <input
                  ref={inputRef}
                  type='text'
                  className='form-control _location-input-wrapper-inputbox'
                  placeholder='Enter Pick up location'
                  aria-label='location-pickup'
                  aria-describedby='addon-wrapping'
                />
              </div>
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
      <div className='app-landing_section-two'>
        {/* <div className='container'> */}
        <div className='_attributes'>
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

        <div className='container'>
          <div className='_services'>
            <h1>Our Services</h1>
            <div className='services-flex'>
              <div className='service'>
                <img src={CircleCalendar} alt='' />
                <h2>Pre Scheduled Wash</h2>
                <p>Do you want affordable pickup and delivery fee?</p>
                <p>
                  Select a pre-scheduled time for your location and have your
                  laundry, picked up, washed and delivered the same day.
                </p>
                <button>Schedule Bulk Pickup</button>
              </div>
              <div className='service'>
                <img src={CircleTruck} alt='' />
                <h2>Classic Wash</h2>
                <p>
                  Need your laundry picked up on your time? Looking for fast
                  delivery? We've got you covered!
                </p>
                <p>
                  We pick up your dirty laundry, get it washed, and deliver it
                  on time, all on the same day.
                </p>
                <button>Schedule Pickup</button>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='_pricing'>
            <h1>Pricing</h1>
            <div className='pricing-flex'>
              <div className='pricing'>
                <h2>One Wash</h2>
                <p className='_price'>N2700</p>
                <p className='_loads'>One load of laundry</p>
                <div className='_benefits'>
                  <p>One detergent</p>
                  <p>Free wrap bags</p>
                </div>
                <button className='pickup-button'>Schedule Pickup</button>
              </div>
              <div className='pricing'>
                <h2>Two Washes</h2>
                <p className='_price'>N4500</p>
                <p className='_loads'>Two loads of laundry</p>
                <div className='_benefits'>
                  <p>Two detergent</p>
                  <p>Free wrap bags</p>
                </div>
                <button className='pickup-button'>Schedule Pickup</button>
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
                <button className='pickup-button'>Schedule Pickup</button>
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
                <p>N250</p>
              </div>
              <div className='extra'>
                <p>Bleach</p>
                <p>N250</p>
              </div>
              <div className='extra'>
                <p>Color Catcher</p>
                <p>N300</p>
              </div>
              <div className='extra'>
                <p>Stain remover</p>
                <p>N500</p>
              </div>
              <div className='extra'>
                <p>Laundry Bags(E)</p>
                <p>N1500</p>
              </div>
              <div className='extra'>
                <p>Laundry Bags(X)</p>
                <p>N2500</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
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
                  <img src={ReviewerOne} alt='' />
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
                  <img src={ReviewerTwo} alt='' />
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
                  <img src={ReviewerOne} alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='app-landing_section-three'>
        <div className='container'>
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
                        <strong>
                          This is the first item's accordion body.
                        </strong>
                        It is shown by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
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
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default.
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
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default.
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
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div className='accordion' id='accordionExample'>
                  <div className='accordion-item'>
                    <button
                      className='accordion-button'
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
                        <strong>
                          This is the first item's accordion body.
                        </strong>{" "}
                        It is shown by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
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
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default.
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
                      How many clothes are in one wash load?
                    </button>
                    <div
                      id='collapse7'
                      className='accordion-collapse collapse'
                      data-bs-parent='#accordionExample'
                    >
                      <div className='accordion-body'>
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default.
                      </div>
                    </div>
                  </div>{" "}
                  <div className='accordion-item'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapse8'
                      aria-expanded='false'
                      aria-controls='collapse8'
                    >
                      What is Softener?
                    </button>
                    <div
                      id='collapse8'
                      className='accordion-collapse collapse'
                      data-bs-parent='#accordionExample'
                    >
                      <div className='accordion-body'>
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default.
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
              <p>Ikoyi</p>
              <p>VI</p>
              <p>Lekki Phase I</p>
            </div>
          </div>
        </div>
        <div className='_footer'>
          <div className='container'>
            <div className='_footer-elements'>
              <img src={FashWashTransparent} alt='' />
              <p>FastWash Technologies Nigeria Limited</p>
              <a>Terms & Conditions</a>
              <ul>
                <li>
                  <a>
                    <i className='bi bi-linkedin'></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i className='bi bi-facebook'></i>
                  </a>
                </li>
                <li>
                  <a>
                    <i className='bi bi-twitter'></i>
                  </a>
                </li>
                <li>
                  <a>
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
