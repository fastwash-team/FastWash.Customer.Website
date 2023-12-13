import React from "react";
import WashingMachine from "../../assets/svgs/washing-machine.svg";

export function CompleteScheduleScreen() {
  return (
    <div className='schedule-pickup__body__steps-view-render complete-schedule-screen'>
      <img src={WashingMachine} alt='' />
      <h2>FastWash request sent</h2>
      <center>
        <p>
          We are processing your request, a message has been sent to your phone
          number and email
        </p>
      </center>
      <button>Done</button>
    </div>
  );
}
