// import { EmptyContainer } from "../empty-wash-item-list";
import { useState } from "react";
import { FilterRequestsModal } from "./modals/filter-requests";

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
  return (
    <>
      <div className='admin-column'>
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
          {/* <EmptyContainer /> */}
          {[1, 2, 3].map(() => (
            <div className='schedule-view-body'>
              <div className='_left'>
                <div className='_title status'>
                  <h2>#FWash 09680</h2>
                  <span className='received'>Received</span>
                </div>
                <div className='_extras'>
                  <p>One Wash</p>
                  <p>No Extras</p>
                  <p>Notes: Yes</p>
                </div>
                <div className='_contact'>
                  <p>
                    <i className='bi bi-person-fill'></i>
                    <span>Gbolahan Fawale</span>
                  </p>
                  <p>
                    <i className='bi bi-phone-fill'></i>
                    <span>08167890987</span>
                  </p>
                  <p>
                    <i className='bi bi-envelope-fill'></i>
                    <span>gbmilla@gmail.com</span>
                  </p>
                  <p>
                    <i className='bi bi-geo-alt-fill'></i>
                    <span>No 5 192 Adeola Odeku Street, Bariga lagos</span>
                  </p>
                </div>
              </div>
              <div className='date'>
                <p>4th Oct.</p>
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
          ))}
          <br />
          <br />
        </div>
      </div>
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
