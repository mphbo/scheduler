import React from "react";
import { DayList } from './DayList'
import "components/Application.scss";
import { Appointment } from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import { useApplicationDataWithReducerHook } from "hooks/useApplicationDataWithReducerHookAndWebSocket";


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationDataWithReducerHook();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  const appointmentList = dailyAppointments.map((appoint) => {
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
        <Appointment time='5pm' />
      </section>
    </main>
  );
}













  // const [state, setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });
  // console.log('state.interviewers:', state.interviewers);

  
  // const setDay = day => setState({ ...state, day });

    // const bookInterview = (id, interview) => {
    
  //   // console.log('HELP:', id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview}
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
    
  //   console.log('appointment:', appointment);
  //   return axios.put(`/api/appointments/${appointment.id}`, {
  //     ...appointment
  //   })
  //   .then((response) => {
  //     setState({...state, appointments})
  //     return true;
  //   })
  //   .catch((e) => {
  //     return 'error';
  //   })
  // }

  // const cancelInterview = (id, interview) => {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   }
  //   console.log({ id: appointment.id,
  //     time: appointment.time,
  //     interview: null})
  //   return axios.delete(`/api/appointments/${id}`)
  //   .then((response) => {
  //     console.log('HELP')
  //     setState({...state, appointments})
  //     return true;
  //   })
  //   .catch(e =>  {
  //     return 'error' 
  //   })
  // }