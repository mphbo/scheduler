import React, { useState, useEffect } from "react";
import { DayList } from './DayList'
import "components/Application.scss";
import { Appointment } from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';


// const appointments = [
//   {
//     id: 1,
//     time: "6am",
//     interview: {
//       student: "Chandler Bing",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "7am",
//     interview: {
//       student: "Phoebe Buffay",
//       interviewer: {
//         id: 1,
//         name: "Mike Wozowski",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "8am",
//   },
//     {
//     id: 1,
//     time: "9am",
//     interview: {
//       student: "Rachel Greene",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "12pm",
//     interview: {
//       student: "Ross Geller",
//       interviewer: {
//         id: 1,
//         name: "Mike Wozowski",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 2,
//     time: "3pm"
//   },
// ];




export default function Application(props) {
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
    isLoading: false
  });
  // console.log('state.interviewers:', state.interviewers);

  
  const setDay = day => setState({ ...state, day });
        

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);


  const bookInterview = (id, interview) => {
    
    console.log('HELP:', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    console.log('appointment:', appointment);
    return axios.put(`/api/appointments/${appointment.id}`, {
      ...appointment
    })
    .then((response) => {
      // console.log('response::',response);
      // setState({...state})
      // console.log('this has returned true')
      // return true;
      
      
      setState({...state, appointments})
      return true;
    })
  }

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    console.log({ id: appointment.id,
      time: appointment.time,
      interview: null})
    return axios.delete(`/api/appointments/${id}`)
    .then((response) => {
      console.log('HELP')
      setState({...state, appointments})
      return true;
    })
    .catch(e => console.log('e:', e))
  }


   useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    }).catch(e => console.log(e))
  }, []);

  const appointmentList = dailyAppointments.map((appoint, index) => {
    const interview = getInterview(state, appoint.interview);

    return (
      <Appointment 
        key={appoint.id}
        id={appoint.id}
        time={appoint.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
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
            days={state.days} 
            day={state.day}
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
