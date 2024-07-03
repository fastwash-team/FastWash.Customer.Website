import { AdminOverviewProps } from "../../utils/types";

export function AdminOverview({
  overviewData,
}: {
  overviewData: AdminOverviewProps;
}) {
  return (
    <>
      <div className='requests-boards no-btm-border'>
        <div className='board'>
          <div className='title'>
            <h6>Pending Schedule</h6>
            <i className='bi bi-chevron-right'></i>
          </div>
          <h3>{overviewData.pendingReschedule}</h3>
        </div>
        <div className='board green'>
          <div className='title'>
            <h6>Pending Classic</h6>
            <i className='bi bi-chevron-right'></i>
          </div>
          <h3>{overviewData.pendingClassic}</h3>
        </div>
      </div>
      <div className='requests-boards'>
        <div className='board blue'>
          <div className='title'>
            <h6>Active Coupons</h6>
            <i className='bi bi-chevron-right'></i>
          </div>
          <h3>0</h3>
        </div>
        <div className='board'>
          <div className='title'>
            <h6>All Requests</h6>
            <i className='bi bi-chevron-right'></i>
          </div>
          <h3>{overviewData.allRequests}</h3>
        </div>
      </div>
    </>
  );
}
