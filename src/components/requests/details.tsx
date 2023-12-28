import { useNavigate } from "react-router-dom";
import { Header } from "../header";

export const RequestDetailPage = () => {
  const navigate = useNavigate();
  return (
    <div className='__dashboard'>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 col-sm-12'>
            <div className='_requests'>
              <i
                className='bi bi-arrow-left-short _back'
                onClick={() => navigate(-1)}
              />
              <div className='details-item-header status'>
                <h3>#FWash 09680</h3>
                <span className={"received"}>Received</span>
              </div>
              <div className='details-item'>
                <p>Service Type</p>
                <span>Pre-Scheduled Wash</span>
              </div>
              <div className='details-item'>
                <p>Pick up Time</p>
                <span>09:00 am</span>
              </div>
              <div className='details-item'>
                <p>Delivery Time</p>
                <span>Today</span>
              </div>
              <div className='details-item'>
                <p>
                  Logistics <i className='bi bi-info-circle-fill'></i>
                </p>
                <span>NGN 0.00</span>
              </div>
              <div className='details-item'>
                <p>One Wash</p>
                <span>NGN 2700</span>
              </div>
              <div className='details-item'>
                <p>Softener</p>
                <span>NGN 250</span>
              </div>

              <div className='tracking'>
                <h4>Track</h4>
                <div className='tracker-wrapper'>
                  <div className='step'>
                    <h4 className={`done`}>Received</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`processing`}>Pickup</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Wash</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Dry</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Fold</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Deliver</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={``}>Completed</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
};
