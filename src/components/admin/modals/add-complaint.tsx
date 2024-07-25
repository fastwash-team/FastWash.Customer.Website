import { useState } from "react";
import { AdminRequest } from "../../../utils/types";
import axios from "axios";
import { errorHandler, getFWAdminToken } from "../../../utils/functions";
import Swal from "sweetalert2";

export function AddComplaint({
  wash,
  handleUpdateRequestInList,
}: {
  wash: AdminRequest | null;
  handleUpdateRequestInList?: (el: AdminRequest) => void;
}) {
  const adminToken = getFWAdminToken();
  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveComplaint = async () => {
    try {
      setLoading(true);
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders/${wash?.washOrderId}/add/complaint`,
        { complaintNote: complaint },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (handleUpdateRequestInList && wash)
        handleUpdateRequestInList({ ...wash, complaintNote: complaint });
      document.getElementById("btn-add-complaint-close")?.click();
      return Swal.fire({
        title: "Success!",
        text: "Complaint note has been saved!",
      });
    } catch (error) {
      console.log("sads", error);
      const errorMessage = errorHandler(error);
      return Swal.fire({
        title: "Error!",
        text: errorMessage || "Error saving complaint note",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='modal fade'
      id='add-complaint-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <button
        data-bs-toggle='modal'
        data-bs-target='#add-complaint-modal'
        id='add-complaint-modal-btn'
        style={{ display: "none" }}
      >
        Add Complaints
      </button>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Add Complaint
            </h1>
            <button
              type='button'
              style={{ display: "none" }}
              className='btn-close'
              id='btn-add-complaint-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='add-complaint-container'>
              <textarea
                placeholder='Enter description here'
                onChange={({ target: { value } }) => setComplaint(value)}
                value={complaint}
              />
              <button
                className='btn modal-button'
                onClick={handleSaveComplaint}
                disabled={loading}
              >
                {loading ? (
                  <div
                    className='spinner-border text-success app-spinner'
                    role='status'
                  >
                    <span className='sr-only'></span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
