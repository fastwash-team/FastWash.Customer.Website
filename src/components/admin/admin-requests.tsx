import { useEffect, useMemo, useState } from "react";
import { FilterRequestsModal } from "./modals/filter-requests";
import { AdminRequestView } from "./request-view";
import axios from "axios";
import writtenNumber from "written-number";
import Skeleton from "react-loading-skeleton";
import { errorHandler, getFWAdminToken } from "../../utils/functions";
import { EmptyContainer } from "../empty-wash-item-list";
import { AdminRequest } from "../../utils/types";
import moment from "moment";
import { Pagination } from "../pagination";

const RequestList = ({
  setComponentView,
  setSelectedRequest,
}: {
  setComponentView: (el: string) => void;
  setSelectedRequest: (el: AdminRequest) => void;
}) => {
  const adminToken = getFWAdminToken();
  const [pageLoading, setPageLoading] = useState(true);
  const [requests, setRequests] = useState<AdminRequest[] | []>([]);
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    totalPages: 0,
    pageSize: 0,
    defaultPageSize: 5,
  });

  useEffect(() => {
    fetchRequests();
  }, [paginationOptions.page, paginationOptions.defaultPageSize]);

  const fetchRequests = async () => {
    setPageLoading(true);
    try {
      const {
        data: {
          responseObject: { data, pageCount, pageIndex, pageSize },
        },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/WashOrders?pageSize=${paginationOptions.defaultPageSize}&pageIndex=${paginationOptions.page}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log({ data, pageCount, pageIndex, pageSize });
      setRequests(data);
      setPageLoading(false);
      setPaginationOptions({
        ...paginationOptions,
        page: pageIndex,
        totalPages: pageCount + 1,
        pageSize: pageSize,
      });
    } catch (error) {
      console.log({ error });
      const errorRes = errorHandler(error);
      console.log({ errorRes });

      setPageLoading(false);
    }
  };

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
                  <h2>#{el.washOrderReference}</h2>
                  <span className={el.washStatus.toLowerCase()}>
                    {el.washStatus}
                  </span>
                </div>
                <div className='_extras'>
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
              <div className='date'>
                <p>{moment(el?.washOrderData?.orderDate).format("Do MMM")}</p>
                <div className='dropdown'>
                  <i
                    className='bi bi-three-dots'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  ></i>
                  <ul className='dropdown-menu'>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Update Status
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Add Wash
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Reschedule Wash
                      </a>
                    </li>
                    <li>
                      <a className='dropdown-item' href='#'>
                        Add Complaints
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : !pageLoading && !requests.length ? (
          <EmptyContainer />
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
    </>
  );
};

export function AdminRequests() {
  const [filterType, setFilterType] = useState("all");
  const [filterWash, setFilterWash] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterExtra, setFilterExtra] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterNote, setFilterNote] = useState("Attached");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [componentView, setComponentView] = useState("request-list");
  const [selectedRequest, setSelectedRequest] = useState<AdminRequest | null>(
    null
  );

  const renderView = useMemo(() => {
    if (componentView === "request-list")
      return (
        <RequestList
          setComponentView={(el: string) => setComponentView(el)}
          setSelectedRequest={(el: AdminRequest) => setSelectedRequest(el)}
        />
      );
    if (componentView === "detail-view")
      return (
        <AdminRequestView
          goBack={() => setComponentView("request-list")}
          selectedRequest={selectedRequest}
        />
      );
  }, [componentView]);

  return (
    <>
      <div className='admin-column'>{renderView}</div>
      <FilterRequestsModal
        filterExtra={filterExtra}
        filterLocation={filterLocation}
        filterNote={filterNote}
        filterStatus={filterStatus}
        filterType={filterType}
        filterWash={filterWash}
        setFilterExtra={setFilterExtra}
        setFilterLocation={setFilterLocation}
        setFilterNote={setFilterNote}
        setFilterStatus={setFilterStatus}
        setFilterType={setFilterType}
        setFilterWash={setFilterWash}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
        handleApplyFilter={() => null}
      />
    </>
  );
}
