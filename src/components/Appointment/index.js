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
import { Error } from './Error';

export const Appointment = (props) => {
  const { interview, interviewers, bookInterview, id, cancelInterview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const EDIT = 'EDIT';

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
      if (response !== 'error') {
        transition(SHOW);
      } else {
        transition(ERROR_SAVE, true);
      }
    });
  };

  

  const confirm = () => {
    transition(CONFIRM, true);
  }

  const close = (message) => {
      back();
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
      if (response === 'error') {
        transition(ERROR_DELETE, true);
      } else {
        transition(EMPTY);
      }
    });
  };

  const edit = () => {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SAVING && <Status message='Saving' />}
      {mode === CONFIRM && <Confirm message='Confirm' onConfirm={cancel} onCancel={back} />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_SAVE && <Error message='Could not Save!' onClose={close} />}
      {mode === ERROR_DELETE && <Error message='Could not Delete!' onClose={close} />}
      
     
      {mode === SHOW && (   <Show
          student={interview.student}
          interviewer={interview.interviewer}
          // onEdit={onEdit}
          onConfirm={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          editMode={true}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
    </article>
  );
};
