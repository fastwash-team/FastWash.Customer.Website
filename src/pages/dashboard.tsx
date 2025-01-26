import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/header";
import WashingMachine from "../assets/svgs/small-washing-machine.svg";
import { useNavigate } from "react-router-dom";
import { HelpCenter } from "../components/help-center";
import { errorHandler, getFWUserToken } from "../utils/functions";
import { REACT_APP_API_BASE_URL } from "../utils/service/env.keys";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    userName?: string;
    userEmail?: string;
    userPhoneNumber?: string;
  }>({});
  const [washes, setWashes] = useState({ active: 0, completed: 0 });
  const [showUserCard, setShowUserCard] = useState(false);

  const userToken = getFWUserToken();

  useEffect(() => {
    if (!userToken) {
      localStorage.clear();
      navigate("/login");
    }
  }, []);

  const handleGetUserProfile = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/Profiles/profile/external`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setUser(responseObject);
    } catch (error) {
      const err = errorHandler(error);
      console.log({ err });
    }
  };

  const handleGetUserWashOrders = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/order/count`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      setWashes({
        active: responseObject?.activeOrders,
        completed: responseObject?.completedOrders,
      });
    } catch (error) {
      errorHandler(error);
      console.log({ error });
    }
  };

  useEffect(() => {
    handleGetUserProfile();
    handleGetUserWashOrders();
  }, []);

  return (
    <div className="__dashboard" onClick={() => setShowUserCard(false)}>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 col-sm-12">
            <div className="user-details">
              <div className="name_">
                <h2>
                  Hi, <b>{user?.userName}</b>
                </h2>
                <p>How are you doing today?</p>
              </div>
              <div className="icon-user">
                <i
                  className="bi bi-person-fill"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserCard(!showUserCard);
                  }}
                ></i>
                {showUserCard ? (
                  <div
                    className="user-card"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3>{user.userName}</h3>
                    <p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_299_1231)">
                          <path
                            d="M13.3333 2.6665H2.66659C1.93325 2.6665 1.33992 3.2665 1.33992 3.99984L1.33325 11.9998C1.33325 12.7332 1.93325 13.3332 2.66659 13.3332H13.3333C14.0666 13.3332 14.6666 12.7332 14.6666 11.9998V3.99984C14.6666 3.2665 14.0666 2.6665 13.3333 2.6665ZM13.3333 5.33317L7.99992 8.6665L2.66659 5.33317V3.99984L7.99992 7.33317L13.3333 3.99984V5.33317Z"
                            fill="#666666"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_299_1231">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {user.userEmail}
                    </p>
                    <p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_299_1228)">
                          <path
                            d="M13.34 10.2533C12.52 10.2533 11.7267 10.12 10.9867 9.88C10.7533 9.8 10.4933 9.86 10.3133 10.04L9.26667 11.3533C7.38 10.4533 5.61333 8.75333 4.67333 6.8L5.97333 5.69333C6.15333 5.50667 6.20667 5.24667 6.13333 5.01333C5.88667 4.27333 5.76 3.48 5.76 2.66C5.76 2.3 5.46 2 5.1 2H2.79333C2.43333 2 2 2.16 2 2.66C2 8.85333 7.15333 14 13.34 14C13.8133 14 14 13.58 14 13.2133V10.9133C14 10.5533 13.7 10.2533 13.34 10.2533Z"
                            fill="#666666"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_299_1228">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {user.userPhoneNumber}
                    </p>
                    <p>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_299_1234)">
                          <path
                            d="M7.99992 1.3335C5.41992 1.3335 3.33325 3.42016 3.33325 6.00016C3.33325 9.50016 7.99992 14.6668 7.99992 14.6668C7.99992 14.6668 12.6666 9.50016 12.6666 6.00016C12.6666 3.42016 10.5799 1.3335 7.99992 1.3335ZM7.99992 7.66683C7.07992 7.66683 6.33325 6.92016 6.33325 6.00016C6.33325 5.08016 7.07992 4.3335 7.99992 4.3335C8.91992 4.3335 9.66658 5.08016 9.66658 6.00016C9.66658 6.92016 8.91992 7.66683 7.99992 7.66683Z"
                            fill="#666666"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_299_1234">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      '-'
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="request-wash">
              <h3>Request Wash</h3>
              <p>
                Get your laundry done quickly and delivered today at an
                affordable price
              </p>
              <a href="/schedule-pickup/1">
                Schedule Pickup <i className="bi bi-chevron-right"></i>
              </a>
              <img src={WashingMachine} alt="washing-machine" />
            </div>
            <div className="requests-boards">
              <div
                className="board"
                onClick={() =>
                  navigate("/requests", { state: { status: "active" } })
                }
              >
                <div className="title">
                  <h6>Pending Requests</h6>
                  <i className="bi bi-chevron-right"></i>
                </div>
                <h3>{washes.active}</h3>
              </div>
              <div
                className="board"
                onClick={() =>
                  navigate("/requests", { state: { status: "completed" } })
                }
              >
                <div className="title">
                  <h6>Completed Wash</h6>
                  <i className="bi bi-chevron-right"></i>
                </div>
                <h3>{washes.completed}</h3>
              </div>
            </div>
            <div className="list-items">
              <div className="item" onClick={() => navigate("/requests")}>
                <div className="item-details">
                  <div className="icon-wrapper">
                    <i className="bi bi-file-earmark-text-fill"></i>
                  </div>
                  <div className="details">
                    <h3>Requests</h3>
                    <p>
                      Track and see the status of all your laundry requests{" "}
                    </p>
                  </div>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
              <div className="item" onClick={() => navigate("/payments")}>
                <div className="item-details">
                  <div className="icon-wrapper">
                    <i className="bi bi-credit-card-2-back-fill"></i>
                  </div>
                  <div className="details">
                    <h3>Payments</h3>
                    <p>See all your laundry requests payments here</p>
                  </div>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
            <HelpCenter />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>

      <div className="__dashboard-body"></div>
    </div>
  );
};
