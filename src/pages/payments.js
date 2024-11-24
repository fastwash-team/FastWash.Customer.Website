import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { Header } from "../components/header";
import { errorHandler, formatMoney, getFWUserToken } from "../utils/functions";
import { REACT_APP_API_BASE_URL } from "../utils/services";
import { EmptyContainer } from "../components/empty";
import moment from "moment";

export const Payments = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const userToken = getFWUserToken();
  const [pageLoading, setPageLoading] = useState(true);

  const fetchPayments = async () => {
    setPageLoading(true);
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/payment/history`,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setItems(responseObject);
    } catch (error) {
      errorHandler(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <h3>Payments</h3>
              <h6>List of all your FastWash request payments</h6>
              <div className='list-container'>
                {pageLoading ? (
                  <Skeleton count={7} />
                ) : !pageLoading && !items.length ? (
                  <EmptyContainer />
                ) : (
                  <PaymentItemComponent items={items} />
                )}
              </div>
            </div>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
};

export const PaymentItemComponent = (props) => {
  return (
    <div className='wash-items-container'>
      {props.items.map((el, key) => (
        <div className='wash-item' key={key}>
          <div className='wash-item-no'>
            <div className='status'>
              <h2>#{formatMoney(el.transactionAmount)}</h2>
              <span className={`${el.transactionStatus.toLowerCase()}`}>
                {el.transactionStatus}
              </span>
            </div>
            <i className='bi bi-chevron-down'></i>
          </div>
          <div className='wash-item-props'>
            <div className='wash-extras'>
              <p>{el.washOrderReference}</p>
              <p>transfer</p>
            </div>
            <p className='date'>{moment(el.dateCreated).format("Do MMM.")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
