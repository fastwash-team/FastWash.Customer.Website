import { supportedAreas } from "../../../utils";
import { getPickUpDay, getScheduleTime } from "../../../utils/functions";

export function CreateScheduleModal() {
  const pickUpDaysList = getPickUpDay();
  const startTimes = getScheduleTime();

  console.log({ startTimes });
  return (
    <div
      className='modal fade'
      id='createSchedule'
      aria-labelledby='createScheduleLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='createScheduleLabel'>
              Create Schedule
            </h1>
            {/* <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button> */}
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <label>Choose area</label>
              <select className='form-select'>
                {supportedAreas.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </select>
            </div>
            <div className='row'>
              <div className='col-6'>
                <label>Choose Day</label>
                <select className='form-select'>
                  {pickUpDaysList.map((el, i) => (
                    <option key={i}>{el}</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                <div className='row'>
                  <div className='col-6'>
                    <label>Start Time</label>
                    <select className='form-select'>
                      {supportedAreas.map((el) => (
                        <option key={el}>{el}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-6'>
                    <label>End Time</label>
                    <select className='form-select'>
                      {supportedAreas.map((el) => (
                        <option key={el}>{el}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button type='button' className='btn btn-primary'>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
