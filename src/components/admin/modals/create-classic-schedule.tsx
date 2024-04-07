import { useState } from "react";
import { supportedAreas } from "../../../utils";
import { getScheduleTime } from "../../../utils/functions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CreateClassicScheduleModal() {
  // const pickUpDaysList = getPickUpDay();
  const startTimes = getScheduleTime();

  console.log({ startTimes });
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const hoursMins = hours.map((el) => `${el}:30`);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
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
            {page === 1 ? (
              <>
                <div className='col-md-12 col-sm-12 mb-3'>
                  <label>Choose area</label>
                  <select className='form-select'>
                    {supportedAreas.map((el) => (
                      <option key={el}>{el}</option>
                    ))}
                  </select>
                </div>
                <div className='col-md-6 col-sm-12'>
                  <label>Logistics (N)</label>
                  <input className='form-control' />
                </div>
                <button
                  type='button'
                  className='modal-button btn btn-primary'
                  onClick={() => setPage(2)}
                >
                  Next
                </button>
              </>
            ) : page === 2 ? (
              <div className='row'>
                <div className='col-md-6 col-sm-12 react-date-picker-wrapper'>
                  <label>Choose Day</label>
                  <DatePicker
                    selected={startDate}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(dates: any) => {
                      console.log({ dates });
                      const [start, end] = dates;
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    monthsShown={2}
                    selectsRange
                    className='form-select'
                    style={{ display: "block" }}
                  />
                </div>
                <div className='col-md-6 col-sm-12'>
                  <div className='row'>
                    <div className='col-6'>
                      <label>Start Time</label>
                      <select className='form-select'>
                        {hoursMins.map((el) => (
                          <option key={el}>{el}</option>
                        ))}
                      </select>
                    </div>
                    <div className='col-6'>
                      <label>End Time</label>
                      <select className='form-select'>
                        {hoursMins.slice(1).map((el) => (
                          <option key={el}>{el}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type='button'
                  className='modal-button btn btn-primary'
                  onClick={() => setPage(1)}
                >
                  Previous
                </button>
                {/* <button type='button' className='modal-button btn btn-primary'>
                  Create Schedule
                </button> */}
              </div>
            ) : null}
          </div>
          {/* <div className='modal-body'>
            <div className='row'>
              <div className='col-md-6 col-sm-12 react-date-picker-wrapper'>
                <label>Choose Day</label>
                <DatePicker
                  selected={startDate}
                  onChange={(dates: any) => {
                    console.log({ dates });
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  monthsShown={2}
                  selectsRange
                  className='form-select'
                  style={{ display: "block" }}
                  // inline
                />
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
              <button type='button' className='modal-button btn btn-primary'>
                Create Schedule
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
