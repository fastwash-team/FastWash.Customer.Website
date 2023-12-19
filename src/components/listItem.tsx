import React from "react";
import { PaymentItem, WashItem } from "../utils/types";

export const WashItemComponent = (props: { items: WashItem[] }) => {
  return (
    <div className='wash-items-container'>
      {props.items.map((el, key) => (
        <div className='wash-item' key={key}>
          <div className='wash-item-no'>
            <div className='status'>
              <h2>#FWash 09680</h2>
              <span className={`${el.status.toLowerCase()}`}>Received</span>
            </div>
            <i className='bi bi-chevron-right'></i>
          </div>
          <div className='wash-item-props'>
            <div className='wash-extras'>
              {el.extras.map((extra, key) => (
                <p key={key}>{extra}</p>
              ))}
            </div>
            <p className='date'>4th Oct.</p>
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
              <h2>
                {el.currency} {el.amount}
              </h2>
              <span className={`${el.status.toLowerCase()}`}>{el.status}</span>
            </div>
            <i className='bi bi-chevron-down'></i>
          </div>
          <div className='wash-item-props'>
            <div className='wash-extras'>
              <p>{el.itemno}</p>
              <p>{el.type}</p>
            </div>
            <p className='date'>4th Oct.</p>
          </div>
        </div>
      ))}
    </div>
  );
};
