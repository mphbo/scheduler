import { useEffect, useReducer } from "react";
import axios from "axios";
import { updateSpots } from '../helpers/updateSpots';
import { reducer, SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW } from '../reducers/reducer';

const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {},
  spots: null,
};


//IMPORTANT, This file was kept to explain to myself in the future how I went from using HTTP to using webSockets, please refer to useApplicationDataWithReducerHookAndWebSocket for actual custom hook


export const useApplicationDataWithReducerHook = (initial) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {


    // const socket = new WebSocket("ws://localhost:8001");
    // socket.onopen = (event) => {
    //   socket.send('ping');
    //   // socket.send('Heyyyyy');
      
    // }
    
    // socket.onmessage = (event) => {
    //   console.log('Message Recieved:', event.data);
    //test comment
    //test comment
    // }



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
      })
      .catch((e) => console.log(e));
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview, edit) => {
    console.log('HELP:', edit);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      // const spots = updateSpots(state.day, state.days, )

      if (state.day === day.name) {
        if (edit) {
          day.spots = day.spots;
        }
        if (!edit) {
          day.spots = day.spots - 1;
        }
      }
      return day;
    });

    return axios
      .put(`/api/appointments/${appointment.id}`, {
        ...appointment,
      })
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, appointments, days });
        return true;
      })
      .catch((e) => {
        return "error";
      });
  };

  const cancelInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {

      if (state.day === day.name) {
        day.spots = day.spots + 1;
      }
      return day;
    });
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        console.log("HELP");
        dispatch({ type: SET_INTERVIEW, appointments, days });
        return true;
      })
      .catch((e) => {
        return "error";
      });
  };

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  };
};
