/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { supportedAreas } from "../../../utils";
import {
  errorHandler,
  getFWAdminToken,
  timeRangeClassic,
} from "../../../utils/functions";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import MultiDatePicker from "react-multi-date-picker";
import axios from "axios";
import { WashServiceType } from "../../../utils/types";

export function CreateClassicScheduleModal() {
  const adminToken = getFWAdminToken();
  const startTimes = timeRangeClassic.filter(
    (el, key) => key < timeRangeClassic.length - 1
  );
  const endTimes = timeRangeClassic.filter((el, key) => key !== 0);
  console.log({ startTimes, endTimes });
  const [loading, setLoading] = useState(false);
  const [times, setTimes] = useState({ startTime: "", endTime: "" });
  const [preData, setPreData] = useState({ location: "", logistics: 0 });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [schedules, setSchedules] = useState<
    { time: Date; startTime: string; endTime: string }[]
  >([]);
  const [page, setPage] = useState(1);

  const handleCreateScheduleRef = () => {
    const schedules = selectedDates.map((el) => {
      return {
        time: new Date(el),
        startTime: times.startTime,
        endTime: times.endTime,
      };
    });
    setSchedules(schedules as []);
    setPage(3);
  };

  const handleEditSchedule = (
    key: number,
    editKey: string,
    editValue: string | Date
  ) => {
    const selectedSchedule = { ...schedules[key], [editKey]: editValue };
    schedules[key] = selectedSchedule;
    setSchedules([...schedules]);
    if (editKey === "time") {
      selectedDates[key] = new Date(editValue);
      setSelectedDates(selectedDates);
    }
  };

  const handleCreateSchedule = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrderPlans`,
        {
          serviceType: WashServiceType.CLASSIC_WASH,
          washOrderPlanCreationData: schedules.map((el) => ({
            scheduleStartTime: el.startTime,
            scheduleEndTime: el.endTime,
            logisticsAmount: preData.logistics,
            scheduleDate: el.time,
            location: preData.location,
            numberOfOrders: 0,
          })),
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      document.getElementById("close-modal")?.click();
      resetPage();
      return Swal.fire({
        title: "Success!",
        text: "Schedules created successfully",
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      console.log("creating schedule", error);
      setLoading(false);
      return Swal.fire({
        title: "Error!",
        text: errorMessage || "Error creating schedules",
      });
    }
  };

  const handleRemoveSchedule = (key: number) => {
    if (schedules.length < 2) return;
    selectedDates.splice(key, 1);
    schedules.splice(key, 1);
    setSelectedDates([...selectedDates]);
    setSchedules([...schedules]);
  };

  const resetPage = () => {
    setSchedules([]);
    setSelectedDates([]);
    setPage(1);
    setLoading(false);
  };

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
            <button
              type='button'
              className='btn-close'
              id='close-modal'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            {page === 1 ? (
              <>
                <div className='col-md-12 col-sm-12 mb-3'>
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
                <div className='col-md-6 col-sm-12'>
                  <label>Logistics (N)</label>
                  <input
                    className='form-control'
                    type='number'
                    onChange={({ target: { value } }) =>
                      setPreData({ ...preData, logistics: Number(value) })
                    }
                  />
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
                  <MultiDatePicker
                    multiple
                    minDate={new Date()}
                    numberOfMonths={2}
                    placeholder='Select Dates'
                    sort
                    disabled={selectedDates.length === 30}
                    onChange={(values) => {
                      const dates = values as [];
                      if (dates.length <= 30) setSelectedDates(dates);
                      return false;
                    }}
                    value={selectedDates.map((el) => new Date(el))}
                  />
                </div>
                <div className='col-md-6 col-sm-12'>
                  <div className='row'>
                    <div className='col-6'>
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
                        {startTimes.map((el) => (
                          <option value={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-6'>
                      <label>End Time</label>
                      <select
                        className='form-select'
                        onChange={({ target: { value } }) =>
                          setTimes({ ...times, endTime: value })
                        }
                      >
                        <option selected disabled>
                          Select End Time
                        </option>
                        {endTimes.map((el) => (
                          <option value={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='btn_flex'>
                  <button
                    type='button'
                    className='modal-button btn btn-primary outline'
                    onClick={() => setPage(1)}
                  >
                    Previous
                  </button>
                  <button
                    type='button'
                    className='modal-button btn btn-primary'
                    onClick={handleCreateScheduleRef}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            ) : page === 3 ? (
              <>
                {schedules.map((schedule, key) => (
                  <div key={key} className='row _list_times'>
                    <div className='col-5'>
                      <label>Choose Day</label>
                      <MultiDatePicker
                        minDate={new Date()}
                        value={new Date(schedule.time)}
                        onChange={(date) => {
                          handleEditSchedule(
                            key,
                            "time",
                            new Date(date as any)
                          );
                        }}
                      />
                    </div>
                    <div className='col-3'>
                      <label>Start Time</label>
                      <select
                        className='form-select'
                        value={schedule.startTime}
                        onChange={({ target: { value } }) =>
                          handleEditSchedule(key, "startTime", value)
                        }
                      >
                        <option selected disabled>
                          Select Start Time
                        </option>
                        {startTimes.map((el) => (
                          <option value={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-3'>
                      <label>End Time</label>
                      <select
                        className='form-select'
                        value={schedule.endTime}
                        onChange={({ target: { value } }) =>
                          handleEditSchedule(key, "endTime", value)
                        }
                      >
                        <option selected disabled>
                          Select End Time
                        </option>
                        {endTimes.map((el) => (
                          <option value={el} key={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='col-1'>
                      <i
                        className='bi bi-x-lg'
                        onClick={() => handleRemoveSchedule(key)}
                      ></i>
                    </div>
                  </div>
                ))}
                <div className='btn_flex'>
                  <button
                    type='button'
                    className='modal-button btn btn-primary outline'
                    disabled={loading}
                    onClick={() => setPage(2)}
                  >
                    Previous
                  </button>
                  <button
                    type='button'
                    className='modal-button btn btn-primary'
                    disabled={loading}
                    onClick={handleCreateSchedule}
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
