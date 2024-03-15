import { supportedAreas } from "../../../utils";
import { getPickUpDay, getScheduleTime } from "../../../utils/functions";

export function CreateClassicScheduleModal() {
  const pickUpDaysList = getPickUpDay();
  const startTimes = getScheduleTime();

  console.log({ startTimes });
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const hoursMins = hours.map((el) => `${el}:30`);
  console.log({ startingTimes: hoursMins });
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
              Create Classic Schedule
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
              <div className='col-md-6 col-sm-12'>
                <label>Choose Day</label>
                <select className='form-select'>
                  {pickUpDaysList.map((el, i) => (
                    <option key={i}>{el}</option>
                  ))}
                </select>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div className='row'>
                  <div className='col-md-6 col-sm-12'>
                    <label>Start Time</label>
                    <select className='form-select'>
                      {hoursMins.map((el) => (
                        <option key={el}>{el}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-md-6 col-sm-12'>
                    <label>End Time</label>
                    <select className='form-select'>
                      {hoursMins.slice(1).map((el) => (
                        <option key={el}>{el}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button type='button' className='btn btn-primary'>
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
