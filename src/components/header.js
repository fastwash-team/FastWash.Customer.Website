import { useNavigate } from "react-router-dom";
import FashWashLogo from "../assets/imgs/fashwash-logo.png";
import { getFWUserToken, logUserOut } from "../utils/functions";
import Swal from "sweetalert2";

export function Header({ isExtendedHeader = false }) {
  const navigate = useNavigate();
  const isAuthenticated = !!getFWUserToken();

  const handleLogout = () => {
    return Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
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
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {isAuthenticated ? (
              <button className='d-flex logout' onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className='d-flex logout blue'
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </ul>
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
