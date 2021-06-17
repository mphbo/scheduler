export const getAppointmentsForDay = (state, day) => {
  const dayObject = state.days.filter((d) => {
    return d.name === day;
  });
  if (!day || !dayObject[0] || !state) {
    return [];
  }

  const appArr = dayObject[0].appointments.map((app) => {
    return state.appointments[app];
  });


  console.log(appArr);
  return appArr;
};

export const getInterview = (state, interview) => {
  if (interview && interview.interviewer && interview.student) {
    for (let app in state.appointments) {
      if (state.appointments[app].interview) {
        if (
          state.appointments[app].interview.student === interview.student &&
          state.appointments[app].interview.interviewer ===
            interview.interviewer
        ) {
          const intObject = {
            student: interview.student,
            interviewer: {
              id: interview.interviewer,
              name: state.interviewers[interview.interviewer].name,
              avatar: state.interviewers[interview.interviewer].avatar,
            },
          };

          return intObject;
        }
      }
    }
  }
  return null;
};

export const getInterviewersForDay = (state, day) => {
  const dayObject = state.days.filter((d) => {
    return d.name === day;
  });
  if (!day || !dayObject[0] || !state) {
    return [];
  }

  const intArr = dayObject[0].interviewers.map((int) => {
    return state.interviewers[int];
  });

  return intArr;
};
