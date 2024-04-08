import React from "react";
import { PaymentItem, WashItem, WashItemData } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../utils/functions";
import moment from "moment";

export const WashItemComponent = (props: { items: WashItem[] }) => {
  const navigate = useNavigate();
  const navigateToDetails = (itemno: string) => {
    return navigate(`/requests/${itemno}`, {
      state: props.items.find(
        (el) => Number(el.washOrderId) === Number(itemno)
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
              <h2>#FWash {el.washOrderId}</h2>
              <span className={`${el.washStatus.toLowerCase()}`}>
                {el.washStatus}
              </span>
            </div>
            <i className='bi bi-chevron-right'></i>
          </div>
          <div className='wash-item-props'>
            <div className='wash-extras'>
              {(el.washOrderData.washItemData || []).map(
                (extra: WashItemData, key: number) => (
                  <p key={key}>{extra.itemName}</p>
                )
              )}
            </div>
            <p className='date'>{moment(el.dateCreated).format("Do MMM.")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const PaymentItemComponent = (props: { items: PaymentItem[] }) => {
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
              <p>FW-394030</p>
              <p>transfer</p>
              {/* <p>{el.itemno}</p>
              <p>{el.type}</p> */}
            </div>
            <p className='date'>{moment(el.dateCreated).format("Do MMM.")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
