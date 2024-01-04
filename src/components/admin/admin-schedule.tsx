import React, { useState } from "react";
import { supportedAreas } from "../../utils";
import { Pagination } from "../pagination";

export function AdminSchedule() {
  const [filterDay, setFilterDay] = useState("all");
  const [filterSchedule, setFilterSchedule] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  const handleApplyFilter = () => {
    console.log("filters to be applied");
  };

  return (
    <>
      <div className='admin-column'>
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
          {[1, 2, 3, 4].map(() => (
            <div className='item'>
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
          ))}
        </div>
        <Pagination />
      </div>
      <div
        className='modal fade'
        id='exampleModal'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Filter
              </h1>
            </div>
            <div className='modal-body'>
              <div className='filter-container'>
                <h3>Day</h3>
                <div className='filter-list'>
                  {[
                    "All",
                    "Today",
                    "Tomorrow",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((el, key) => (
                    <li
                      className={
                        filterDay.toLowerCase() === el.toLowerCase()
                          ? "active"
                          : ""
                      }
                      onClick={() => setFilterDay(el)}
                      key={key}
                    >
                      {el}
                    </li>
                  ))}
                </div>
              </div>
              <div className='filter-container'>
                <h3>Schedule</h3>
                <div className='filter-list'>
                  {["All", "07:30 - 09:00am", "12:30 - 02:00pm"].map(
                    (el, key) => (
                      <li
                        className={filterSchedule === el ? "active" : ""}
                        onClick={() => setFilterSchedule(el)}
                        key={key}
                      >
                        {el}
                      </li>
                    )
                  )}
                </div>
              </div>
              <div className='filter-container'>
                <h3>Location</h3>
                <div className='filter-list'>
                  {["All", ...supportedAreas].map((el, key) => (
                    <li
                      className={
                        filterLocation.toLowerCase() === el.toLowerCase()
                          ? "active"
                          : ""
                      }
                      onClick={() => setFilterLocation(el)}
                      key={key}
                    >
                      {el}
                    </li>
                  ))}
                </div>
              </div>
              <div className='filter-container'>
                <h3>Price</h3>
                <input
                  type='range'
                  className='form-range'
                  min={1000}
                  max={50000}
                  id='customRange2'
                  value={priceRange.max}
                  onChange={(e) => {
                    console.log(e, e.target.value);
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    });
                  }}
                />
                <div className='range-inputs'>
                  <input
                    className='form-control'
                    type='number'
                    min={1000}
                    max={50000}
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        min: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    className='form-control'
                    value={priceRange.max}
                    type='number'
                    min={1000}
                    max={50000}
                    onChange={(e) =>
                      setPriceRange({
                        ...priceRange,
                        max: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <p>Reset Filters</p>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleApplyFilter}
                data-bs-dismiss='modal'
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
