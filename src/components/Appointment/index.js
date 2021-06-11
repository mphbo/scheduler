import React from "react";
import "./styles.scss";
// import { Header } from "./Header";
import { Empty } from "./Empty";
import { Show } from "./Show";
// import { Confirm } from "./Confirm";
import { Form } from "./Form";
import { Status } from './Status';
import { Confirm } from './Confirm';
import { useVisualMode } from "../../hooks/useVisualMode";

export const Appointment = (props) => {
  const { interview, interviewers, bookInterview, id, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
    .then((response) => {
      console.log('response1234:', response);
      if (response) {
        transition(SHOW);
      }
    });
  };

  const confirm = () => {
    transition(CONFIRM);
  }

  const cancel = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    // transition(CONFIRM);
    transition(DELETING);
    cancelInterview(id, interview)
    .then((response) => {
      console.log('responseCancel:', response)
      if (response) {
        transition(EMPTY);
      }
    });
  };

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SAVING && <Status message='Saving' />}
      {mode === CONFIRM && <Confirm message='Confirm' onConfirm={cancel} onCancel={back} />}
      {mode === DELETING && <Status message='Deleting' />}
     
      {mode === SHOW && (   <Show
          student={interview.student}
          interviewer={interview.interviewer}
          // onEdit={onEdit}
          onConfirm={confirm}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
    </article>
  );
};
