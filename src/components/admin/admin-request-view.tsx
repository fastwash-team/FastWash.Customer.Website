import moment from "moment";
import {
  formatMoney,
  getFWAdminToken,
  getWashServiceType,
} from "../../utils/functions";
import { AdditionalOrder, AdminRequest } from "../../utils/types";
import { UpdateRequestStatus } from "./modals/update-request-status";
import { UpdateWash } from "./modals/update-wash";
import { useEffect, useState } from "react";
import axios from "axios";
import { RescheduleWash } from "./modals/reschedule-wash";
import { AddComplaint } from "./modals/add-complaint";
import { AdditionalOrderComponent } from "../additional-order";
import { REACT_APP_API_BASE_URL } from "../../utils/service/env.keys";

export function AdminRequestView({
  goBack,
  selectedRequest,
  isFromPayment = false,
}: {
  goBack: () => void;
  selectedRequest: AdminRequest | null;
  isFromPayment?: boolean;
}) {
  const adminToken = getFWAdminToken();
  const [wash, setWash] = useState(selectedRequest);
  const [additionalOrder, setAdditionalOrder] =
    useState<AdditionalOrder | null>(null);

  const completeStatusUpdate = async (washStatus: string) => {
    if (wash) setWash({ ...wash, washStatus });
  };

  useEffect(() => {
    handleFetchAdditionalOrder();
  }, []);

  const handleFetchAdditionalOrder = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/${wash?.washOrderId}/additionalorder/internal`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setAdditionalOrder(responseObject);
    } catch (error) {
      console.log("additional error", error);
    }
  };

  return (
    <div className='request-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='price_ status'>
        <h2>
          {isFromPayment
            ? `N${formatMoney(
                selectedRequest?.washOrderData.transactionData.transactionAmount
              )}`
            : selectedRequest?.washOrderReference}
        </h2>
        <span className={wash?.washStatus.toLowerCase()}>
          {wash?.washStatus}
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
            Wash(es)
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
            N
            {!isFromPayment
              ? formatMoney(
                  selectedRequest?.washOrderData.transactionData
                    .transactionAmount
                )
              : formatMoney(selectedRequest?.orderAmount)}
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
      <div className={`items ${additionalOrder ? "" : "hasBorderBottom"}`}>
        <div className='item'>
          <h5>Complaints</h5>
          <h6>{selectedRequest?.complaintNote || "-"}</h6>
        </div>
        <div className='item'></div>
      </div>
      {additionalOrder ? (
        <AdditionalOrderComponent additionalOrder={additionalOrder} />
      ) : null}
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
        <div className='item'>
          <h5>Location</h5>
          <h6>{selectedRequest?.washOrderData.location}</h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Address</h5>
          <h6>{selectedRequest?.washOrderData.streetAddress}</h6>
        </div>
        <div className='item'></div>
      </div>
      {wash?.washStatus === "Completed" ? null : (
        <div className='actions'>
          <div className='actions-btn'>
            {additionalOrder ? null : (
              <button
                data-bs-toggle='modal'
                data-bs-target='#update-wash-modal'
              >
                Add Wash
              </button>
            )}
            <button
              className='update'
              data-bs-toggle='modal'
              data-bs-target='#update-request-status-modal'
            >
              Update Status
            </button>
          </div>
          <div className='actions-btn'>
            <button
              data-bs-toggle='modal'
              data-bs-target='#add-complaint-modal'
            >
              Add Complaints
            </button>
            <button
              data-bs-toggle='modal'
              data-bs-target='#reschedule-wash-modal'
            >
              Reschedule Wash
            </button>
          </div>
        </div>
      )}
      <UpdateRequestStatus
        wash={wash}
        completeStatusUpdate={(status: string) => completeStatusUpdate(status)}
      />
      <UpdateWash
        wash={selectedRequest}
        handleFetchAdditionalOrder={handleFetchAdditionalOrder}
      />
      <RescheduleWash wash={selectedRequest} />
      <AddComplaint wash={selectedRequest} />
    </div>
  );
}
