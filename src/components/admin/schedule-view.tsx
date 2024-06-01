import moment from "moment";
import { formatMoney } from "../../utils/functions";
import { AdminRequest, WashScheduleProps } from "../../utils/types";
import writtenNumber from "written-number";
import { EmptyContainer } from "../empty-wash-item-list";
import { UpdateRequestStatus } from "./modals/update-request-status";
import { useState } from "react";
import { UpdateWash } from "./modals/update-wash";

export function ScheduleView({
  goBack,
  schedule,
}: {
  goBack: () => void;
  schedule: WashScheduleProps;
}) {
  const [selectedWash, setSelectedWash] = useState<AdminRequest | null>(null);
  return (
    <div className='schedule-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='schedule-view-header'>
        <div className='details'>
          <h3>
            #{schedule.washOrderPlanReference} {schedule.scheduleStartTime} -{" "}
            {schedule.scheduleEndTime}
          </h3>
          <div className='extras'>
            <p>
              <i className='bi bi-duffle-fill'></i>
              <span>{schedule.totalWashOrders} Washes</span>
            </p>
            <p>
              <i className='bi bi-bag-check-fill'></i>
              <span>NGN {formatMoney(schedule.totalWashOrdersAmount)}</span>
            </p>
            <p>
              <i className='bi bi-truck'></i>
              <span>NGN {formatMoney(schedule.totalLogisticsAmount)}</span>
            </p>
            <p>
              <i className='bi bi-geo-alt-fill'></i>
              <span>{schedule.location}</span>
            </p>
          </div>
        </div>
        {(schedule?.washOrders || []).length ? <button>Download</button> : null}
      </div>
      {(schedule?.washOrders || []).length ? (
        (schedule.washOrders || []).map((el, key) => (
          <div className='schedule-view-body' key={key}>
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
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyContainer
          emptyText='There are no requests for this schedule.'
          showAction={false}
        />
      )}
      <UpdateRequestStatus wash={selectedWash} />
      <UpdateWash wash={selectedWash} />
    </div>
  );
}
