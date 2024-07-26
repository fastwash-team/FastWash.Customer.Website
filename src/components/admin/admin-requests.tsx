import { useEffect, useState } from "react";
import { FilterRequestsModal } from "./modals/filter-requests";
import { AdminRequestView } from "./request-view";
import axios from "axios";
import writtenNumber from "written-number";
import Skeleton from "react-loading-skeleton";
import {
  errorHandler,
  getFWAdminToken,
  getWashServiceType,
} from "../../utils/functions";
import { EmptyContainer } from "../empty-wash-item-list";
import { AdminRequest, PaginationProps } from "../../utils/types";
import moment from "moment";
import { Pagination } from "../pagination";
import { UpdateRequestStatus } from "./modals/update-request-status";
import { UpdateWash } from "./modals/update-wash";
import { useNavigate } from "react-router-dom";
import { RescheduleWash } from "./modals/reschedule-wash";
import { AddComplaint } from "./modals/add-complaint";

const RequestList = ({
  setComponentView,
  setSelectedRequest,
  paginationOptions,
  setPaginationOptions,
  // fetchRequests,
  requests,
  pageLoading,
  hasFilter = false,
  handleUpdateRequestInList,
  handleApplyRequestFilter,
}: {
  setComponentView: (el: string) => void;
  setSelectedRequest: (el: AdminRequest) => void;
  paginationOptions: PaginationProps;
  setPaginationOptions: (el: PaginationProps) => void;
  fetchRequests: () => void;
  requests: AdminRequest[];
  pageLoading: boolean;
  setPageLoading: (el: boolean) => void;
  hasFilter: boolean;
  handleUpdateRequestInList: (el: AdminRequest) => void;
  handleApplyRequestFilter: () => void;
}) => {
  const [selectedWash, setSelectedWash] = useState<AdminRequest | null>(null);
  useEffect(() => {
    // fetchRequests();
    handleApplyRequestFilter();
  }, [paginationOptions.page, paginationOptions.defaultPageSize]);
  const navigate = useNavigate();

  return (
    <>
      <div className='column-title-wrapper brd-btm'>
        <div className='title'>
          <h3>Requests</h3>
          <p>List of all your customer requests</p>
        </div>
        <div
          className='filter'
          data-bs-toggle='modal'
          data-bs-target='#request-filter-modal'
        >
          <i className='bi bi-filter'></i>
        </div>
      </div>
      <div className='admin-content-list schedule-view'>
        {pageLoading ? (
          <Skeleton count={7} />
        ) : !pageLoading && requests.length ? (
          requests.map((el: AdminRequest, key: number) => (
            <div
              key={key}
              className='schedule-view-body'
              onClick={() => {
                setComponentView("detail-view");
                setSelectedRequest(el);
              }}
            >
              <div className='_left'>
                <div className='_title status'>
                  <h2>
                    #{el.washOrderReference} | {el.washOrderData.pickupTime}
                  </h2>
                  <span className={el.washStatus.toLowerCase()}>
                    {el.washStatus}
                  </span>
                </div>
                <div className='_extras'>
                  <p>{getWashServiceType(el.serviceType)}</p>
                  {el.washOrderData.washItemData.find(
                    (el) => el.itemName === "Washes"
                  )?.numberOfItem ? (
                    <p>
                      {writtenNumber(
                        el.washOrderData.washItemData.find(
                          (el) => el.itemName === "Washes"
                        )?.numberOfItem
                      )}{" "}
                      Wash
                    </p>
                  ) : null}
                  <p>
                    {el?.washOrderData?.washItemData.filter(
                      (el) => el.itemName !== "Washes"
                    ).length
                      ? writtenNumber(
                          el?.washOrderData?.washItemData.filter(
                            (el) => el.itemName !== "Washes"
                          ).length
                        )
                      : "No"}{" "}
                    Extra
                    {el?.washOrderData?.washItemData?.length - 1 > 1 ? "s" : ""}
                  </p>
                  {/* <p>Notes: Yes</p> */}
                </div>
                <div className='_contact'>
                  <p>
                    <i className='bi bi-person-fill'></i>
                    <span>{el?.washOrderData?.userData?.fullName}</span>
                  </p>
                  <p>
                    <i className='bi bi-phone-fill'></i>
                    <span>{el?.washOrderData?.userData?.phoneNumber}</span>
                  </p>
                  <p>
                    <i className='bi bi-envelope-fill'></i>
                    <span>{el?.washOrderData?.userData?.email}</span>
                  </p>
                  <p>
                    <i className='bi bi-geo-alt-fill'></i>
                    <span>{el?.washOrderData?.streetAddress}</span>
                  </p>
                </div>
              </div>
              <div
                className='date'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p>{moment(el?.washOrderData?.orderDate).format("Do MMM")}</p>
                <div className='dropdown'>
                  <i
                    className='bi bi-three-dots'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  ></i>
                  <ul className='dropdown-menu'>
                    <li>
                      <a
                        className='dropdown-item'
                        onClick={() => {
                          document
                            .getElementById("update-request-status-modal-btn")
                            ?.click();
                          setSelectedWash(el);
                        }}
                      >
                        Update Status
                      </a>
                    </li>
                    <li>
                      <a
                        className='dropdown-item'
                        onClick={() => {
                          document
                            .getElementById("update-wash-modal-btn")
                            ?.click();
                          setSelectedWash(el);
                        }}
                      >
                        Add Wash
                      </a>
                    </li>
                    <li>
                      <a
                        className='dropdown-item'
                        onClick={() => {
                          document
                            .getElementById("reschedule-wash-modal-btn")
                            ?.click();
                          setSelectedWash(el);
                        }}
                      >
                        Reschedule Wash
                      </a>
                    </li>
                    <li>
                      <a
                        className='dropdown-item'
                        onClick={() => {
                          document
                            .getElementById("add-complaint-modal-btn")
                            ?.click();
                          setSelectedWash(el);
                        }}
                      >
                        Add Complaints
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : !pageLoading && !requests.length ? (
          <EmptyContainer
            hasFilter={hasFilter}
            buttonAction={() => navigate("/admin/dashboard?page=2")}
          />
        ) : null}
        <br />
        <br />
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
      <UpdateRequestStatus
        wash={selectedWash}
        handleUpdateRequestInList={(el: AdminRequest) =>
          handleUpdateRequestInList(el)
        }
      />
      <UpdateWash wash={selectedWash} handleFetchAdditionalOrder={() => null} />
      <RescheduleWash wash={selectedWash} />
      <AddComplaint
        wash={selectedWash}
        handleUpdateRequestInList={(el: AdminRequest) =>
          handleUpdateRequestInList(el)
        }
      />
    </>
  );
};

export function AdminRequests() {
  const adminToken = getFWAdminToken();
  const [pageLoading, setPageLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState({
    el: "all",
    statusEnum: 0,
  });
  const [filterLocation, setFilterLocation] = useState("all");
  const [timeRange, setTimeRange] = useState<{
    startTime: string | null;
    endTime: string | null;
  }>({
    startTime: "",
    endTime: "",
  });
  const [filterNote, setFilterNote] = useState("All");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [componentView, setComponentView] = useState("request-list");
  const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(
    null
  );
  const [requests, setRequests] = useState<AdminRequest[] | []>([]);
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    totalPages: 0,
    pageSize: 0,
    defaultPageSize: 5,
  });

  const handleApplyRequestFilter = () => {
    setPaginationOptions({ ...paginationOptions, page: 0 });
    let url = `WashOrders/filter?pageSize=${paginationOptions.defaultPageSize}&pageIndex=0`;
    console.log({ filterType });
    if (filterType.toLowerCase() !== "all") {
      const scheduleEnum =
        filterType === "Prescheduled" ? 1 : filterType === "Classic" ? 2 : null;
      url = url + `&serviceType=${scheduleEnum}`;
    }
    if (filterStatus.el !== "all")
      url = url + `&washStatus=${filterStatus.statusEnum}`;
    if (filterLocation !== "all") url = url + `&location=${filterLocation}`;
    if (filterNote !== "All") url = url + `&orderNotes=${filterNote}`;
    if (timeRange.startTime)
      url =
        url +
        `&orderStartDate=${moment(timeRange.startTime).format().split("+")[0]}`;
    if (timeRange.endTime)
      url =
        url +
        `&orderEndDate=${
          moment(timeRange.endTime).endOf("day").format().split("+")[0]
        }`;
    fetchRequests(url);
  };

  const resetFilters = () => {
    setTimeRange({ startTime: "", endTime: "" });
    setPriceRange({ min: 0, max: 0 });
    setFilterLocation("all");
    setFilterStatus({ el: "all", statusEnum: 0 });
    setFilterType("all");
    fetchRequests();
  };

  const fetchRequests = async (filterUrl = "") => {
    console.log({ filterUrl });
    setPageLoading(true);
    const url = filterUrl
      ? filterUrl
      : `WashOrders?pageSize=${paginationOptions.defaultPageSize}&pageIndex=${paginationOptions.page}`;
    try {
      const {
        data: {
          responseObject: { data, pageCount, pageIndex, pageSize },
        },
      } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/${url}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setRequests(data);
      setPageLoading(false);
      setPaginationOptions({
        ...paginationOptions,
        page: pageIndex,
        totalPages: pageCount,
        pageSize: pageSize,
      });
    } catch (error) {
      console.log({ error });
      const errorRes = errorHandler(error);
      console.log({ errorRes });
      setPageLoading(false);
    }
  };

  const handleUpdateRequestInList = (wash: AdminRequest) => {
    const requestIndex = requests.findIndex(
      (el) => el.washOrderReference === wash.washOrderReference
    );
    requests[requestIndex] = { ...wash };
    setRequests([...requests]);
  };

  return (
    <>
      <div className='admin-column'>
        {componentView === "request-list" ? (
          <RequestList
            setComponentView={(el: string) => setComponentView(el)}
            setSelectedRequest={(el: AdminRequest) => setSelectedRequest(el)}
            paginationOptions={paginationOptions}
            setPaginationOptions={setPaginationOptions}
            fetchRequests={fetchRequests}
            requests={requests}
            pageLoading={pageLoading}
            setPageLoading={setPageLoading}
            hasFilter={
              !!(
                filterNote !== "All" ||
                filterStatus.el !== "all" ||
                (timeRange.startTime && timeRange.endTime) ||
                filterType !== "all"
              )
            }
            handleUpdateRequestInList={(wash: AdminRequest) =>
              handleUpdateRequestInList(wash)
            }
            handleApplyRequestFilter={handleApplyRequestFilter}
          />
        ) : componentView === "detail-view" ? (
          <AdminRequestView
            goBack={() => setComponentView("request-list")}
            selectedRequest={selectedRequest}
          />
        ) : null}
      </div>
      <FilterRequestsModal
        filterLocation={filterLocation}
        filterNote={filterNote}
        filterStatus={filterStatus}
        filterType={filterType}
        setFilterLocation={setFilterLocation}
        setFilterNote={setFilterNote}
        setFilterStatus={setFilterStatus}
        setFilterType={setFilterType}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
        setTimeRange={setTimeRange}
        timeRange={timeRange}
        handleApplyFilter={handleApplyRequestFilter}
        resetFilters={resetFilters}
      />
    </>
  );
}
