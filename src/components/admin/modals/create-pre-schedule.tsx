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
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  fetch_admin_schedules,
  set_admin_schedules_pagination,
} from "../../../redux-files/admin-schedules/reducer";
import { REACT_APP_API_BASE_URL } from "../../../utils/service/env.keys";

export function CreatePreScheduleModal() {
  const adminToken = getFWAdminToken();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const startTimes = timeRangeClassic.filter(
    (el, key) => key < timeRangeClassic.length - 1
  );
  const endTimes = timeRangeClassic.filter((el, key) => key !== 0);
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

  // Close modal when clicking on the background
  const handleBackgroundClick = (e: { target: { id: string } }) => {
    if (e.target.id === "createPreSchedule") {
      resetPage();
    }
  };

  const handleAddSchedule = () => {
    if (!preData.location) return toast.error("Please, put select a location");
    if (!preData.washesCount) return toast.error("Please, put in a wash count");
    if (!preData.logistics)
      return toast.error("Please, put in a logistics amount");
    if (!selectedDates.length) return toast.error("Select Pickup days");
    if (!times.startTime) return toast.error("Select start time");
    if (!times.endTime) return toast.error("Select end time");
    console.log({
      selectedDates,
      times,
      startUtc: moment(times.startTime).utc(),
    });
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
    toast.success("Schedule has been updated!");
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
    const selectBox = document.getElementById(
      "location-select"
    ) as HTMLSelectElement;
    if (selectBox) selectBox.selectedIndex = 0;
    const selectBox1 = document.getElementById(
      "start-time"
    ) as HTMLSelectElement;
    if (selectBox1) selectBox1.selectedIndex = 0;
    const selectBox2 = document.getElementById("end-time") as HTMLSelectElement;
    if (selectBox2) selectBox2.selectedIndex = 0;
  };

  const handleCreateSchedules = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${REACT_APP_API_BASE_URL}/api/WashOrderPlans`,
        {
          serviceType: WashServiceType.PRESCHEDULED_WASH,
          washOrderPlanCreationData: schedules,
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      document.getElementById("close-modal-2")?.click();
      resetPage();
      dispatch(set_admin_schedules_pagination({ page: 1 }));
      dispatch(fetch_admin_schedules());
      return Swal.fire({
        title: "Success!",
        text: "Schedules created successfully",
      });
    } catch (error) {
      const errorMessage = errorHandler(error);
      setLoading(false);
      return Swal.fire({
        title: "Error!",
        text: errorMessage || "Error creating schedules",
      });
    }
  };

  return (
    <div
      className='modal fade'
      id='createPreSchedule'
      aria-labelledby='createPreScheduleLabel'
      aria-hidden='true'
      onClick={handleBackgroundClick}
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
              onClick={resetPage}
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
                id='location-select'
                value={preData.location ? preData.location : undefined}
              >
                <option selected disabled>
                  Select a location
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
                    value={Number(preData.washesCount).toString()}
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
                    value={Number(preData.logistics).toString()}
                    onChange={({ target: { value } }) =>
                      setPreData({ ...preData, logistics: Number(value) })
                    }
                    placeholder='Logistics Fee'
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
                  <div className='col-md-6 col-sm-12'>
                    <label>Start Time</label>
                    <select
                      className='form-select'
                      onChange={({ target: { value } }) =>
                        setTimes({ ...times, startTime: value })
                      }
                      id='start-time'
                      value={times.startTime ? times.startTime : undefined}
                    >
                      <option selected disabled>
                        Select Start Time
                      </option>
                      {startTimes.map((el: string | undefined) => (
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
                      id='end-time'
                      value={times.endTime ? times.endTime : undefined}
                    >
                      <option selected disabled>
                        Select Start Time
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
            </div>
            <button className='add_schedule_btn' onClick={handleAddSchedule}>
              {schedules.length ? "Update" : "Add"} Schedule
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
