import React, { useState } from "react";
import { AdminHeader } from "../components/admin/admin-header";
import { AdminOverview } from "../components/admin/admin-dashboard";
import { HelpCenter } from "../components/help-center";
import { AdminSchedule } from "../components/admin/admin-schedule";
import { CreateScheduleModal } from "../components/admin/modals/create-schedule";

export const AdminDashboard = () => {
  const [activeTabNo, setActiveTabNo] = useState(1);

  const renderComponentPerTab = () => {
    switch (activeTabNo) {
      case 1:
        return <AdminOverview />;
      case 2:
        return <AdminSchedule />;
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
                  Hi, <b>Gbolahan</b>
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
                      Add new schedule
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
                onClick={() => setActiveTabNo(1)}
              >
                Overview
              </li>
              <li
                className={activeTabNo === 2 ? "active" : ""}
                onClick={() => setActiveTabNo(2)}
              >
                Schedule
              </li>
              <li
                className={activeTabNo === 3 ? "active" : ""}
                onClick={() => setActiveTabNo(3)}
              >
                Requests
              </li>
              <li
                className={activeTabNo === 4 ? "active" : ""}
                onClick={() => setActiveTabNo(4)}
              >
                Payments
              </li>
              <li
                className={activeTabNo === 5 ? "active" : ""}
                onClick={() => setActiveTabNo(5)}
              >
                Coupons
              </li>
              <li
                className={activeTabNo === 6 ? "active" : ""}
                onClick={() => setActiveTabNo(6)}
              >
                Reports
              </li>
              <li
                className={activeTabNo === 7 ? "active" : ""}
                onClick={() => setActiveTabNo(7)}
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
        <CreateScheduleModal />
      </div>
    </div>
  );
};
