import moment from "moment";
import {
  formatMoney,
  // getFWAdminToken,
  // getFWUserToken,
  getWashServiceType,
} from "../../utils/functions";
import { AdminRequest } from "../../utils/types";
import { UpdateRequestStatus } from "./modals/update-request-status";
import { UpdateWash } from "./modals/update-wash";
// import axios from "axios";
// import { useState } from "react";

export function AdminRequestView({
  goBack,
  selectedRequest,
}: {
  goBack: () => void;
  selectedRequest: AdminRequest | null;
}) {
  // const [wash, setWash] = useState(selectedRequest);
  console.log({ selectedRequest });
  // const adminToken = getFWAdminToken();

  const refreshWashRequest = async (washOrderId: string) => {
    console.log({ washOrderId });
    window.location.reload();
    // try {
    //   const res = await axios.get(
    //     `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/${washOrderId}`,
    //     { headers: { Authorization: `Bearer ${adminToken}` } }
    //   );
    //   console.log({ res });
    // } catch (error) {
    //   console.log("get request error", error);
    // }
  };
  return (
    <div className='request-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='price_ status'>
        <h2>
          N
          {formatMoney(
            selectedRequest?.washOrderData.transactionData.transactionAmount
          )}
        </h2>
        <span className={selectedRequest?.washStatus.toLowerCase()}>
          {selectedRequest?.washStatus}
        </span>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Service Type</h5>
          <h6>{getWashServiceType(selectedRequest?.serviceType)}</h6>
        </div>
        <div className='item'>
          <h5>Wash Quantity</h5>
          <h6>
            {
              selectedRequest?.washOrderData.washItemData.find(
                (el) => el.itemName === "Washes"
              )?.numberOfItem
            }{" "}
            Washes
          </h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Pick up</h5>
          <h6>
            {selectedRequest?.washOrderData.pickupTime},{" "}
            {moment(selectedRequest?.washOrderData.orderDate).format(
              "Do MMM YYYY"
            )}
          </h6>
        </div>
        <div className='item'>
          <h5>Payment</h5>
          <h6>
            N {formatMoney(selectedRequest?.orderAmount)}
            {/* {formatMoney(
              selectedRequest?.washOrderData.transactionData.transactionAmount
            )} */}
          </h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Extras</h5>
          <h6>
            {selectedRequest?.washOrderData?.washItemData?.map(
              (el, key) =>
                `${el.itemName}(${el.numberOfItem})${
                  key < selectedRequest.washOrderData.washItemData.length - 1
                    ? ", "
                    : ""
                }`
            )}
          </h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Laundry Instructions</h5>
          <h6>{selectedRequest?.washOrderData?.orderNote || "-"}</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items hasBorderBottom'>
        <div className='item'>
          <h5>Complaints</h5>
          <h6>-</h6>
          {/* <h6>Customer was too stubborn</h6> */}
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Customer</h5>
          <h6>{selectedRequest?.washOrderData.userData.fullName}</h6>
        </div>
        <div className='item'>
          <h5>Contact</h5>
          <h6>{selectedRequest?.washOrderData.userData.phoneNumber}</h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Email</h5>
          <h6>{selectedRequest?.washOrderData.userData.email}</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Address</h5>
          <h6>{selectedRequest?.washOrderData.streetAddress}</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='actions'>
        <div className='actions-btn'>
          <button data-bs-toggle='modal' data-bs-target='#update-wash-modal'>
            Add Wash
          </button>
          <button
            className='update'
            data-bs-toggle='modal'
            data-bs-target='#update-request-status-modal'
          >
            Update Status
          </button>
        </div>
        <div className='actions-btn'>
          <button>Add Complaints</button>
          <button>Reschedule Wash</button>
        </div>
      </div>
      <UpdateRequestStatus
        wash={selectedRequest}
        refreshWashRequest={(el: string) => refreshWashRequest(el)}
      />
      <UpdateWash wash={selectedRequest} />
    </div>
  );
}
