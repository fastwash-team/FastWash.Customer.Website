import axios from "axios";
import { useEffect, useState } from "react";
import {
  errorHandler,
  getFWAdminToken,
  getWashServiceType,
} from "../../utils/functions";
import { Pagination } from "../pagination";
import { EmptyContainer } from "../empty-wash-item-list";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { AdminPayment } from "../../utils/types";
import { toast } from "react-toastify";

export function AdminPayments() {
  const adminToken = getFWAdminToken();
  const [payments, setPayments] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [paginationOptions, setPaginationOptions] = useState({
    page: 0,
    totalPages: 0,
    pageSize: 0,
    defaultPageSize: 5,
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const {
        data: {
          responseObject: { data, pageSize, pageIndex, pageCount },
        },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/TransactionHistories?pageSize=${paginationOptions.defaultPageSize}&pageIndex=${paginationOptions.page}`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setPayments(data);
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
      toast("Error!", { type: "error" });
      setPageLoading(false);
    }
  };

  return (
    <>
      <div className='column-title-wrapper brd-btm'>
        <div className='title'>
          <h3>Payments</h3>
          <p>List of all your customer payments</p>
        </div>
        <div
          className='filter'
          data-bs-toggle='modal'
          data-bs-target='#request-filter-modal'
        >
          <i className='bi bi-filter'></i>
        </div>
      </div>
      <div className='admin-content-list schedule-view payments-view'>
        {pageLoading ? (
          <Skeleton count={7} />
        ) : !pageLoading && payments.length ? (
          payments.map((el: AdminPayment, key: number) => (
            <div
              key={key}
              className='schedule-view-body'
              //   onClick={() => {
              //     setComponentView("detail-view");
              //     setSelectedRequest(el);
              //   }}
            >
              <div className='_left'>
                <div className='_title status'>
                  <h2>#{el.washOrderReference}</h2>
                  <span className={el.washOrder.washStatus.toLowerCase()}>
                    {el.washOrder.washStatus}
                  </span>
                </div>
                <div className='_extras'>
                  <p>{getWashServiceType(el.washOrder.serviceType)}</p>
                  <p>{el.washOrder.location}</p>
                  <p>N{el.washOrder.orderAmount}</p>
                  {/* <p>Notes: Yes</p> */}
                </div>
              </div>
              <div
                className='date'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p>{moment(el?.washOrder?.dateCreated).format("Do MMM")}</p>
                {/* <div className='dropdown'>
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
                </div> */}
              </div>
            </div>
          ))
        ) : !pageLoading && !payments.length ? (
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
}
