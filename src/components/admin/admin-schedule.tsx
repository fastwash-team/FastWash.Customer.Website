import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { FilterScheduleModal } from "./modals/filter-schedules";
import { ScheduleInfo, WashScheduleProps } from "../../utils/types";
import { ScheduleView } from "./schedule-view";
import axios from "axios";
import moment from "moment";
import {
  errorHandler,
  formatMoney,
  getFWAdminToken,
} from "../../utils/functions";
import Skeleton from "react-loading-skeleton";

export function AdminSchedule() {
  const adminToken = getFWAdminToken();
  const [filterDay, setFilterDay] = useState("all");
  const [filterSchedule, setFilterSchedule] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [pageLoading, setPageLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [selectedSchedule, setSelectedSchedule] = useState<null | ScheduleInfo>(
    null
  );
  const [schedules, setSchedules] = useState<WashScheduleProps[] | []>([]);
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    totalPages: 0,
    pageSize: 0,
    defaultPageSize: 5,
  });

  useEffect(() => {
    handleFetchSchedule();
  }, [paginationOptions.page, paginationOptions.defaultPageSize]);

  const handleFetchSchedule = async () => {
    setPageLoading(true);
    try {
      const {
        data: {
          responseObject: { data, pageCount, pageIndex, pageSize },
        },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrderPlans?pageSize=${paginationOptions.defaultPageSize}&pageIndex=${paginationOptions.page}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setSchedules(data);
      setPaginationOptions({
        ...paginationOptions,
        page: pageIndex,
        totalPages: pageCount + 1,
        pageSize: pageSize,
      });
    } catch (error) {
      console.log({ error });
      const errorMessage = errorHandler(error);
      console.log({ errorMessage });
    } finally {
      setPageLoading(false);
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
              {pageLoading ? (
                <Skeleton count={5} />
              ) : !pageLoading && schedules.length ? (
                schedules.map((el) => (
                  <div className='item' onClick={handleSelectSchedule}>
                    <div className='time-info'>
                      <p>
                        #{el.washOrderPlanReference} {el.scheduleStartTime} -{" "}
                        {el.scheduleEndTime}
                      </p>
                      <p>
                        <span>{moment(el.scheduleDate).format("Do MMM")}</span>
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
                ))
              ) : null}
            </div>
            <Pagination
              pageCount={paginationOptions.totalPages}
              changePage={(el) =>
                setPaginationOptions({ ...paginationOptions, page: el })
              }
              changePageSize={(el) =>
                setPaginationOptions({
                  ...paginationOptions,
                  defaultPageSize: el,
                  page: 1,
                })
              }
              pageSize={paginationOptions.defaultPageSize}
            />
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
