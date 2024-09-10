import React from "react";
import WashingMachine from "../assets/svgs/washing-machine.svg";

export const EmptyContainer = ({
  emptyTitle = "No requests",
  emptyText = "Your have not created any FastWash requests yet. Click the button below to start.",
  buttonText = "Schedule Pickup",
  buttonAction = () => window.location.replace("/schedule-pickup/1"),
  pageIcon = WashingMachine,
  showAction = true,
  hasFilter = false,
}: {
  emptyTitle?: string;
  emptyText?: string;
  buttonText?: string;
  buttonAction?: () => void;
  pageIcon?: string;
  showAction?: boolean;
  hasFilter?: boolean;
}) => {
  return (
    <div className='empty-container'>
      <img src={pageIcon} alt='' />
      <h4>{emptyTitle}</h4>
      <center>
        <p>{hasFilter ? "No result for applied filter(s)" : emptyText}</p>
      </center>
      {showAction && <button onClick={buttonAction}>{buttonText}</button>}
    </div>
  );
};
