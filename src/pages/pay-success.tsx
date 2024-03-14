import { useNavigate } from "react-router-dom";
import WashingMachine from "../assets/svgs/washing-machine.svg";
import { Header } from "../components/header";

export function OrderCreateSuccess() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
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
                    your phone number and email
                  </p>
                </center>
                <button onClick={handleLogin}>Login</button>
              </div>
            </div>
            <div className='col-2'></div>
            <div className='col-md-5 col-sm-12 col-summary'>
              <div className='schedule-pickup__body__steps-tracker'>
                <h3>Track details of your request easily</h3>
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
                    <p>Your request is being processed for pickup</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Wash</h4>
                    <p>Your request is being processed for pickup</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Dry</h4>
                    <p>Your request is being processed for pickup</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Fold</h4>
                    <p>Your request is being processed for pickup</p>
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