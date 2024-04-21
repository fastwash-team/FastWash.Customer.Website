import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { FilterScheduleModal } from "./modals/filter-schedules";
import { ScheduleInfo, WashScheduleProps } from "../../utils/types";
import { ScheduleView } from "./schedule-view";
import axios from "axios";
import moment from "moment";
import { formatMoney } from "../../utils/functions";

export function AdminSchedule() {
  const [filterDay, setFilterDay] = useState("all");
  const [filterSchedule, setFilterSchedule] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [selectedSchedule, setSelectedSchedule] = useState<null | ScheduleInfo>(
    null
  );
  const [schedules, setSchedules] = useState<WashScheduleProps[] | []>([]);

  useEffect(() => {
    handleFetchSchedule();
  }, []);

  const handleFetchSchedule = async () => {
    try {
      const {
        data: {
          responseObject: { data },
        },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrderPlans`
      );
      console.log({ data });
      setSchedules(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleApplyFilter = () => {
    console.log("filters to be applied");
  };

  const handleSelectSchedule = () => {
    return setSelectedSchedule({ scheduleId: "ID" });
  };

  return (
    <>
      <div className='admin-column'>
        {selectedSchedule?.scheduleId ? (
          <ScheduleView goBack={() => setSelectedSchedule(null)} />
        ) : (
          <>
            <div className='column-title-wrapper'>
              <div className='title'>
                <h3>Schedule</h3>
                <p>List of all your created wash schedules</p>
              </div>
              <div
                className='filter'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
              >
                <i className='bi bi-filter'></i>
              </div>
            </div>
            <div className='filter-list-view'>
              <li>{filterDay}</li>
              <li>
                {filterSchedule.toLowerCase() === "all"
                  ? "All Schedules"
                  : filterSchedule}
              </li>
              <li>
                {filterLocation.toLowerCase() === "all"
                  ? "All Locations"
                  : filterLocation}
              </li>
            </div>
            <div className='admin-content-list'>
              {schedules.map((el) => (
                <div className='item' onClick={handleSelectSchedule}>
                  <div className='time-info'>
                    <p>
                      {el.scheduleStartTime} - {el.scheduleEndTime}
                    </p>
                    <p>
                      <span>{moment(el.dateCreated).format("Do MMM")}</span>
                      <i className='bi bi-three-dots'></i>
                    </p>
                  </div>
                  <div className='item-props'>
                    <p>
                      <i className='bi bi-duffle-fill'></i>
                      <span>{el.totalWashOrders} Washes</span>
                    </p>
                    <p>
                      <i className='bi bi-bag-check-fill'></i>
                      <span>NGN {formatMoney(el.totalWashOrdersAmount)}</span>
                    </p>
                    <p>
                      <i className='bi bi-truck'></i>
                      <span>NGN {formatMoney(el.totalLogisticsAmount)}</span>
                    </p>
                    <p>
                      <i className='bi bi-geo-alt-fill'></i>
                      <span>{el.location}</span>
                    </p>
                  </div>
                </div>
              ))}
              {/* {[1, 2, 3, 4].map(() => (
                <div className='item' onClick={handleSelectSchedule}>
                  <div className='time-info'>
                    <p>08:00 - 09:00</p>
                    <p>
                      <span>4th Oct</span>
                      <i className='bi bi-three-dots'></i>
                    </p>
                  </div>
                  <div className='item-props'>
                    <p>
                      <i className='bi bi-duffle-fill'></i>
                      <span>10 Washes</span>
                    </p>
                    <p>
                      <i className='bi bi-bag-check-fill'></i>
                      <span>NGN 50,000</span>
                    </p>
                    <p>
                      <i className='bi bi-truck'></i>
                      <span>NGN 10,000</span>
                    </p>
                    <p>
                      <i className='bi bi-geo-alt-fill'></i>
                      <span>Yaba</span>
                    </p>
                  </div>
                </div>
              ))} */}
            </div>
            <Pagination />
          </>
        )}
      </div>
      <FilterScheduleModal
        filterDay={filterDay}
        filterLocation={filterLocation}
        filterSchedule={filterSchedule}
        setFilterDay={setFilterDay}
        setFilterLocation={setFilterLocation}
        setPriceRange={setPriceRange}
        setFilterSchedule={setFilterSchedule}
        handleApplyFilter={handleApplyFilter}
        priceRange={priceRange}
      />
    </>
  );
}
