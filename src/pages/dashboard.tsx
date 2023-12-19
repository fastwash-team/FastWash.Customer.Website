import React from "react";
import { Header } from "../components/header";
import WashingMachine from "../assets/svgs/small-washing-machine.svg";
import FaqMessage from "../assets/svgs/faq-message.svg";
import FaqCare from "../assets/svgs/faq-care.svg";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='__dashboard'>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 col-sm-12'>
            <div className='user-details'>
              <div className='name_'>
                <h2>
                  Hi, <b>Gbolahan</b>
                </h2>
                <p>How are you doing today?</p>
              </div>
              <div className='icon-user'>
                <i className='bi bi-person-fill'></i>
              </div>
            </div>
            <div className='request-wash'>
              <h3>Request Wash</h3>
              <p>
                Get your laundry done quickly and delivered today at an
                affordable price
              </p>
              <a>
                Schedule Pickup <i className='bi bi-chevron-right'></i>
              </a>
              <img src={WashingMachine} alt='washing-machine' />
            </div>
            <div className='requests-boards'>
              <div className='board'>
                <div className='title'>
                  <h6>Active Requests</h6>
                  <i className='bi bi-chevron-right'></i>
                </div>
                <h3>0</h3>
              </div>
              <div className='board'>
                <div className='title'>
                  <h6>Completed Wash</h6>
                  <i className='bi bi-chevron-right'></i>
                </div>
                <h3>10</h3>
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
            <div className='help-container'>
              <div className='help'>
                <img src={FaqMessage} alt='' />
                <h4>FAQs</h4>
                <p>Get answers to questions people commonly ask at FastWash</p>
              </div>
              <div className='help'>
                <img src={FaqCare} alt='' />
                <h4>Help & Support</h4>
                <p>Get the help you need anytime from our support team</p>
              </div>
            </div>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>

      <div className='__dashboard-body'></div>
    </div>
  );
};
