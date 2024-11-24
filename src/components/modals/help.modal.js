export function HelpCenterModal() {
  return (
    <div
      className='modal fade'
      id='help-centre-modal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-md'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h3>Support Channels</h3>
          </div>
          <div className='modal-body'>
            <a className='_section' href='tel:+2347073378261'>
              <i className='bi bi-headset'></i>
              <div className=''>
                <h4>Call</h4>
                <h6>+234(0)7073378261</h6>
              </div>
            </a>
            <a className='_section' href='mailto:care@fastwash.africa'>
              <i className='bi bi-envelope-fill'></i>
              <div className=''>
                <h4>Email us</h4>
                <h6>care@fastwash.africa</h6>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
