import { supportedAreas } from "../../../utils";
import { FilterScheduleProps } from "../../../utils/types";

export function FilterScheduleModal({
  filterDay,
  setFilterDay,
  filterSchedule,
  setFilterSchedule,
  filterLocation,
  setFilterLocation,
  priceRange,
  setPriceRange,
  handleApplyFilter,
}: FilterScheduleProps) {
  return (
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
  );
}
