import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdminHeader } from "../components/admin/admin-header";
import { AdminOverview } from "../components/admin/admin-dashboard";
import { HelpCenter } from "../components/help-center";
import { AdminSchedule } from "../components/admin/admin-schedule";
import { CreateClassicScheduleModal } from "../components/admin/modals/create-classic-schedule";
import { AdminRequests } from "../components/admin/admin-requests";
import { CreatePreScheduleModal } from "../components/admin/modals/create-pre-schedule";
import { errorHandler, getFWAdminToken } from "../utils/functions";
import { useSearchParams } from "react-router-dom";
import { AdminPayments } from "../components/admin/admin-payments";

export const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [activeTabNo] = useState(Number(page));
  const adminToken = getFWAdminToken();
  const [user, setUser] = useState<{ userName?: string }>({});
  const [overviewData, setOverviewData] = useState({
    pendingClassic: 0,
    pendingReschedule: 0,
    allRequests: 0,
  });

  useEffect(() => {
    handleGetAdminDetails();
    handleGetOverviewData();
  }, []);

  const handleGetAdminDetails = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/Profiles/profile/external`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setUser(responseObject);
    } catch (error) {
      const err = errorHandler(error);
      console.log({ error, err }, "error");
    }
  };

  const handleGetOverviewData = async () => {
    try {
      const {
        data: {
          responseObject: { allOrders, classicOrders, preScheduledOrders },
        },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/order/pending/count`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setOverviewData({
        allRequests: allOrders,
        pendingClassic: classicOrders,
        pendingReschedule: preScheduledOrders,
      });
    } catch (error) {
      const errorMsg = errorHandler(error);
      console.log({ errorMsg });
    }
  };

  const renderComponentPerTab = () => {
    switch (activeTabNo) {
      case 1:
        return <AdminOverview overviewData={overviewData} />;
      case 2:
        return <AdminSchedule />;
      case 3:
        return <AdminRequests />;
      case 4:
        return <AdminPayments />;
      default:
        return <></>;
    }
  };

  return (
    <div className='__dashboard'>
      <AdminHeader />
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 col-sm-12'>
            <div className='search-wrapper'>
              <input className='form-control' placeholder='Enter request ID' />
            </div>
            <div className='user-details -admin'>
              <div className='name_'>
                <h2>
                  Hi, <b>{user?.userName}</b>
                </h2>
                <p>How are you doing today?</p>
              </div>
              <div className='dropdown'>
                <div
                  className='icon-user icon'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <i className='bi bi-plus'></i>
                </div>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className='dropdown-item'
                      data-bs-toggle='modal'
                      data-bs-target='#createSchedule'
                    >
                      Add Classic schedule
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      data-bs-toggle='modal'
                      data-bs-target='#createPreSchedule'
                    >
                      Add pre-schedule
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Add new user
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Add coupons
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ul className='admin-tabs'>
              <li
                className={activeTabNo === 1 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=1`)
                }
              >
                Overview
              </li>
              <li
                className={activeTabNo === 2 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=2`)
                }
              >
                Schedule
              </li>
              <li
                className={activeTabNo === 3 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=3`)
                }
              >
                Requests
              </li>
              <li
                className={activeTabNo === 4 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=4`)
                }
              >
                Payments
              </li>
              <li
                className={activeTabNo === 5 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=5`)
                }
              >
                Coupons
              </li>
              <li
                className={activeTabNo === 6 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=6`)
                }
              >
                Reports
              </li>
              <li
                className={activeTabNo === 7 ? "active" : ""}
                onClick={() =>
                  window.location.replace(`/admin/dashboard?page=7`)
                }
              >
                Settings
              </li>
            </ul>
            <div className='admin-tabs-content'>{renderComponentPerTab()}</div>
            <HelpCenter />
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
      <div className='form-modal'>
        <CreateClassicScheduleModal />
        <CreatePreScheduleModal />
      </div>
    </div>
  );
};
