import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { EmptyContainer } from "../components/empty";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorHandler, getFWUserToken } from "../utils/functions";
import Skeleton from "react-loading-skeleton";
import writtenNumber from "written-number";
import moment from "moment";
import { REACT_APP_API_BASE_URL } from "../utils/services";
import { Overlay } from "../components/overlay";

export const Requests = () => {
  const searchWashStatusEnum = {
    active: 1,
    completed: 2,
  };
  const [pageLoading, setPageLoading] = useState(true);
  const [activeState, setActiveState] = useState("active");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const userToken = getFWUserToken();
  const location = useLocation();

  useEffect(() => {
    if (location.state) setActiveState(location.state.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRequests = async () => {
    setPageLoading(true);
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/searchwashstatus?status=${searchWashStatusEnum[activeState]}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setItems(responseObject);
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeState]);

  return (
    <Overlay loading={pageLoading}>
      <div className='__dashboard'>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6 col-sm-12'>
              <div className='_requests'>
                <i
                  className='bi bi-arrow-left-short _back'
                  onClick={() => navigate("/dashboard")}
                />
                <h3>Requests</h3>
                <h6>List of all your FastWash requests</h6>
                <div className='menu-container-bg'>
                  <li
                    onClick={() => setActiveState("active")}
                    className={`${activeState === "active" && "active"}`}
                  >
                    Active
                  </li>
                  <li
                    onClick={() => setActiveState("completed")}
                    className={`${activeState === "completed" && "active"}`}
                  >
                    Completed
                  </li>
                </div>
                <div className='list-container'>
                  {pageLoading ? (
                    <Skeleton count={7} />
                  ) : !pageLoading && !items.length ? (
                    <EmptyContainer />
                  ) : (
                    <WashItemComponent items={items} />
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-3'></div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export const WashItemComponent = (props) => {
  const navigate = useNavigate();
  const navigateToDetails = (itemNumber) => {
    return navigate(`/request/${itemNumber}`, {
      state: props.items.find(
        (el) => Number(el.washOrderId) === Number(itemNumber)
      ),
    });
  };

  return (
    <div className='wash-items-container'>
      {props.items.map((el, key) => (
        <div
          className='wash-item'
          key={key}
          onClick={() => navigateToDetails(String(el.washOrderId))}
        >
          <div className='wash-item-no'>
            <div className='status'>
              <h2>#{el.washOrderReference}</h2>
              <span className={`${el.washStatus.toLowerCase()}`}>
                {el.washStatus}
              </span>
            </div>
            <i className='bi bi-chevron-right'></i>
          </div>
          <div className='wash-item-props'>
            <div className='wash-extras'>
              <p>
                {el.washOrderData.serviceType === "PreScheduledWash"
                  ? "Pre-Scheduled"
                  : el.washOrderData.serviceType}
              </p>
              <p>
                {writtenNumber(
                  el.washOrderData.washItemData.find(
                    (el) => el.itemName === "Washes"
                  )?.numberOfItem
                )}{" "}
                Washes
              </p>
              <p>
                {el?.washOrderData?.washItemData?.length
                  ? writtenNumber(el.washOrderData.washItemData.length - 1)
                  : "No"}{" "}
                Extra
                {el?.washOrderData?.washItemData?.length - 1 > 1 ? "s" : ""}
              </p>
            </div>
            <p className='date'>{moment(el.dateCreated).format("Do MMM.")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
