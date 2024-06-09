import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header";
import {
  formatMoney,
  getFWUserToken,
  getWashServiceType,
} from "../../utils/functions";
import { WashItemData } from "../../utils/types";
import moment from "moment";
import axios from "axios";
import { useEffect } from "react";

export const RequestDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userToken = getFWUserToken();
  console.log({ state });

  const statuses = [
    "Received",
    "Pickup",
    "Washing",
    "Drying",
    "Folding",
    "Delivering",
    "Completed",
  ];
  const currentStatusIndex = statuses.findIndex(
    (el) => el === state.washStatus
  );
  const mappedStatuses = statuses.map((el, key) => {
    if (key < currentStatusIndex || key === currentStatusIndex) {
      return { status: el, completed: true, disabled: true, enumNum: key + 1 };
    }
    if (key === currentStatusIndex + 1)
      return {
        status: el,
        completed: false,
        disabled: false,
        enumNum: key + 1,
      };
    return { status: el, completed: false, disabled: true, enumNum: key + 1 };
  });
  const isStepDone = (statusIndex: number) => {
    const res = new Map(
      mappedStatuses.map((status) => [status.enumNum, status])
    );
    console.log("sds", res.get(statusIndex)?.completed);
    return res.get(statusIndex)?.completed ? "done" : "";
  };

  const getAnOrderById = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/${state.washOrderId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      console.log({ res });
    } catch (error) {
      console.log("sdf", error);
    }
  };

  useEffect(() => {
    if (!state?.washOrderId) return;
    getAnOrderById();
  }, [state]);

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
                <h3>#{state.washOrderReference}</h3>
                <span className={state.washStatus.toLowerCase()}>
                  {state.washStatus}
                </span>
              </div>
              <div className='details-item'>
                <p>Service Type</p>
                <span>
                  {getWashServiceType(state.washOrderData.serviceType)}
                </span>
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
                    <h4 className={`${isStepDone(1)}`}>Received</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`${isStepDone(2)}`}>Pickup</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`${isStepDone(3)}`}>Wash</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`${isStepDone(4)}`}>Dry</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`${isStepDone(5)}`}>Fold</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`${isStepDone(6)}`}>Deliver</h4>
                    <p>Your request is being processed for pickup</p>
                    <p className='time'>09:00 am</p>
                  </div>
                  <div className='step'>
                    <h4 className={`${isStepDone(7)}`}>Completed</h4>
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
