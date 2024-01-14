export function UpdateRequestStatus() {
  return (
    <div
      className='modal fade'
      id='update-request-status-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Update Status
            </h1>
          </div>
          <div className='modal-body'>
            <div className='status-type-container'>
              <div className='status'>
                <p>Received</p>
                <input type='checkbox' />
              </div>
              <div className='status'>
                <p>Pick up</p>
                <input type='checkbox' />
              </div>
              <div className='status'>
                <p>Wash</p>
                <input type='checkbox' />
              </div>
              <div className='status'>
                <p>Dry</p>
                <input type='checkbox' />
              </div>
              <div className='status'>
                <p>Delivered</p>
                <input type='checkbox' />
              </div>
              <div className='status'>
                <p>Completed</p>
                <input type='checkbox' />
              </div>
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
