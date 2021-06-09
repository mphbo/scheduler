import React, { useState, useEffect } from "react";
import { DayList } from './DayList'
import "components/Application.scss";
import { Appointment } from './Appointment';
import axios from 'axios';


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




export default function Application(props) {

  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  const appointmentList = appointments.map((appoint, index) => {
    return (
      <Appointment key={index} {...appoint} />
    )
  })

  useEffect(() => {
    const URL =  `http://localhost:8001/api/days`;
    axios.get(URL)
      .then((response) => {
        console.log(response.data);
        setDays([...response.data])
      }).catch(e => console.log(e));
  }, []);

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
