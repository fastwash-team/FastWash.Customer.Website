import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { PaymentItem } from "../utils/types";
import { PaymentItemComponent } from "../components/listItem";
import { EmptyContainer } from "../components/empty-wash-item-list";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { errorHandler, getFWUserToken } from "../utils/functions";
import Skeleton from "react-loading-skeleton";
import { REACT_APP_API_BASE_URL } from "../utils/service/env.keys";

export const Payments = () => {
  const [items, setItems] = useState<[] | PaymentItem[]>([]);
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
        { headers: { Authorization: `Bearer ${userToken}` } },
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
  }, []);

  return (
    <div className="__dashboard">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 col-sm-12">
            <div className="_requests">
              <i
                className="bi bi-arrow-left-short _back"
                onClick={() => navigate(-1)}
              />
              <h3>Payments</h3>
              <h6>List of all your FastWash request payments</h6>
              <div className="list-container">
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
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};
