import { useNavigate } from "react-router-dom";
import WashingMachine from "../assets/svgs/washing-machine.svg";
import { Header } from "../components/header";
import { isUserLoggedIn } from "../utils/functions";
import { useEffect } from "react";

export function OrderCreateSuccess() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    sessionStorage.removeItem("currentWashOrder");
  }, []);

  return (
    <div className='schedule-pickup'>
      <Header />
      <div className='schedule-pickup__body'>
        <div className='schedule-pickup__body__steps-view'>
          <div className='row'>
            <div className='col-md-5 col-sm-12'>
              <div className='schedule-pickup__body__steps-view-render complete-schedule-screen'>
                <img src={WashingMachine} alt='' />
                <h2>FastWash request sent</h2>
                <center>
                  <p>
                    We are processing your request, a message has been sent to
                    your email.
                  </p>
                </center>
                {isUserLoggedIn() ? (
                  <p
                    className='btn_link'
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard <i className='bi bi-arrow-right-short'></i>
                  </p>
                ) : (
                  <button style={{ display: "inline" }} onClick={handleLogin}>
                    Login
                  </button>
                )}
              </div>
            </div>
            <div className='col-2'></div>
            <div className='col-md-5 col-sm-12 col-summary'>
              <div className='schedule-pickup__body__steps-tracker'>
                <h3>Track your wash easily</h3>
                <p className='sub-text'>
                  Log into your account with your email to track progress of
                  your request. No password needed.
                </p>
                <div className='tracker-wrapper'>
                  <div className='step'>
                    <h4 className={`done`}>Received</h4>
                    <p>Your request is being processed for pickup</p>
                  </div>
                  <div className='step'>
                    <h4 className={`processing`}>Pickup</h4>
                    <p className='placeholder-text'>
                      Your clothes have been picked up
                    </p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Washing</h4>
                    <p className='placeholder-text'>
                      Your clothes are currently being washed
                    </p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Drying</h4>
                    <p className='placeholder-text'>
                      Your clothes are currently being dried
                    </p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Folding</h4>
                    <p className='placeholder-text'>
                      Your clothes are currently being folded and getting ready
                      for delivery
                    </p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Delivering</h4>
                    <p className='placeholder-text'>
                      We are on our way to deliver your clothes
                    </p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Completed</h4>
                    <p className='placeholder-text'>
                      Your clothes have been delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
