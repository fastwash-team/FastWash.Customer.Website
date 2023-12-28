import React from "react";
import WashingMachine from "../assets/svgs/washing-machine.svg";

export const EmptyContainer = () => {
  return (
    <div className='empty-container'>
      <img src={WashingMachine} alt='' />
      <h4>No requests</h4>
      <center>
        <p>
          Your have not created any FastWash requests yet. Click the button
          below to start.
        </p>
      </center>
      <button>Schedule Pickup</button>
    </div>
  );
};
