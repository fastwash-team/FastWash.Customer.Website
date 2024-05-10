import { useState } from "react";
import { supportedAreas } from "../../../utils";
import {
  errorHandler,
  formatMoney,
  getFWAdminToken,
  timeRangeClassic,
} from "../../../utils/functions";
import MultiDatePicker from "react-multi-date-picker";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { WashServiceType } from "../../../utils/types";

export function CreatePreScheduleModal() {
  const adminToken = getFWAdminToken();
  const [loading, setLoading] = useState(false);
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const hoursMins = hours.map((el) => (el < 10 ? `0${el}:00` : `${el}:00`));
  const startTimes = timeRangeClassic;
  startTimes.splice(-1);
  console.log({ startTimes });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [times, setTimes] = useState({ startTime: "", endTime: "" });
  const [preData, setPreData] = useState({
    location: "",
    logistics: 0,
    washesCount: 0,
  });
  const [schedules, setSchedules] = useState<
    {
      scheduleDate: Date;
      scheduleStartTime: string;
      scheduleEndTime: string;
      logisticsAmount: number;
      numberOfOrders: number;
      location: string;
    }[]
  >([]);

  const handleAddSchedule = () => {
    const schedules = selectedDates.map((el) => {
      return {
        scheduleDate: new Date(el),
        scheduleStartTime: times.startTime,
        scheduleEndTime: times.endTime,
        logisticsAmount: preData.logistics,
        numberOfOrders: preData.washesCount,
        location: preData.location,
      };
    });
    console.log({ schedules });
    setSchedules(schedules);
  };

  const handleRemoveSchedule = (key: number) => {
    schedules.splice(key, 1);
    selectedDates.splice(key, 1);
    setSelectedDates([...selectedDates]);
    setSchedules([...schedules]);
  };

  const resetPage = () => {
    setSchedules([]);
    setSelectedDates([]);
    setLoading(false);
    setPreData({
      location: "",
      logistics: 0,
      washesCount: 0,
    });
    setTimes({ startTime: "", endTime: "" });
  };

  const handleCreateSchedules = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrderPlans`,
        {
          serviceType: WashServiceType.PRESCHEDULED_WASH,
          washOrderPlanCreationData: schedules,
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      document.getElementById("close-modal-2")?.click();
      resetPage();
      return Swal.fire({
        title: "Success!",
        text: "Schedules created successfully",
      });
    } catch (error) {
      errorHandler(error);
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
            <button
              type='button'
              className='btn-close'
              id='close-modal-2'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body _prescheduled-modal-body'>
            <div className='mb-3'>
              <label>Choose area</label>
              <select
                className='form-select'
                onChange={({ target: { value } }) =>
                  setPreData({ ...preData, location: value })
                }
              >
                <option selected disabled>
                  Select an location
                </option>
                {supportedAreas.map((el) => (
                  <option key={el}>{el}</option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <div className='row'>
                <div className='col-md-6 col-sm-12'>
                  <label>Number of washes</label>
                  <input
                    className='form-control'
                    type='number'
                    value={preData.washesCount}
                    onChange={({ target: { value } }) =>
                      setPreData({ ...preData, washesCount: Number(value) })
                    }
                  />
                </div>
                <div className='col-md-6 col-sm-12'>
                  <label>Logistics (N)</label>
                  <input
                    className='form-control'
                    type='number'
                    value={preData.logistics}
                    onChange={({ target: { value } }) =>
                      setPreData({ ...preData, logistics: Number(value) })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6 col-sm-12 react-date-picker-wrapper'>
                <label>Choose Day</label>
                <MultiDatePicker
                  multiple
                  minDate={new Date()}
                  numberOfMonths={2}
                  sort
                  disabled={selectedDates.length === 30}
                  onChange={(values) => {
                    const dates = values as [];
                    if (dates.length <= 30) setSelectedDates(dates);
                    return false;
                  }}
                  value={selectedDates.map((el) => new Date(el))}
                />
                {/* <select className='form-select'>
                  {[
                    "Today",
                    "Tomorrow",
                    "All Week",
                    "All Month",
                    "All Year",
                  ].map((el, i) => (
                    <option key={i}>{el}</option>
                  ))}
                </select> */}
              </div>
              <div className='col-md-6 col-sm-12'>
                <div className='row'>
                  <div className='col-md-6 col-sm-12'>
                    <label>Start Time</label>
                    <select
                      className='form-select'
                      onChange={({ target: { value } }) =>
                        setTimes({ ...times, startTime: value })
                      }
                    >
                      <option selected disabled>
                        Select Start Time
                      </option>
                      {[...timeRangeClassic].map((el: string | undefined) => (
                        <option value={el} key={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='col-md-6 col-sm-12'>
                    <label>End Time</label>
                    <select
                      className='form-select'
                      onChange={({ target: { value } }) =>
                        setTimes({ ...times, endTime: value })
                      }
                    >
                      <option selected disabled>
                        Select Start Time
                      </option>
                      {hoursMins.slice(1).map((el) => (
                        <option value={el} key={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button className='add_schedule_btn' onClick={handleAddSchedule}>
              Add Schedule
            </button>
            {schedules.length ? (
              <div className='_pre-schedule-list'>
                <h3>Schedules</h3>
                {schedules.map((el, key) => (
                  <div className='schedule_flex' key={key}>
                    <div>
                      <h4>
                        {el.scheduleStartTime} - {el.scheduleEndTime}
                      </h4>
                      <div className='props'>
                        <p>{el.numberOfOrders} Washes</p>
                        <p>N{formatMoney(el.logisticsAmount)}</p>
                      </div>
                    </div>
                    <div className='_cancel'>
                      <i
                        className='bi bi-x-lg'
                        onClick={() => handleRemoveSchedule(key)}
                      ></i>
                      <p>{moment(el.scheduleDate).format("Do MMM")}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            <button
              type='button'
              className='btn btn-primary _create-schedule'
              disabled={!schedules.length || loading}
              onClick={handleCreateSchedules}
            >
              {loading ? (
                <div
                  className='spinner-border text-success app-spinner'
                  role='status'
                >
                  <span className='sr-only'></span>
                </div>
              ) : (
                "Create Schedule"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
