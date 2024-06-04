import React from "react";
import { supportedAreas } from "../../../utils";
import { FilterRequestProps } from "../../../utils/types";

export function FilterRequestsModal({
  filterExtra,
  filterType,
  setFilterType,
  filterWash,
  setFilterWash,
  filterStatus,
  setFilterStatus,
  setFilterExtra,
  setFilterLocation,
  filterLocation,
  filterNote,
  setFilterNote,
  priceRange,
  setPriceRange,
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
              <h3>Washes</h3>
              <div className='filter-list'>
                {["All", "One", "Two", "Three+"].map((el, key) => (
                  <li
                    className={
                      filterWash.toLowerCase() === el.toLowerCase()
                        ? "active"
                        : ""
                    }
                    onClick={() => setFilterWash(el)}
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
                      filterStatus.toLowerCase() === el.toLowerCase()
                        ? "active"
                        : ""
                    }
                    onClick={() => setFilterStatus(el)}
                    key={key}
                  >
                    {el}
                  </li>
                ))}
              </div>
            </div>
            <div className='filter-container'>
              <h3>Extras</h3>
              <div className='filter-list'>
                {[
                  "All",
                  "Softner",
                  "Bleach",
                  "Color Catcher",
                  "Stain remover",
                  "Laundry Bag (E)",
                  "Laundry Bag (M)",
                ].map((el, key) => (
                  <li
                    className={
                      filterExtra.toLowerCase() === el.toLowerCase()
                        ? "active"
                        : ""
                    }
                    onClick={() => setFilterExtra(el)}
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
                {["Attached", "Non Attached"].map((el, key) => (
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
