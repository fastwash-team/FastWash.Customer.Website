import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header";
import {
  errorHandler,
  formatMoney,
  getFWUserToken,
  getWashServiceType,
} from "../../utils/functions";
import { RequestTracking, WashItemData } from "../../utils/types";
import moment from "moment";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { CustomTooltip } from "../tooltip";

export const RequestDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userToken = getFWUserToken();
  const [requestTracking, setRequestTracking] = useState([]);

  useEffect(() => {
    // call every 10 seconds
    const callOrderByStatusInterval = setInterval(getAnOrderStatusById, 10000);
    return () => clearInterval(callOrderByStatusInterval);
  }, []);

  const statuses = [
    "Pending",
    "Received",
    "Pickup",
    "Washing",
    "Drying",
    "Folding",
    "Delivering",
    "Completed",
  ];

  const getAnOrderStatusById = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/order/${state.washOrderId}/status`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (responseObject.length !== requestTracking.length)
        setRequestTracking(responseObject);
    } catch (error) {
      const errorMessage = errorHandler(error);
      return Swal.fire({
        title: "Error!",
        text: errorMessage || "Error fetching order by ID",
      });
    }
  };

  useEffect(() => {
    if (!state?.washOrderId) return;
    getAnOrderStatusById();
  }, [state]);

  const trackingMap = new Map(
    requestTracking.map((tracking: RequestTracking) => [
      tracking.washStatus,
      tracking,
    ])
  );

  const trackingSteps = useMemo(() => {
    return statuses.map((status) => {
      const details = trackingMap.get(status);
      return {
        status,
        isCompleted: !!details,
        message: details?.statusNotes || `Your order is being processed.`,
        time: details?.dateCreated
          ? moment(details.dateCreated).format("h:mm a")
          : "",
      };
    });
  }, [requestTracking]);

  const currentWashStatus = useMemo(() => {
    if (!requestTracking.length) return "Pending";
    const status = requestTracking[requestTracking.length - 1] as {
      washStatus: string;
    };
    return status.washStatus;
  }, [requestTracking]);

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
                <h3>#{state?.washOrderReference}</h3>
                <span className={currentWashStatus.toLowerCase()}>
                  {currentWashStatus}
                </span>
              </div>
              <div className='details-item'>
                <p>Service Type</p>
                <span>
                  {getWashServiceType(state?.washOrderData?.serviceType)}
                </span>
              </div>
              <div className='details-item'>
                <p>Pick up Time</p>
                <span>{state?.washOrderData?.pickupTime}</span>
              </div>
              <div className='details-item'>
                <p>Delivery Time</p>
                <span>
                  {moment(state?.washOrderData?.estimatedDeliveryTime).format(
                    "Do MMM, YYYY"
                  )}
                </span>
              </div>
              <div className='details-item'>
                <p>
                  Logistics{" "}
                  <CustomTooltip text={"Laundry Pickup and delivery fee"}>
                    <i className='bi bi-info-circle-fill' />
                  </CustomTooltip>
                </p>
                <span>
                  NGN {formatMoney(state?.washOrderData?.logisticsAmount || 0)}
                </span>
              </div>
              {(state?.washOrderData?.washItemData || []).map(
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
                  {trackingSteps.map((el) => (
                    <div
                      className={`step ${el.isCompleted ? "done" : ""} ${
                        currentWashStatus === el.status ? "last" : ""
                      }`}
                    >
                      <h4 className={`${el.isCompleted ? "done" : ""}`}>
                        {el.status}
                      </h4>
                      <p className='tracking-message'>
                        <span>{el.message}</span>
                      </p>
                      <p className='time'>{el.time}</p>
                    </div>
                  ))}
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
