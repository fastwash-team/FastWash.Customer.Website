import axios from "axios";
import { supportedAreas } from "../../../utils";
import {
  AdminRequest,
  LocationSchedule,
  WashOrderPlanData,
} from "../../../utils/types";
import { useEffect, useMemo, useState } from "react";
import {
  filterDaysToGetAvailableTimes,
  filterScheduleToGetAvailableDays,
} from "../../schedule-pickup/pickup-delivery";
import moment from "moment";
import Swal from "sweetalert2";

export function RescheduleWash({ wash }: { wash: AdminRequest | null }) {
  const isWashPrescheduled = wash?.serviceType === "PreScheduledWash";
  const isClassicWash = wash?.serviceType === "ClassicWash";
  const [availablePickupDays, setAvailablePickupDays] = useState<
    | {
        formattedDate: string;
        date: string;
      }[]
    | []
  >([]);
  const [
    selectedLocationWashOrderPlanData,
    setSelectedLocationWashOrderPlanData,
  ] = useState<WashOrderPlanData[] | []>([]);
  const [locationSchedules, setLocationSchedules] = useState<
    LocationSchedule[] | []
  >([]);
  const [selectedArea, setSelectedArea] = useState(
    wash?.washOrderData.location
  );
  const [selectedPickupDay, setSelectedPickupDay] = useState("");
  const [timeLogistics, setTimeLogistics] = useState({
    time: "",
    logistics: 0,
  });
  console.log({ timeLogistics });

  useEffect(() => {
    fetchSchedules();
  }, [isClassicWash, isWashPrescheduled]);

  useEffect(() => {
    if (wash?.washOrderData.location)
      setSelectedArea(wash.washOrderData.location);
  }, [wash]);

  const fetchSchedules = async () => {
    try {
      const {
        data: { responseObject: locationSchedules },
      } = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/api/WashOrderPlans/servicetype?serviceType=${
          isWashPrescheduled ? 1 : isClassicWash ? 2 : ""
        }`
      );
      setLocationSchedules(locationSchedules);
    } catch (error) {
      console.log("e", error);
    }
  };

  useEffect(() => {
    if (!locationSchedules.length) return;
    const locationSchedule = locationSchedules.find(
      (el: LocationSchedule) => el.location === selectedArea
    );
    if (!locationSchedule) return;
    const days = filterScheduleToGetAvailableDays(
      locationSchedule.washOrderPlanData
    );
    setSelectedLocationWashOrderPlanData(locationSchedule.washOrderPlanData);
    setAvailablePickupDays(days);
  }, [locationSchedules, selectedArea]);

  const availableTimesForPickupDay = useMemo(() => {
    if (!selectedPickupDay) return [];
    const selectedDate = availablePickupDays.find(
      (el) => el.formattedDate === selectedPickupDay
    );
    if (!selectedDate?.date) return [];
    const arr = selectedLocationWashOrderPlanData.filter(
      (el: WashOrderPlanData) =>
        moment(el.scheduleDate).isSame(moment(selectedDate.date), "day")
    );
    return filterDaysToGetAvailableTimes(arr);
  }, [selectedPickupDay]);

  const handleRescheduleWash = () => {
    document.getElementById("btn-reschedule-wash-close")?.click();
    return Swal.fire({
      title: "We're sorry!",
      text: "This feature is not available at the moment.",
    });
  };

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
                {wash?.washOrderData?.streetAddress}
                <br />
                <br />
                {wash?.washOrderData?.userData?.fullName} .{" "}
                {wash?.washOrderData?.userData?.phoneNumber}.{" "}
                {wash?.washOrderData?.userData?.email}
              </p>
              <label>Choose area</label>
              <select
                className='form-select'
                value={selectedArea}
                onChange={({ target: { value } }) => setSelectedArea(value)}
              >
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
                  <select
                    className='form-select'
                    onChange={({ target: { value } }) =>
                      setSelectedPickupDay(value)
                    }
                  >
                    <option selected disabled>
                      -- Select pickup day --
                    </option>
                    {availablePickupDays.map((el, i) => (
                      <option key={i} value={el.formattedDate}>
                        {el.formattedDate}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-md-6 col-sm-12'>
                  <label>Time</label>
                  <select
                    className='form-select'
                    disabled={!availableTimesForPickupDay.length}
                    onChange={({ target: { value } }) => {
                      const { logisticsAmount, time } =
                        availableTimesForPickupDay.find(
                          (el) => String(el.time) === String(value)
                        );
                      setTimeLogistics({
                        time,
                        logistics: Number(logisticsAmount),
                      });
                    }}
                  >
                    <option selected disabled>
                      -- Select a window --
                    </option>
                    {availableTimesForPickupDay.map((el) => (
                      <option key={el.key} value={el.time}>
                        {el.time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleRescheduleWash}
                className='btn modal-button'
              >
                Reschedule Wash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
