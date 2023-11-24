import React from "react";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";

const Landing: React.FC = () => {
  return (
    <div className='app-landing'>
      <div className='app-landing_section-one'>
        <div className='container'>
          {/* <div className='row app-landing_section-one_header-container'>
            <div className='col-1'>
              <img src={FashWashLogo} alt='fash-wash' />
            </div>
            <div className='col-8'>
              <ul>
                <li>How it works</li>
                <li>Our Services</li>
                <li>Pricing</li>
                <li>Customers</li>
                <li>FAQs</li>
                <li>Locations</li>
              </ul>
            </div>
            <div className='col-3 login-section'>
              <p>Login</p>
              <button>Schedule Now</button>
            </div>
          </div> */}

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
            <div className='col-6 _location'>
              <div className='_location-info'>
                <i className='bi bi-geo-alt'></i>
                <p>Live in Yaba</p>
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
                  type='text'
                  className='form-control _location-input-wrapper-inputbox'
                  placeholder='Enter Pick up location'
                  aria-label='location-pickup'
                  aria-describedby='addon-wrapping'
                />
              </div>
              <button className='_location-schedule-button'>
                Schedule Pickup
              </button>
            </div>
          </div>
          <div className='row app-landing_section-two'>
            <div>
              <h1>Wash, dry, fold and delivered on the same day</h1>
              <div className='_attributes'>
                <div>
                  <p></p>
                  <div className=''>
                    <p>Affordable</p>
                    <p>Get your laundry pickup for as low as N1000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
