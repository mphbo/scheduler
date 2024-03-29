import React, { useEffect } from "react";
import "./styles.scss";
import { Empty } from "./Empty";
import { Show } from "./Show";
import { Header } from "./Header";
import { Form } from "./Form";
import { Status } from './Status';
import { Confirm } from './Confirm';
import { useVisualMode } from "../../hooks/useVisualMode";
import { Error } from './Error';

export const Appointment = (props) => {
  const { interview, interviewers, bookInterview, id, cancelInterview, time } = props;

  
  //Different modes or views to render conditionally
  const EDIT = 'EDIT';
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const CONFIRM = 'CONFIRM';
  const DELETING = 'DELETING';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING, true);
    bookInterview(id, interview, false)
    .then((response) => {
      if (response !== 'error') {
        transition(SHOW);
      } else {
        transition(ERROR_SAVE, true);
      }
    });
  };
  

  const confirm = () => {
    transition(CONFIRM);
  }

  const close = (message) => {
      back();
  }

  const deleteInterview = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING, true);
    cancelInterview(id, interview)
    .then((response) => {
      if (response === 'error') {
        transition(ERROR_DELETE);
      } else {
        transition(EMPTY);
      }
    });
  };

  const edit = () => {
    transition(EDIT);
  }

  useEffect(() => {
    if (interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [interview, transition, mode]);


  return (
    <article className="appointment" data-testid='appointment'>
      
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message='Saving' />}
      {mode === CONFIRM && <Confirm message='Are you sure you would like to delete?' onConfirm={deleteInterview} onCancel={back} />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_SAVE && <Error message='Could not Save!' onClose={close} />}
      {mode === ERROR_DELETE && <Error message='Could not Delete!' onClose={close} />}
      
     
      {mode === SHOW && interview && (   
        <Show
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
          onCancel={back}
          onSave={save}
          editMode={true}
          name={interview.student}
          interviewer={interview.interviewer.id}
        />
      )}
    </article>
  );
};
