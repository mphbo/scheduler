import React from "react";

import { render } from "@testing-library/react";

import { Appointment } from "components/Appointment";


describe('Appointment', () => {
  it("renders without crashing", () => {
    render(
    <Appointment 
      // key={3}
      // id={3}
      // time={12}
      // interview={null}
      // interviewers={dailyinterviewers}
      // bookinterview={bookinterview}
      // cancelInterview={cancelInterview}  
    />
      );
  });

})
