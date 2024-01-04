import moment from "moment";

export const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {}).format(value);

export const getPickUpDay = () => {
  return [1, 2, 3, 4, 5, 6, 7].map((el) => {
    if (el === 1) return "Today";
    if (el === 2) return "Tomorrow";
    return moment().add(el, "days").format("ddd, Do MMM");
  });
};

export const getPickupWindow = (pickupday) => {
  const hour = moment().format("kk");
  let startTime = 9;
  if (pickupday.toLowerCase() === "today" && Number(hour) > 9)
    startTime = Number(hour) + 1;
  const times = [];
  for (let i = startTime; i < 15; i++) {
    times.push(`${i}:00 - ${i + 1}:00`);
  }
  return times;
};

export const getScheduleTime = (hourTime) => {
  const hour = moment().format("kk");
  console.log({ hour });
  console.log({ hourTime });
  let startTime = 7;
  if (!hourTime && Number(hour) >= startTime) startTime = Number(hour) + 1;
  // if (hourTime) {
  // }
  const times = [];
  for (let i = startTime; i < 15; i++) {
    times.push(`${i}:00 - ${i + 1}:00`);
  }
  return times;
};
