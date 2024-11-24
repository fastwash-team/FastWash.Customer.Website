import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler, getFWUserToken } from "../utils/functions";
import { REACT_APP_API_BASE_URL } from "../utils/services";
import axios from "axios";
import { toast } from "react-toastify";
import { Header } from "../components/header";
import EmailIcon from "../assets/svgs/email.icon.svg";
import PhoneIcon from "../assets/svgs/phone.icon.svg";
import WashingMachine from "../assets/svgs/small-washing-machine.svg";
import { Overlay } from "../components/overlay";
import { HelpCenter } from "./help-center";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [washes, setWashes] = useState({ active: 0, completed: 0 });
  const [showUserCard, setShowUserCard] = useState(false);
  const userToken = getFWUserToken();

  useEffect(() => {
    if (!userToken) {
      localStorage.clear();
      return navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleApiCalls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        }
      );
      setUser(responseObject);
    } catch (error) {
      const err = errorHandler(error);
      console.log({ err });
      toast.error(
        "Something went wrong getting user profile. Please try again later"
      );
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
        }
      );
      setWashes({
        active: responseObject?.activeOrders,
        completed: responseObject?.completedOrders,
      });
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleApiCalls = async () => {
    try {
      await Promise.all([handleGetUserProfile(), handleGetUserWashOrders()]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Overlay loading={loading}>
      <div className='__dashboard' onClick={() => setShowUserCard(false)}>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6 col-sm-12'>
              <div className='user-details'>
                <div className='name_'>
                  <h2>
                    Hi, <b>{user?.userName}</b>
                  </h2>
                  <p>How are you doing today?</p>
                </div>
                <div className='icon-user'>
                  <i
                    className='bi bi-person-fill'
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserCard(!showUserCard);
                    }}
                  ></i>
                  {showUserCard ? (
                    <div
                      className='user-card'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h3>{user.userName}</h3>
                      <p>
                        <img src={EmailIcon} alt='' />
                        {user.userEmail}
                      </p>
                      <p>
                        <img src={PhoneIcon} alt='' />
                        {user.userPhoneNumber}
                      </p>
                      <p>
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clip-path='url(#clip0_299_1234)'>
                            <path
                              d='M7.99992 1.3335C5.41992 1.3335 3.33325 3.42016 3.33325 6.00016C3.33325 9.50016 7.99992 14.6668 7.99992 14.6668C7.99992 14.6668 12.6666 9.50016 12.6666 6.00016C12.6666 3.42016 10.5799 1.3335 7.99992 1.3335ZM7.99992 7.66683C7.07992 7.66683 6.33325 6.92016 6.33325 6.00016C6.33325 5.08016 7.07992 4.3335 7.99992 4.3335C8.91992 4.3335 9.66658 5.08016 9.66658 6.00016C9.66658 6.92016 8.91992 7.66683 7.99992 7.66683Z'
                              fill='#666666'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_299_1234'>
                              <rect width='16' height='16' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                        '-'
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className='request-wash'>
                <h3>Request Wash</h3>
                <p>
                  Get your laundry done quickly and delivered today at an
                  affordable price
                </p>
                <a href='/schedule-pickup/1'>
                  Schedule Pickup <i className='bi bi-chevron-right'></i>
                </a>
                <img src={WashingMachine} alt='washing-machine' />
              </div>
              <div className='requests-boards'>
                <div
                  className='board'
                  onClick={() =>
                    navigate("/requests", { state: { status: "active" } })
                  }
                >
                  <div className='title'>
                    <h6>Pending Requests</h6>
                    <i className='bi bi-chevron-right'></i>
                  </div>
                  <h3>{washes.active}</h3>
                </div>
                <div
                  className='board'
                  onClick={() =>
                    navigate("/requests", { state: { status: "completed" } })
                  }
                >
                  <div className='title'>
                    <h6>Completed Wash</h6>
                    <i className='bi bi-chevron-right'></i>
                  </div>
                  <h3>{washes.completed}</h3>
                </div>
              </div>
              <div className='list-items'>
                <div className='item' onClick={() => navigate("/requests")}>
                  <div className='item-details'>
                    <div className='icon-wrapper'>
                      <i className='bi bi-file-earmark-text-fill'></i>
                    </div>
                    <div className='details'>
                      <h3>Requests</h3>
                      <p>
                        Track and see the status of all your laundry requests{" "}
                      </p>
                    </div>
                  </div>
                  <i className='bi bi-chevron-right'></i>
                </div>
                <div className='item' onClick={() => navigate("/payments")}>
                  <div className='item-details'>
                    <div className='icon-wrapper'>
                      <i className='bi bi-credit-card-2-back-fill'></i>
                    </div>
                    <div className='details'>
                      <h3>Payments</h3>
                      <p>See all your laundry requests payments here</p>
                    </div>
                  </div>
                  <i className='bi bi-chevron-right'></i>
                </div>
              </div>
              <HelpCenter />
            </div>
            <div className='col-md-3'></div>
          </div>
        </div>

        <div className='__dashboard-body'></div>
      </div>
    </Overlay>
  );
};
