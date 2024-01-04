import { EmptyContainer } from "../empty-wash-item-list";

export function AdminRequests() {
  return (
    <>
      <div className='admin-column'>
        <div className='column-title-wrapper'>
          <div className='title'>
            <h3>Requests</h3>
            <p>List of all your customer requests</p>
          </div>
          <div
            className='filter'
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
          >
            <i className='bi bi-filter'></i>
          </div>
        </div>
        <div className='admin-content-list'>
          <EmptyContainer />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
