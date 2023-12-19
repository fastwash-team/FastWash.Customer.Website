import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { PaymentItem } from "../utils/types";
import { PaymentItemComponent } from "../components/listItem";
import { EmptyContainer } from "../components/empty-wash-item-list";
import { useNavigate } from "react-router-dom";

export const Payments = () => {
  const [items, setItems] = useState<[] | PaymentItem[]>([]);
  const navigate = useNavigate();

  const fetchListByState = () => {
    setItems([
      {
        itemno: "#FWash 09380",
        status: "completed",
        date: "4th Oct",
        amount: 3500,
        currency: "NGN",
        type: "transfer",
      },
      {
        itemno: "#FWash 12399",
        status: "completed",
        date: "4th Oct",
        amount: 4500,
        currency: "NGN",
        type: "transfer",
      },
      {
        itemno: "#FWash 32033",
        status: "completed",
        date: "4th Oct",
        amount: 13500,
        currency: "NGN",
        type: "transfer",
      },
    ]);
  };

  useEffect(() => {
    fetchListByState();
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
                {!items.length ? (
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
