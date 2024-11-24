import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import {
  errorHandler,
  formatMoney,
  getFWUserToken,
  getWashServiceType,
} from "../utils/functions";
import { Header } from "../components/header";
import { REACT_APP_API_BASE_URL } from "../utils/services";
import { CustomToolTip } from "../components/custom.tooltip";

export const RequestDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userToken = getFWUserToken();
  const [requestTracking, setRequestTracking] = useState([]);
  const [additionalOrder, setAdditionalOrder] = useState(null);

  useEffect(() => {
    if (!state?.washOrderId) return navigate("/requests");
    handleFetchAdditionalOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // call every 10 seconds
    const callOrderByStatusInterval = setInterval(getAnOrderStatusById, 10000);
    return () => clearInterval(callOrderByStatusInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        `${REACT_APP_API_BASE_URL}/api/WashOrders/order/${state.washOrderId}/status`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (responseObject.length !== requestTracking.length)
        setRequestTracking(responseObject);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      const errorMessage = errorHandler(error);
      if (error?.response && error?.response?.status === 401) return;
      return Swal.fire({
        title: "Error!",
        text:
          errorMessage ||
          "There was a problem fetching your order details. Please contact support.",
      });
    }
  };

  useEffect(() => {
    if (!state?.washOrderId) return;
    getAnOrderStatusById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const trackingMap = new Map(
    requestTracking.map((tracking) => [tracking.washStatus, tracking])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestTracking]);

  const currentWashStatus = useMemo(() => {
    if (!requestTracking.length) return "Pending";
    const status = requestTracking[requestTracking.length - 1];
    return status.washStatus;
  }, [requestTracking]);

  const handleFetchAdditionalOrder = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/${state?.washOrderId}/additionalorder/external`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setAdditionalOrder(responseObject);
    } catch (error) {}
  };

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
                  {getWashServiceType(state?.washOrderData?.serviceType) || "-"}
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
                  <CustomToolTip text={"Laundry Pickup and delivery fee"}>
                    <i className='bi bi-info-circle-fill' />
                  </CustomToolTip>
                </p>
                <span>
                  NGN {formatMoney(state?.washOrderData?.logisticsAmount || 0)}
                </span>
              </div>
              {(state?.washOrderData?.washItemData || []).map((el, key) => (
                <div className='details-item' key={key}>
                  <p>{el.itemName}</p>
                  <span>NGN {formatMoney(el.itemAmount)}</span>
                </div>
              ))}
              <div className='details-item'>
                <p>Order Total</p>
                <span>
                  NGN{" "}
                  {formatMoney(
                    state?.washOrderData?.transactionData?.transactionAmount ||
                      0
                  )}
                </span>
              </div>
              <div className='details-item'>
                <p>Location</p>
                <span>{state?.washOrderData?.location}</span>
              </div>
              <div className='details-item'>
                <p>Address</p>
                <span>{state?.washOrderData?.streetAddress}</span>
              </div>
              {additionalOrder ? (
                <AdditionalOrderComponent additionalOrder={additionalOrder} />
              ) : null}
              <div className='tracking'>
                <h4>Track</h4>
                <div className='tracker-wrapper'>
                  {trackingSteps.map((el, key) => (
                    <div
                      className={`step ${el.isCompleted ? "done" : ""} ${
                        currentWashStatus === el.status ? "last" : ""
                      }`}
                      key={key}
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

export const AdditionalOrderComponent = ({ additionalOrder }) => {
  return (
    <>
      <div className='additional-order-container'>
        <div className='header status'>
          <h5>Additional Order</h5>
          <span className={additionalOrder?.washStatus.toLowerCase()}>
            {additionalOrder?.washStatus}
          </span>
        </div>
        <div className='body'>
          <section>
            <div className='_section'>
              <h3>Wash Quantity</h3>
              <p>
                {additionalOrder?.washItemData?.find(
                  (el) => el.itemName.toLowerCase() === "washes"
                )?.numberOfItem || 0}{" "}
                Washes
              </p>
            </div>
            <div className='_section'>
              <h3>Payment</h3>
              <p>
                N
                {formatMoney(
                  additionalOrder?.washItemData?.reduce(
                    (acc, curr) => acc + Number(curr.itemAmount),
                    0
                  )
                )}
              </p>
            </div>
          </section>
          <section>
            <div className='_section'>
              <h3>Extras</h3>
              <p>
                {additionalOrder?.washItemData
                  ?.filter((el) => el.itemName?.toLowerCase() !== "washes")
                  ?.map(
                    (el, key) =>
                      `${el.itemName}(${el.numberOfItem})${
                        key <
                        additionalOrder.washItemData.filter(
                          (el) => el.itemName?.toLowerCase() !== "washes"
                        ).length -
                          1
                          ? ", "
                          : ""
                      }`
                  )}
              </p>
            </div>
            <div></div>
          </section>
        </div>
      </div>
      <div className='items hasBorderBottom'></div>
    </>
  );
};
