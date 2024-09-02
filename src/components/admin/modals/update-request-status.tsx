import { useState } from "react";
import axios from "axios";
import { errorHandler, getFWAdminToken } from "../../../utils/functions";
import { AdminRequest } from "../../../utils/types";
import Swal from "sweetalert2";
import { REACT_APP_API_BASE_URL } from "../../../utils/service/env.keys";

export function UpdateRequestStatus({
  wash,
  completeStatusUpdate,
  handleUpdateRequestInList,
}: {
  wash: AdminRequest | null;
  completeStatusUpdate?: (status: string) => void;
  handleUpdateRequestInList?: (el: AdminRequest) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const adminToken = getFWAdminToken();
  const washStatus = wash?.washStatus;
  const statuses = [
    "Pending",
    "Received",
    "Pickup",
    "Washing",
    "Drying",
    "Folding",
    "Delivering",
    "Completed",
  ];
  const currentStatusIndex = statuses.findIndex((el) => el === washStatus);
  const mappedStatuses = statuses.map((el, key) => {
    if (key < currentStatusIndex || key === currentStatusIndex) {
      return { status: el, completed: true, disabled: true, enumNum: key + 1 };
    }
    if (key === currentStatusIndex + 1)
      return {
        status: el,
        completed: false,
        disabled: false,
        enumNum: key + 1,
      };
    return { status: el, completed: false, disabled: true, enumNum: key + 1 };
  });

  const handleUpdateWashStatus = async () => {
    if (!status || !wash) return;
    try {
      setLoading(true);
      await axios.put(
        `${REACT_APP_API_BASE_URL}/api/WashOrders/order/status`,
        { washOrderId: wash?.washOrderId, washStatus: status },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      Swal.fire({
        title: "Success!",
        text: "Successfully updated order status",
      });
      const updatedStatus = statuses[status - 1];
      if (handleUpdateRequestInList)
        handleUpdateRequestInList({ ...wash, washStatus: updatedStatus });
      if (completeStatusUpdate) completeStatusUpdate(updatedStatus);
      document.getElementById("btn-update-request-status-close")?.click();
      setStatus(null);
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      console.log("updating wash schedule", error);
      setLoading(false);
      return Swal.fire({
        title: "Error!",
        text: "Error creating schedules",
      });
    }
  };

  return (
    <div
      className='modal fade'
      id='update-request-status-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <button
        data-bs-toggle='modal'
        data-bs-target='#update-request-status-modal'
        id='update-request-status-modal-btn'
        style={{ display: "none" }}
      >
        Update Status
      </button>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Update Status
            </h1>
            <button
              type='button'
              style={{ display: "none" }}
              className='btn-close'
              id='btn-update-request-status-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='status-type-container'>
              {mappedStatuses.map((el) => {
                return (
                  <div
                    className={`status ${el.disabled ? "disabled" : ""}`}
                    onClick={() => {
                      if (el.disabled) return;
                      if (status) return setStatus(null);
                      setStatus(el.enumNum);
                    }}
                  >
                    <p>{el.status}</p>
                    <input
                      type='checkbox'
                      checked={el.completed || status === el.enumNum}
                      disabled={el.disabled}
                      onClick={() => {
                        if (el.disabled) return;
                        if (status) return setStatus(null);
                        setStatus(el.enumNum);
                      }}
                    />
                  </div>
                );
              })}
              <button
                className='modal-button'
                onClick={handleUpdateWashStatus}
                disabled={!wash || !status || loading}
              >
                {loading ? (
                  <div
                    className='spinner-border text-success app-spinner'
                    role='status'
                  >
                    <span className='sr-only'></span>
                  </div>
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
