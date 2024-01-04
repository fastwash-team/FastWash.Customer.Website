export function ScheduleView({ goBack }: { goBack: () => void }) {
  return (
    <div className='schedule-view'>
      <p className='goback_'>
        <i className='bi bi-arrow-left-short _back' onClick={goBack} />
      </p>
      <div className='schedule-view-header'>
        <div className='details'>
          <h3>#SCH8890 08:00 - 09:00</h3>
          <div className='extras'>
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
        <button>Download</button>
      </div>
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
    </div>
  );
}
