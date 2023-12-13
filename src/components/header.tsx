import FashWashLogo from "../assets/imgs/fashwash-logo.png";

export function Header() {
  return (
    <div className='schedule-pickup__header'>
      <nav className='navbar navbar-expand-lg app-landing_section-one_header-container'>
        <a className='navbar-brand' href='#'>
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
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <a className='nav-link active' aria-current='page' href='#'>
                How it works
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
