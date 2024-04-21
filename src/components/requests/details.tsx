import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header";
import { formatMoney } from "../../utils/functions";
import { WashItemData } from "../../utils/types";
import moment from "moment";

export const RequestDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log({ state });
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
                <h3>#FWash {state.washOrderId}</h3>
                <span className={state.washStatus.toLowerCase()}>
                  {state.washStatus}
                </span>
              </div>
              <div className='details-item'>
                <p>Service Type</p>
                <span>{state.washOrderData.serviceType}</span>
              </div>
              <div className='details-item'>
                <p>Pick up Time</p>
                <span>{state.washOrderData.pickupTime}</span>
              </div>
              <div className='details-item'>
                <p>Delivery Time</p>
                <span>
                  {moment(state.washOrderData.estimatedDeliveryTime).format(
                    "Do MMM, YYYY"
                  )}
                </span>
              </div>
              <div className='details-item'>
                <p>
                  Logistics <i className='bi bi-info-circle-fill'></i>
                </p>
                <span>
                  NGN {formatMoney(state?.washOrderData?.logisticsAmount || 0)}
                </span>
              </div>
              {(state.washOrderData.washItemData || []).map(
                (el: WashItemData, key: number) => (
                  <div className='details-item' key={key}>
                    <p>{el.itemName}</p>
                    <span>NGN {formatMoney(el.itemAmount)}</span>
                  </div>
                )
              )}
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
