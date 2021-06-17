import { updateSpots } from "helpers/updateSpots";
export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";



//reducer function for useReducer hook, action variables above

export const reducer = (state, action) => {
  console.log("action:", action);
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
      console.log('state1234:', state, 'appointment:', action.appointment);

      //function imported to create a new days array with updated spots numbers to be rendered in the days list
      const days = updateSpots(state.day, state.days, {...state.appointments, [action.appointment.id]: action.appointment});

      return {
        ...state, 
        appointments: {...state.appointments, [action.appointment.id]: {...action.appointment, time: action.time}}, 
        days 
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};
