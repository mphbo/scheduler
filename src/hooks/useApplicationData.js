import { useEffect, useState } from "react";
import axios from "axios";
// import { getInterviewersForDay } from "helpers/selectors";




//IMPORTANT, this hook was kept in repo as a guide to remember how I went from useState to useReducer!! please refer to useApplicationDataWithReducerHookAndWebSocket for actual custom hook



export const useApplicationData = (initial) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: null,
  });
  console.log("state.day:", state.days);
  console.log("state.appointments:", state.appointments);
  const setDay = (day) => setState({ ...state, day });
  // const setSpots = (spots) => {
  //   setState({ ...state, spots })
  // }
  // const setSpots = day => setState({ ...state, day.appointments })
  // const getDayObject = day => {
  //   for (const item of days) {
  //     if (days)
  //   }
  // }

  const bookInterview = (id, interview) => {
    // console.log('HELP:', id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("interview:", interview);

    // const interviews = getInterviewersForDay(state.day);
    // console.log('thee, interviews:', interviews);

    // console.log("appointment:", appointment);
    return axios
    .put(`/api/appointments/${appointment.id}`, {
        ...appointment,
      })
      .then((response) => {
        setState((state) => {
          // console.log("state.days", state.days);
          
          const days = state.days.map((day) => {


            // const spots = updateSpots(x, y, z)

            if (state.day === day.name) {
              day.spots = day.spots - 1;
            }
            return day;
          });

          return { ...state, appointments, days: days };
        });
        console.log("dataaaa", response);
        return true;
      })
      .catch((e) => {
        console.log(e);
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
    console.log("interviewshiz:", interview);
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        console.log("HELP");

        setState((state) => {
          const days = state.days.map((day) => {
            if (state.day === day.name) {
              day.spots = day.spots + 1;
            }
            return day;
          });
          return {...state, appointments, days}
          });
        return true;
      })
      .catch((e) => {
        return "error";
      });
  };

  useEffect(() => {
    console.log('hahahaaha');
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((e) => console.log(e));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};


//  const SET_DAY = "SET_DAY";
//   const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
//   const SET_INTERVIEW = "SET_INTERVIEW";

//   const reducer = (state, action) => {
//     console.log('action:', action);
//     switch (action.type) {
//       case SET_DAY:
//         return { ...state, day: action.day };
//       case SET_APPLICATION_DATA:
//         return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
//       case SET_INTERVIEW: {
//         return { ...state, interviews: action.interviewers };
//       }
//       default:
//         throw new Error(
//           `Tried to reduce with unsupported action type: ${action.type}`
//         );
//     }
//   };
//   const initialState = {
//     day: 'Monday'
//   }

// export const useApplicationData = (initial) => {
//   // const [state, setState] = useState({
//   //   day: "Monday",
//   //   days: [],
//   //   appointments: {},
//   //   interviewers: {},
//   //   spots: null,
//   // });
//   // console.log("state.day:", state.days);
//   // console.log("state.appointments:", state.appointments);
//   // const setDay = (day) => setState({ ...state, day });
//   // const setSpots = (spots) => {
//   //   setState({ ...state, spots })
//   // }
//   // const setSpots = day => setState({ ...state, day.appointments })
//   // const getDayObject = day => {
//   //   for (const item of days) {
//   //     if (days)
//   //   }
//   // }

 
  
//   const [state, dispatch] = useReducer(reducer, initialState)
  
//   useEffect(() => {
//     console.log('ahahhhhhhh')
//     // Promise.all([
//     //   axios.get("/api/days"),
//     //   axios.get("/api/appointments"),
//     //   axios.get("/api/interviewers"),
//     // ])
//     //   .then((all) => {
//     //     dispatch({
//     //       type: SET_APPLICATION_DATA,
//     //       days: all[0].data,
//     //       appointments: all[1].data,
//     //       interviewers: all[2].data,
//     //     });
//     //   })
//     //   .catch((e) => console.log(e));
//   }, [dispatch]);
  
//   const bookInterview = (id, interview) => {
//     // console.log('HELP:', id, interview);
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview },
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };

//     // const interviews = getInterviewersForDay(state.day);
//     // console.log('thee, interviews:', interviews);

//     // console.log("appointment:", appointment);
//     return axios
//       .put(`/api/appointments/${appointment.id}`, {
//         ...appointment,
//       })
//       .then((response) => {
//         dispatch({ type: SET_INTERVIEW, appointments });
//         console.log(response);
//         return true;
//       })
//       .catch((e) => {
//         return "error";
//       });
//   };

//   const cancelInterview = (id, interview) => {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null,
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };
//     console.log("interviewshiz:", interview);
//     return axios
//       .delete(`/api/appointments/${id}`)
//       .then((response) => {
//         console.log("HELP");
//         dispatch({type: SET_INTERVIEW, appointments });
//         return true;
//       })
//       .catch((e) => {
//         return "error";
//       });
//   };

  

//   return {
//     state,
//     bookInterview,
//     cancelInterview,
//   };
// };
