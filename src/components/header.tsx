import { useLocation, useNavigate } from "react-router-dom";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import { logout } from "../utils/functions";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticatedRoutes = ["/dashboard", "/requests"];
  const isAuthenticated = authenticatedRoutes.includes(location.pathname); // the condition changes over time

  const handleLogout = () => {
    logout();
    return navigate("/login");
  };

  return (
    <div className='schedule-pickup__header'>
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
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'></ul>
          {isAuthenticated ? (
            <button className='d-flex' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className='d-flex'>Menu</button>
          )}
        </div>
      </nav>
    </div>
  );
}
