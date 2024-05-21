import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { FilterScheduleModal } from "./modals/filter-schedules";
import { WashScheduleProps } from "../../utils/types";
import { ScheduleView } from "./schedule-view";
import CalendarSvg from "../../assets/svgs/calender.svg";
import axios from "axios";
import moment from "moment";
import {
  errorHandler,
  formatMoney,
  getFWAdminToken,
  getWashServiceType,
} from "../../utils/functions";
import Skeleton from "react-loading-skeleton";
import { EmptyContainer } from "../empty-wash-item-list";

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
  const [timeRange, setTimeRange] = useState<{
    startTime: string | null;
    endTime: string | null;
  }>({
    startTime: "",
    endTime: "",
  });
  const [selectedSchedule, setSelectedSchedule] =
    useState<null | WashScheduleProps>(null);
  const [schedules, setSchedules] = useState<WashScheduleProps[] | []>([]);
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    totalPages: 0,
    pageSize: 0,
    defaultPageSize: 5,
  });

  console.log({ schedules, filterSchedule, priceRange });

  useEffect(() => {
    handleFetchSchedule();
  }, [paginationOptions.page, paginationOptions.defaultPageSize]);

  const handleFetchSchedule = async () => {
    setPageLoading(true);
    const hasFilter = !!filterSchedule || !!filterLocation;
    let url = `${process.env.REACT_APP_API_BASE_URL}/api/WashOrderPlans?pageSize=${paginationOptions.defaultPageSize}&pageIndex=${paginationOptions.page}`;
    if (hasFilter) {
      console.log({ filterSchedule, filterLocation });
      url = `${process.env.REACT_APP_API_BASE_URL}/api/WashOrderPlans/filter?pageSize=${paginationOptions.defaultPageSize}&pageIndex=${paginationOptions.page}`;
      if (filterLocation !== "All") url = url + `&location=${filterLocation}`;
      if (filterSchedule !== "All") {
        const scheduleEnum =
          filterSchedule === "Pre-Schedule"
            ? 1
            : filterSchedule === "Classic"
            ? 2
            : null;
        url = url + `&serviceType=${scheduleEnum}`;
      }
      if (priceRange.max)
        url =
          url +
          `&fromOrderAmount=${priceRange.min}&toOrderAmount=${priceRange.max}`;
      if (timeRange.startTime)
        url = url + `&startDate=${moment(timeRange.startTime).toISOString()}`;
      if (timeRange.endTime)
        url = url + `&endDate=${moment(timeRange.endTime).toISOString()}`;
    }

    try {
      const {
        data: {
          responseObject: { data, pageCount, pageIndex, pageSize },
        },
      } = await axios.get(url, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
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
    handleFetchSchedule();
  };

  const handleSelectSchedule = (washSchedule: WashScheduleProps) => {
    console.log({ washSchedule });
    // return setSelectedSchedule({ scheduleId: "ID" });
    return setSelectedSchedule(washSchedule);
  };

  return (
    <>
      <div className='admin-column'>
        {selectedSchedule?.washOrderPlanReference ? (
          <ScheduleView
            schedule={selectedSchedule}
            goBack={() => setSelectedSchedule(null)}
          />
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
            {!pageLoading && !schedules.length ? (
              <div style={{ marginTop: "-60px", marginBottom: "40px" }}>
                <EmptyContainer
                  emptyTitle={"No schedules"}
                  emptyText='Your have not created any schedules yet. Click the button below to start.'
                  buttonText='Create Schedule'
                  buttonAction={() => null}
                  pageIcon={CalendarSvg}
                />
              </div>
            ) : (
              <>
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
                    schedules
                      .sort(
                        (a, b) =>
                          Number(new Date(a.scheduleDate)) -
                          Number(new Date(b.scheduleDate))
                      )
                      .map((el, key) => (
                        <div
                          className='item'
                          onClick={() => handleSelectSchedule(el)}
                          key={key}
                        >
                          <div className='time-info'>
                            <p>
                              #{el.washOrderPlanReference}{" "}
                              {el.scheduleStartTime} - {el.scheduleEndTime}
                            </p>
                            <p>
                              <span>
                                {moment(el.scheduleDate).format("Do MMM")}
                              </span>
                              <i className='bi bi-three-dots'></i>
                            </p>
                          </div>
                          <div className='item-props'>
                            <p>
                              <i className='bi bi-filter-square-fill'></i>
                              <span>{getWashServiceType(el.serviceType)}</span>
                            </p>
                            <p>
                              <i className='bi bi-duffle-fill'></i>
                              <span>{el.totalWashOrders} Washes</span>
                            </p>
                            <p>
                              <i className='bi bi-bag-check-fill'></i>
                              <span>
                                NGN {formatMoney(el.totalWashOrdersAmount)}
                              </span>
                            </p>
                            <p>
                              <i className='bi bi-truck'></i>
                              <span>
                                NGN {formatMoney(el.totalLogisticsAmount)}
                              </span>
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
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
    </>
  );
}
