import { useEffect, useReducer } from "react";
import axios from "axios";
import { updateSpots } from "helpers/updateSpots";
import { reducer, SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW } from '../reducers/reducer';

//initial state for reducer (cannot miss any states otherwise crash)
const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
  spots: null,
};


//there are three hooks in this folder, this is the final one, others are included to remind myself how I implemented each stretch feature (useReducer, webSockets)
export const useApplicationDataWithReducerHook = (initial) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //useEffect is called for first page load
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
        return {
          days: all[0].data,
          appointments: all[1].data
        }
      })
      .then((response) => {

        //after page rendered a websocket is created to send messages to render create/delete appointments on everyones screen that is connected without a page reload
        const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
        socket.onopen = (event) => {
          socket.send("ping");
          // socket.send('Heyyyyy');
        };
        socket.onmessage = (event) => {
          const appointment = JSON.parse(event.data);

          if (appointment.type === "SET_INTERVIEW") {

            dispatch({
              type: SET_INTERVIEW,
              appointment,
              time: response.appointments[appointment.id].time
            });
            socket.send(appointment);
          }
        };
      })
      .catch((e) => console.log(e));
  }, []);

  
  //setDay function to be exported to allow application to change day-state
  const setDay = (day) => dispatch({ type: SET_DAY, day });


  //a lot happens here and I need to break this function out of this file when I get a chance to make my code more modular

  //This is a function that when called instigates an axios request sending an interview to the api server and changing state to rerender
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${appointment.id}`, {
        ...appointment,
      })
      .then((response) => {
        const days = updateSpots(state.day, state.days, appointments);
        dispatch({ type: SET_INTERVIEW, appointment, days, time: appointment.time });
        return true;
      })
      .catch((e) => {
        return "error";
      });
  };

  //Similar to bookInterview except we are sending a delete request via axios to the api server to get rid of an interview for a given appointment slot
  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        const days = updateSpots(state.day, state.days, appointments);
        dispatch({ type: SET_INTERVIEW, appointment, days, time: appointment.time });
        return true;
      })
      .catch((e) => {
        return "error";
      });
  };

  //Object is returned to be exported and used in Application
  return {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  };
};
