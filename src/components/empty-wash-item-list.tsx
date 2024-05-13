import React from "react";
import WashingMachine from "../assets/svgs/washing-machine.svg";

export const EmptyContainer = ({
  emptyTitle = "No requests",
  emptyText = "Your have not created any FastWash requests yet. Click the button below to start.",
  buttonText = "Schedule Pickup",
  buttonAction = () => null,
  pageIcon = WashingMachine,
}: {
  emptyTitle?: string;
  emptyText?: string;
  buttonText?: string;
  buttonAction?: () => void;
  pageIcon?: string;
}) => {
  return (
    <div className='empty-container'>
      <img src={pageIcon} alt='' />
      <h4>{emptyTitle}</h4>
      <center>
        <p>{emptyText}</p>
      </center>
      <button onClick={buttonAction}>{buttonText}</button>
    </div>
  );
};
