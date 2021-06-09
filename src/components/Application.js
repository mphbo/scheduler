import React, { useState } from "react";
import { DayList } from './DayList'
import "components/Application.scss";
import { Appointment } from './Appointment';

const appointments = [
  {
    id: 1,
    time: "6am",
    interview: {
      student: "Chandler Bing",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "7am",
    interview: {
      student: "Phoebe Buffay",
      interviewer: {
        id: 1,
        name: "Mike Wozowski",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "8am",
  },
    {
    id: 1,
    time: "9am",
    interview: {
      student: "Rachel Greene",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "12pm",
    interview: {
      student: "Ross Geller",
      interviewer: {
        id: 1,
        name: "Mike Wozowski",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "3pm"
  },
];


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {

  const [day, setDay] = useState('Monday');

  const appointmentList = appointments.map((appoint, index) => {
    return (
      <Appointment key={appoint.id} {...appoint} />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={days} 
            day={day}
            setDay={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointmentList}
      </section>
    </main>
  );
}
