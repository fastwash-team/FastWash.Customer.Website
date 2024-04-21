import { supportedAreas } from "../../../utils";
import { FilterScheduleProps } from "../../../utils/types";

export function FilterScheduleModal({
  filterSchedule,
  setFilterSchedule,
  filterLocation,
  setFilterLocation,
  priceRange,
  setPriceRange,
  handleApplyFilter,
}: FilterScheduleProps) {
  const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const hoursMins = hours.map((el) => (el < 10 ? `0${el}:00` : `${el}:00`));
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
              <div className='row'>
                <div className='col-3'>
                  <label>Start Time</label>
                  <select
                    className='form-select'
                    onChange={({ target: { value } }) =>
                      // setTimes({ ...times, endTime: value })
                      console.log({ value })
                    }
                  >
                    {hoursMins.slice(1).map((el) => (
                      <option value={el} key={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-3'>
                  <label>End Time</label>
                  <select
                    className='form-select'
                    onChange={({ target: { value } }) =>
                      // setTimes({ ...times, endTime: value })
                      console.log({ value })
                    }
                  >
                    {hoursMins.slice(1).map((el) => (
                      <option value={el} key={el}>
                        {el}
                      </option>
                    ))}
                  </select>
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
