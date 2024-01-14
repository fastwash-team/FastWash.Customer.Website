import { UpdateRequestStatus } from "./modals/update-request-status";
import { UpdateWash } from "./modals/update-wash";

export function AdminRequestView({ goBack }: { goBack: () => void }) {
  return (
    <div className='request-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='price_ status'>
        <h2>N3500</h2>
        <span className='received'>Received</span>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Service Type</h5>
          <h6>Classic</h6>
        </div>
        <div className='item'>
          <h5>Wash Type</h5>
          <h6>3 Washes</h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Pick up</h5>
          <h6>09:00am, 7th Oct 2023</h6>
        </div>
        <div className='item'>
          <h5>Extras</h5>
          <h6>One Wash</h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Payment</h5>
          <h6>N2500</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Laundry Instructions</h5>
          <h6>Please drop my clothes at the door or with the gate man</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items hasBorderBottom'>
        <div className='item'>
          <h5>Complaints</h5>
          <h6>Customer was too stubborn</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Customer</h5>
          <h6>Gbolahan Fawale</h6>
        </div>
        <div className='item'>
          <h5>Contact</h5>
          <h6>08167890987</h6>
        </div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Email</h5>
          <h6>gbmilla@gmail.com</h6>
        </div>
        <div className='item'></div>
      </div>
      <div className='items'>
        <div className='item'>
          <h5>Address</h5>
          <h6>No 5 192 Adeola Odeku Street, Bariga lagos</h6>
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
      <UpdateRequestStatus />
      <UpdateWash />
    </div>
  );
}
