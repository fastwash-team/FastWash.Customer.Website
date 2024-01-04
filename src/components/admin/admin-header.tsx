import React from "react";
import FashWashLogo from "../../assets/imgs/fashwash-logo.png";

export function AdminHeader() {
  return (
    <div className='schedule-pickup__header'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-md-6 col-xs-12'>
          <nav className='navbar navbar-expand-lg app-landing_section-one_header-container'>
            <a className='navbar-brand' href='/'>
              <img src={FashWashLogo} alt='fash-wash' className='img-fluid' />
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
              <ul className='navbar-nav me-auto mb-2 mb-lg-0 icons'>
                <li>
                  <i className='bi bi-bell-fill'></i>
                </li>
                <li>
                  <i className='bi bi-person-fill'></i>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className='col-3'></div>
      </div>
    </div>
  );
}
