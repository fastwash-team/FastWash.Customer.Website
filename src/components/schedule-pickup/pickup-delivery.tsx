import React, { useEffect, useMemo, useState } from "react";
import CircleCalendar from "../../assets/svgs/1.svg";
import CircleTruck from "../../assets/svgs/2.svg";
import CheckedRadioButton from "../../assets/svgs/input-radio-checked.svg";
import {
  CLASSIC_WASH,
  PRESCHEDULED_WASH,
  supportedAreas,
  WASH_PRICES,
} from "../../utils";
import {
  LocationSchedule,
  PickupDeliveryProps,
  WashOrderPlanData,
} from "../../utils/types";
import { GoogleAddressInput } from "../google-input/google-address-input";
import { errorHandler, filterUniqueByKey } from "../../utils/functions";
import { InfoMessage } from "../info-message";
import axios from "axios";
import moment from "moment";
// import Swal from "sweetalert2";

export const filterScheduleToGetAvailableDays = (
  washOrderPlanData: WashOrderPlanData[]
) => {
  const groupedData = washOrderPlanData.reduce(
    (acc: { [key: string]: WashOrderPlanData[] }, curr: WashOrderPlanData) => {
      const key = moment(curr["scheduleDate"]).format("YYYY-MM-DD");
      // Check if the key already exists in the accumulator
      if (!acc[key]) {
        acc[key] = [];
      }
      // Push the current item into the corresponding key array
      acc[key].push(curr);
      return acc;
    },
    {}
  );
  const days = Object.keys(groupedData)
    .sort()
    .filter((el) => {
      if (
        moment(moment().format("YYYY-MM-DD")).isSameOrBefore(
          moment(el).format("YYYY-MM-DD")
        )
      )
        return el;
    })
    .map((el) => ({
      formattedDate: moment(el).format("ddd, Do MMM"),
      date: el,
    }));
  return days;
};

export const filterDaysToGetAvailableTimes = (
  availableDays: WashOrderPlanData[]
) => {
  const validDateTimes: WashOrderPlanData[] = [];
  availableDays.forEach((el) => {
    const [hour, minute] = el.scheduleEndTime.split(":");
    const endDateTime = moment(el.scheduleDate)
      .hour(Number(hour))
      .minute(Number(minute));
    if (!moment().isAfter(endDateTime)) validDateTimes.push(el);
  });
  const formattedArr = validDateTimes.map((el, key) => ({
    time: `${el.scheduleStartTime} - ${el.scheduleEndTime}`,
    key,
    logisticsAmount: el.logisticsAmount,
    scheduleDate: el.scheduleDate,
  }));
  return filterUniqueByKey(formattedArr, "time");
};

export function PickupDelivery({
  selectedWashType,
  scheduleInfo,
  changePDInfo,
  errors,
}: PickupDeliveryProps) {
  const isWashPrescheduled = selectedWashType === PRESCHEDULED_WASH;
  const isClassicWash = selectedWashType === CLASSIC_WASH;
  const [schedulePerLocation, setSchedulePerLocation] = useState<
    LocationSchedule[] | []
  >([]);

  console.log({ scheduleInfo });

  console.log({ scheduleInfo });

  const scheduleForSelectedArea = useMemo(() => {
    if (!scheduleInfo.area) return {};
    const locationSchedule = schedulePerLocation.find(
      (el: { location: string }) => el.location === scheduleInfo.area
    );
    if (!locationSchedule) return {};
    if (locationSchedule) {
      const { washOrderPlanData } = locationSchedule;
      const groupedData = washOrderPlanData.reduce(
        (
          acc: { [key: string]: WashOrderPlanData[] },
          curr: WashOrderPlanData
        ) => {
          const key = moment(curr["scheduleDate"]).format("YYYY-MM-DD");
          // Check if the key already exists in the accumulator
          if (!acc[key]) {
            acc[key] = [];
          }
          // Push the current item into the corresponding key array
          acc[key].push(curr);
          return acc;
        },
        {}
      );
      return groupedData;
    }
    return {};
  }, [scheduleInfo.area, schedulePerLocation]);

  const days = Object.keys(scheduleForSelectedArea)
    .sort()
    .filter((el) => {
      if (
        moment(moment().format("YYYY-MM-DD")).isSameOrBefore(
          moment(el).format("YYYY-MM-DD")
        )
      )
        return el;
    })
    .map((el) => ({
      formattedDate: moment(el).format("ddd, Do MMM"),
      date: el,
    }));

  const selectedTimesForSelectedDay = useMemo(() => {
    if (!scheduleInfo.pickupDay) return;
    const findDate = days.find(
      (el) => el.formattedDate === scheduleInfo.pickupDay
    );
    if (!findDate?.date) return;
    const arr = scheduleForSelectedArea[findDate?.date];
    return filterDaysToGetAvailableTimes(arr);
  }, [scheduleInfo.pickupDay, days]);

  useEffect(() => {
    handleFetchSchedules();
  }, [isWashPrescheduled, isClassicWash]);

  const handleFetchSchedules = async () => {
    try {
      const {
        data: { responseObject },
      } = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/api/WashOrderPlans/servicetype?serviceType=${
          isWashPrescheduled ? 1 : isClassicWash ? 2 : ""
        }`
      );
      console.log({ responseObject });
      setSchedulePerLocation(responseObject);
    } catch (error) {
      console.log({ error });
      const errorRes = errorHandler(error);
      console.log({ errorRes });
    }
  };

  console.log("errors", errors);

  function resetSelectBox(selectBoxId: string) {
    const selectBox = document.getElementById(selectBoxId) as HTMLSelectElement;
    if (selectBox) selectBox.selectedIndex = 0;
  }

  return (
    <div className='schedule-pickup__body__steps-view-render'>
      <h2>Pick up & Delivery</h2>
      <p>Where and how are we picking up your clothes?</p>
      <div className='__options'>
        <div
          className={`option ${isWashPrescheduled && "active"}`}
          onClick={() => {
            changePDInfo("selectedWashType", PRESCHEDULED_WASH);
            changePDInfo("area", "");
            changePDInfo("pickupDay", "");
            changePDInfo("pickupWindow", "");
          }}
        >
          <div className='imgs'>
            <img src={CircleCalendar} alt='' className='option-img' />
            {isWashPrescheduled && <img src={CheckedRadioButton} alt='' />}
          </div>
          <h3>Pre-Scheduled Wash</h3>
          <p>
            Enjoy deeply discounted logistics for your location. Have your
            laundry pickup up, washed, and delivered on the same day.
          </p>
        </div>
        <div
          className={`option ${isClassicWash && "active"}`}
          onClick={() => {
            changePDInfo("selectedWashType", CLASSIC_WASH);
            changePDInfo("area", "");
            changePDInfo("pickupDay", "");
            changePDInfo("pickupWindow", "");
            resetSelectBox("pickup-window");
            resetSelectBox("pickup-day");
            resetSelectBox("area");
          }}
        >
          <div className='imgs'>
            <img src={CircleTruck} alt='' className='option-img' />
            {isClassicWash && <img src={CheckedRadioButton} alt='' />}
          </div>
          <h3>Classic Wash</h3>
          <p>
            Experience extreme convenience and speed. Your laundry will be
            picked up immediately and delivered back to you in less than 4
            hours.
          </p>
        </div>
      </div>
      <div className='mt-3'>
        <label>Address</label>
        <GoogleAddressInput
          handleChange={(address) => changePDInfo("address", address)}
          address={scheduleInfo.address}
        />
        {errors?.address && <InfoMessage message={errors.address} />}
      </div>
      <div className='mt-3'>
        <label>Choose area</label>
        <select
          className='form-select'
          aria-label='Default select example'
          value={!scheduleInfo.area ? undefined : scheduleInfo.area}
          onChange={({ target: { value } }) => {
            // let setA = value.split(" ");
            // setA = setA
            //   .flatMap((el) => el.split("/"))
            //   .filter((el) => el.length > 1);
            // let matchesAddress = false;
            // setA.forEach((el) => {
            //   if (!matchesAddress && scheduleInfo.address.startsWith(el))
            //     matchesAddress = true;
            // });
            // if (!matchesAddress) {
            //   resetSelectBox("area");
            //   changePDInfo("area", "");
            //   changePDInfo("pickupDay", "");
            //   changePDInfo("pickupWindow", "");
            //   resetSelectBox("pickup-day");
            //   resetSelectBox("pickup-window");
            //   return Swal.fire({
            //     title: "Invalid Area!",
            //     text: "This area does not match the address you selected. Please pick the right area.",
            //   });
            // }
            changePDInfo("area", value);
            changePDInfo("pickupDay", "");
            changePDInfo("pickupWindow", "");
            resetSelectBox("pickup-day");
            resetSelectBox("pickup-window");
          }}
          id='area'
        >
          <option selected disabled>
            -- Select an area --
          </option>
          {supportedAreas.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
        {errors?.area && <InfoMessage message={errors.area} />}
      </div>
      <div className='mt-3'>
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <label>Choose Day</label>
            <select
              className='form-select'
              disabled={!scheduleInfo.area}
              onChange={({ target: { value } }) => {
                changePDInfo("pickupDay", value);
                changePDInfo("pickupWindow", "");
                resetSelectBox("pickup-window");
              }}
              id='pickup-day'
              value={scheduleInfo.pickupDay || undefined}
            >
              <option disabled selected>
                -- Select pickup day --
              </option>
              {days.map((el, i) => (
                <option key={i} value={el.formattedDate}>
                  {el.formattedDate}
                </option>
              ))}
            </select>
            {scheduleInfo.area && !days.length && (
              <InfoMessage message='There are no available schedule for this location' />
            )}
            {days.length && errors?.pickupDay && !scheduleInfo.pickupDay ? (
              <InfoMessage message={errors.pickupDay} />
            ) : null}
          </div>
          <div className='col-md-6 col-sm-12'>
            <label>Pick up window</label>
            <select
              className='form-select'
              disabled={!scheduleInfo.area || !scheduleInfo.pickupDay}
              onChange={({ target: { value } }) => {
                const { logisticsAmount, scheduleDate, time } =
                  selectedTimesForSelectedDay?.find(
                    (el) => String(el.time) === String(value)
                  ) || {};
                changePDInfo("pickupWindow", time);
                changePDInfo(
                  "logisticsAmount",
                  Number(logisticsAmount || WASH_PRICES.LOGISTICS)
                );
                console.log({ scheduleDate, time });
                console.log(
                  "order date",
                  moment(scheduleDate)
                    .hour(Number(time.split(":")[0]) + 1)
                    .add(1)
                    .format()
                );
                changePDInfo(
                  "orderDate",
                  moment(scheduleDate)
                    .hour(Number(time.split(":")[0]) + 1)
                    .format()
                );
              }}
              value={
                scheduleInfo?.pickupWindow?.length
                  ? scheduleInfo.pickupWindow
                  : undefined
              }
              id='pickup-window'
            >
              <option disabled selected>
                -- Select pickup window --
              </option>
              {scheduleInfo.pickupDay &&
                (!selectedTimesForSelectedDay ||
                  !selectedTimesForSelectedDay.length) && (
                  <option selected disabled>
                    We have no schedule times available
                  </option>
                )}
              {selectedTimesForSelectedDay &&
                selectedTimesForSelectedDay.map((el) => (
                  // <option
                  //   key={el.key}
                  //   value={el.key}
                  //   // id={el.key}
                  //   selected={Number(el.key) === selectedPickupWindowKey}
                  // >
                  <option key={el.key} value={el.time}>
                    {el.time}
                  </option>
                ))}
            </select>
            {scheduleInfo.pickupDay &&
              errors?.pickupWindow &&
              !scheduleInfo.pickupWindow && (
                <InfoMessage message={errors.pickupWindow} />
              )}
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <div className='etd'>
          <i className='bi bi-truck'></i>
          <p>
            Your laundry will be delivered to you{" "}
            <b>
              {scheduleInfo.selectedWashType === "classic-wash"
                ? "in less than FOUR hours"
                : scheduleInfo.pickupDay && scheduleInfo.pickupWindow
                ? moment(scheduleInfo.orderDate).isSame(new Date())
                  ? "Today"
                  : moment(scheduleInfo.orderDate).format("Do MMM, YYYY")
                : ""}
            </b>
          </p>
        </div>
      </div>
      <div className='mt-3'>
        <label>Laundry Instructions</label>
        <textarea
          className='form-control'
          placeholder='Add any special instructions for the driver'
          id='floatingTextarea'
          value={scheduleInfo.laundryInstructions}
          onChange={({ target: { value } }) =>
            changePDInfo("laundryInstructions", value)
          }
        />
      </div>
    </div>
  );
}
