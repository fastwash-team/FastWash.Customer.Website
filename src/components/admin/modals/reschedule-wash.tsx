import { supportedAreas } from "../../../utils";
import { AdminRequest } from "../../../utils/types";

export function RescheduleWash({ wash }: { wash: AdminRequest | null }) {
  console.log({ wash });
  return (
    <div
      className='modal fade'
      id='reschedule-wash-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <button
        data-bs-toggle='modal'
        data-bs-target='#reschedule-wash-modal'
        id='reschedule-wash-modal-btn'
        style={{ display: "none" }}
      >
        Reschedule Wash
      </button>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Reschedule
            </h1>
            <button
              type='button'
              style={{ display: "none" }}
              className='btn-close'
              id='btn-reschedule-wash-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='reschedule-wash-container'>
              <p className='address'>
                No 5 Ogunbadejo Street Shomolu, Bariga Lagos
                <br />
                <br />
                Gbolahan F. 08067567890. gbmilla@gmail.com
              </p>
              <label>Choose area</label>
              <select className='form-select'>
                <option selected disabled>
                  -- Select an area --
                </option>
                {supportedAreas.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </select>
              <div className='row'>
                <div className='col-md-6 col-sm-12'>
                  <label>Choose Day</label>
                  <select className='form-select'>
                    <option selected disabled>
                      -- Select an area --
                    </option>
                    {supportedAreas.map((el) => (
                      <option key={el}>{el}</option>
                    ))}
                  </select>
                </div>
                <div className='col-md-6 col-sm-12'>
                  <label>Time</label>
                  <select className='form-select'>
                    <option selected disabled>
                      -- Select an area --
                    </option>
                    {supportedAreas.map((el) => (
                      <option key={el}>{el}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button className='btn modal-button'>Reschedule Wash</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
