import React from "react";
import "./styles.scss";
// import { Header } from "./Header";
import { Empty } from "./Empty";
import { Show } from "./Show";
// import { Confirm } from "./Confirm";
import { Form } from './Form';
import { useVisualMode } from "../../hooks/useVisualMode";

export const Appointment = (props) => {
  const { interview, interviewers, bookInterview, id } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    console.log('interview:', interview)
    bookInterview(id, interview);
  }

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interview={interview.interviewer}
          // onEdit={onEdit}
          // onDelete={onDelete}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back()} onSave={save}/>}
    </article>
  );
};
