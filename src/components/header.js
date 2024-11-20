import { useLocation, useNavigate } from "react-router-dom";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import { logUserOut } from "../utils/functions";
import Swal from "sweetalert2";

export function Header({ isExtendedHeader = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticatedRoutes = ["/dashboard", "/requests"];
  const isAuthenticated = authenticatedRoutes.includes(location.pathname); // the condition changes over time

  const handleLogout = () => {
    return Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Logout Successful!", "", "success");
        logUserOut();
        return navigate("/login");
      }
    });
  };

  return (
    <div className='schedule-pickup__header'>
      <nav className='navbar navbar-expand-lg _container'>
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
            <button className='d-flex logout' onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </nav>
      {isExtendedHeader ? (
        <div className='extended-header'>
          <h3>Terms & Conditions</h3>
        </div>
      ) : null}
    </div>
  );
}
