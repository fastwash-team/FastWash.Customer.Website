import moment from "moment";
import { formatMoney, getWashServiceType } from "../../utils/functions";
import { AdminRequest } from "../../utils/types";
import { UpdateRequestStatus } from "./modals/update-request-status";
import { UpdateWash } from "./modals/update-wash";
import writtenNumber from "written-number";

export function AdminRequestView({
  goBack,
  selectedRequest,
}: {
  goBack: () => void;
  selectedRequest: AdminRequest | null;
}) {
  console.log({ selectedRequest });
  return (
    <div className='request-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='price_ status'>
        <h2>N{formatMoney(selectedRequest?.orderAmount)}</h2>
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
          <h5>Wash Type</h5>
          <h6>
            {writtenNumber(
              selectedRequest?.washOrderData.washItemData.find(
                (el) => el.itemName === "Washes"
              )?.numberOfItem
            )}{" "}
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
          <h5>Extras</h5>
          <h6>
            {writtenNumber(
              selectedRequest?.washOrderData?.washItemData.filter(
                (el) => el.itemName !== "Washes"
              ).length
            )}{" "}
            Wash
          </h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Payment</h5>
          <h6>
            N
            {formatMoney(
              selectedRequest?.washOrderData.transactionData.transactionAmount
            )}
          </h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Laundry Instructions</h5>
          <h6>{selectedRequest?.orderNotes || "-"}</h6>
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
          <button
            data-bs-toggle='modal'
            data-bs-target='#update-request-status-modal'
          >
            Update Status
          </button>
          <button
            className='update'
            data-bs-toggle='modal'
            data-bs-target='#update-wash-modal'
          >
            Add Wash
          </button>
        </div>
        <div className='actions-btn'>
          <button>Add Complaints</button>
          <button>Reschedule Wash</button>
        </div>
      </div>
      <UpdateRequestStatus wash={selectedRequest} />
      <UpdateWash wash={selectedRequest} />
    </div>
  );
}
