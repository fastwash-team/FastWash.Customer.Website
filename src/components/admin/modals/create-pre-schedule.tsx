import { supportedAreas } from "../../../utils";
import { getPickUpDay, getScheduleTime } from "../../../utils/functions";

export function CreatePreScheduleModal() {
  const pickUpDaysList = getPickUpDay();
  const startTimes = getScheduleTime();

  console.log({ startTimes });

  return (
    <div
      className='modal fade'
      id='createPreSchedule'
      aria-labelledby='createPreScheduleLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='createPreScheduleLabel'>
              Create PreSchedule
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
            <div className='mb-3'>
              <div className='row'>
                <div className='col-md-6 col-sm-12'>
                  <label>Number of washes</label>
                  <input className='form-control' placeholder='0' />
                </div>
                <div className='col-md-6 col-sm-12'>
                  <label>Logistics (N)</label>
                  <input className='form-control' placeholder='0' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 col-sm-12'>
                <label>Choose Day</label>
                <select className='form-select'>
                  {[
                    "Today",
                    "Tomorrow",
                    "All Week",
                    "All Month",
                    "All Year",
                  ].map((el, i) => (
                    <option key={i}>{el}</option>
                  ))}
                </select>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div className='row'>
                  <div className='col-md-6 col-sm-12'>
                    <label>Start Time</label>
                    <select className='form-select'>
                      {[
                        "7:30am",
                        "8:30am",
                        "9:30am",
                        "10:30am",
                        "11:30am",
                        "12:30am",
                        "1:30pm",
                        "2:30pm",
                        "3:30pm",
                      ].map((el) => (
                        <option key={el}>{el}</option>
                      ))}
                    </select>
                  </div>
                  <div className='col-md-6 col-sm-12'>
                    <label>End Time</label>
                    <select className='form-select'>
                      {[
                        "8:30am",
                        "9:30am",
                        "10:30am",
                        "11:30am",
                        "12:30am",
                        "1:30pm",
                        "2:30pm",
                        "3:30pm",
                        "4:30pm",
                      ].map((el) => (
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
