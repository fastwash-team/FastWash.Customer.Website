import React from "react";
import { supportedAreas } from "../../../utils";
import { FilterRequestProps } from "../../../utils/types";
import DatePicker from "react-datepicker";

export function FilterRequestsModal({
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  setFilterLocation,
  filterLocation,
  filterNote,
  setFilterNote,
  priceRange,
  setPriceRange,
  timeRange,
  setTimeRange,
  handleApplyFilter,
}: FilterRequestProps) {
  return (
    <div
      className='modal fade filter-modal'
      id='request-filter-modal'
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
              <div className='row'>
                <div className='col-3 react-date-picker-wrapper'>
                  <label>Start Date</label>
                  <DatePicker
                    className='form-control'
                    placeholder='dd/mm/yy'
                    selected={timeRange.startTime ? timeRange.startTime : null}
                    onChange={(date: string) => {
                      console.log({ date });
                      setTimeRange({ ...timeRange, startTime: date });
                    }}
                  />
                </div>
                <div className='col-3'>
                  <label>End Time</label>
                  <DatePicker
                    className='form-control'
                    placeholder='dd/mm/yy'
                    selected={timeRange.endTime}
                    minDate={new Date(timeRange.startTime as string)}
                    onChange={(date: string) => {
                      setTimeRange({ ...timeRange, endTime: date });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='filter-container'>
              <h3>Type</h3>
              <div className='filter-list'>
                {["All", "Prescheduled", "Classic"].map((el, key) => (
                  <li
                    className={
                      filterType.toLowerCase() === el.toLowerCase()
                        ? "active"
                        : ""
                    }
                    onClick={() => setFilterType(el)}
                    key={key}
                  >
                    {el}
                  </li>
                ))}
              </div>
            </div>
            <div className='filter-container'>
              <h3>Status</h3>
              <div className='filter-list'>
                {[
                  "All",
                  "Pending",
                  "Received",
                  "Pick up",
                  "Wash",
                  "Dry",
                  "Deliver",
                  "Completed",
                ].map((el, key) => (
                  <li
                    className={
                      filterStatus.el.toLowerCase() === el.toLowerCase()
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setFilterStatus({ el, statusEnum: Number(key) })
                    }
                    key={key}
                  >
                    {el}
                  </li>
                ))}
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
              <h3>Notes</h3>
              <div className='filter-list'>
                {["All", "Attached", "Non Attached"].map((el, key) => (
                  <li
                    className={filterNote === el ? "active" : ""}
                    onClick={() => setFilterNote(el)}
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
  );
}
