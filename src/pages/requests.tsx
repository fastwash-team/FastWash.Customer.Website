import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { WashItem } from "../utils/types";
import { WashItemComponent } from "../components/listItem";
import { EmptyContainer } from "../components/empty-wash-item-list";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorHandler, getFWUserToken } from "../utils/functions";
import Skeleton from "react-loading-skeleton";
import { REACT_APP_API_BASE_URL } from "../utils/service/env.keys";

export const Requests = () => {
  const searchWashStatusEnum: { active: number; completed: number } = {
    active: 1,
    completed: 2,
  };
  const [pageLoading, setPageLoading] = useState(true);
  const [activeState, setActiveState] =
    useState<keyof typeof searchWashStatusEnum>("active");
  const [items, setItems] = useState<[] | WashItem[]>([]);
  const navigate = useNavigate();
  const userToken = getFWUserToken();
  const location = useLocation();

  useEffect(() => {
    if (location.state) setActiveState(location.state.status);
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
  }, [activeState]);

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
  );
};
