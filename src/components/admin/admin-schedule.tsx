import React, { useEffect } from "react";
import { Pagination } from "../pagination";
import { FilterScheduleModal } from "./modals/filter-schedules";
import { WashScheduleProps } from "../../utils/types";
import { ScheduleView } from "./schedule-view";
import CalendarSvg from "../../assets/svgs/calender.svg";
import moment from "moment";
import { formatMoney, getWashServiceType } from "../../utils/functions";
import Skeleton from "react-loading-skeleton";
import { EmptyContainer } from "../empty-wash-item-list";
import { useLocation } from "react-router-dom";
import { HangerIcon } from "../../assets/svgs/hanger.icon";
import { useDispatch, useSelector } from "react-redux";
import {
  fetch_admin_schedules,
  set_admin_schedules_filter,
  set_admin_schedules_pagination,
} from "../../redux-files/admin-schedules/reducer";
import {
  getAdminScheduleFilters,
  getAdminScheduleLoadingState,
  getAdminSchedulePaginationOptions,
  getAllAdminSchedule,
} from "../../redux-files/admin-schedules/selector";

export function AdminSchedule() {
  const location = useLocation();
  const dispatch = useDispatch();
  const schedules: WashScheduleProps[] = useSelector(getAllAdminSchedule) || [];
  const pageLoading = useSelector(getAdminScheduleLoadingState);
  const paginationOptions = useSelector(getAdminSchedulePaginationOptions);
  const {
    filterDay,
    filterLocation,
    filterSchedule,
    selectedSchedule,
    timeRange,
    priceRange,
  } = useSelector(getAdminScheduleFilters);

  useEffect(() => {
    if (location?.state?.status)
      dispatch(
        set_admin_schedules_filter({
          id: "filterSchedule",
          value: location.state.status,
        })
      );
  }, []);

  useEffect(() => {
    dispatch(
      set_admin_schedules_filter({
        filterLocation,
        filterDay,
        filterSchedule,
        paginationOptions,
        timeRange,
        priceRange,
      })
    );
  }, [filterLocation, filterDay, filterSchedule]);

  useEffect(() => {
    dispatch(fetch_admin_schedules());
  }, [paginationOptions.page, paginationOptions.defaultPageSize]);

  const handleApplyFilter = () => {
    dispatch(fetch_admin_schedules());
  };

  const handleSelectSchedule = (washSchedule: WashScheduleProps) => {
    return dispatch(
      set_admin_schedules_filter({
        id: "selectedSchedule",
        value: washSchedule,
      })
    );
  };

  const handleResetFilters = () => {
    Promise.all([
      dispatch(
        set_admin_schedules_filter({
          id: "timeRange",
          value: { startTime: "", endTime: "" },
        })
      ),
      dispatch(
        set_admin_schedules_filter({
          id: "priceRange",
          value: { min: 0, max: 0 },
        })
      ),
      dispatch(
        set_admin_schedules_filter({
          id: "filterLocation",
          value: "All",
        })
      ),
      dispatch(
        set_admin_schedules_filter({
          id: "filterSchedule",
          value: "All",
        })
      ),
      dispatch(
        set_admin_schedules_filter({
          id: "filterDay",
          value: "All",
        })
      ),
    ]);
  };

  return (
    <>
      <div className='admin-column'>
        {selectedSchedule?.washOrderPlanReference ? (
          <ScheduleView
            schedule={selectedSchedule}
            goBack={() =>
              dispatch(
                set_admin_schedules_filter({
                  id: "selectedSchedule",
                  value: null,
                })
              )
            }
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
                  emptyText='Your have not created any schedules yet. Create schedules to continue.'
                  // buttonText='Create Schedule'
                  // buttonAction={() => null}
                  showAction={false}
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
                    schedules.map((el, key) => (
                      <div
                        className='item'
                        onClick={() => handleSelectSchedule(el)}
                        key={key}
                      >
                        <div className='time-info'>
                          <p>
                            #{el.washOrderPlanReference} {el.scheduleStartTime}{" "}
                            - {el.scheduleEndTime}
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
                            <HangerIcon />
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
                    dispatch(
                      set_admin_schedules_pagination({
                        ...paginationOptions,
                        page: el,
                      })
                    )
                  }
                  changePageSize={(el) =>
                    dispatch(
                      set_admin_schedules_pagination({
                        ...paginationOptions,
                        defaultPageSize: el,
                        page: 1,
                      })
                    )
                  }
                  currentPage={paginationOptions.page}
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
        setFilterDay={(event) =>
          dispatch(
            set_admin_schedules_filter({ id: "filterDay", value: event })
          )
        }
        setFilterLocation={(event) =>
          dispatch(
            set_admin_schedules_filter({ id: "filterLocation", value: event })
          )
        }
        setPriceRange={(event) =>
          dispatch(
            set_admin_schedules_filter({ id: "priceRange", value: event })
          )
        }
        setFilterSchedule={(event) =>
          dispatch(
            set_admin_schedules_filter({ id: "filterSchedule", value: event })
          )
        }
        setTimeRange={(event) =>
          dispatch(
            set_admin_schedules_filter({ id: "timeRange", value: event })
          )
        }
        handleApplyFilter={handleApplyFilter}
        priceRange={priceRange}
        timeRange={timeRange}
        resetFilters={handleResetFilters}
      />
    </>
  );
}
