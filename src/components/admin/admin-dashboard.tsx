import { useNavigate } from "react-router-dom";
import { AdminOverviewProps } from "../../utils/types";

export function AdminOverview({
  overviewData,
}: {
  overviewData: AdminOverviewProps;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className='requests-boards no-btm-border'>
        <div
          className='board'
          onClick={() =>
            // admin dashboard
            navigate("/dashboard?page=2", {
              state: { status: "Pre-Schedule" },
            })
          }
        >
          <div className='title'>
            <h6>Received PreSchedule</h6>
            <i className='bi bi-chevron-right'></i>
          </div>
          <h3>{overviewData.pendingReschedule}</h3>
        </div>
        <div
          className='board green'
          onClick={() =>
            navigate("/dashboard?page=2", {
              // admin dashboard
              state: { status: "Classic" },
            })
          }
        >
          <div className='title'>
            <h6>Received Classic</h6>
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
        <div
          className='board'
          onClick={() => navigate("/dashboard?page=3")} // admin dashboard
        >
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
