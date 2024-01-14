export function UpdateWash() {
  return (
    <div
      className='modal fade'
      id='update-wash-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              Add Wash
            </h1>
          </div>
          <div className='modal-body'>
            <div className='update-wash'>
              <h4>One Wash</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
