import { supportedAreas } from "../../../utils";
import { FilterScheduleProps } from "../../../utils/types";
import DatePicker from "react-datepicker";

export function FilterScheduleModal({
  filterSchedule,
  setFilterSchedule,
  filterLocation,
  setFilterLocation,
  priceRange,
  setPriceRange,
  handleApplyFilter,
  timeRange,
  setTimeRange,
  resetFilters,
}: FilterScheduleProps) {
  console.log({ timeRange });
  return (
    <div
      className='modal fade filter-modal'
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
              <div className='row'>
                <div className='col-3 react-date-picker-wrapper'>
                  <label>Start Date</label>
                  <DatePicker
                    className='form-control'
                    placeholder='dd/mm/yy'
                    selected={timeRange.startTime}
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
              <h3>Schedule</h3>
              <div className='filter-list'>
                {["All", "Pre-Schedule", "Classic"].map((el, key) => (
                  <li
                    className={filterSchedule === el ? "active" : ""}
                    onClick={() => setFilterSchedule(el)}
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
            <p role='button' onClick={resetFilters}>
              Reset Filters
            </p>
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
