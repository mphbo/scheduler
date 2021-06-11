import React, { useState } from "react";
import { Button } from '../Button';
import { InterviewerList } from '../InterviewerList';

export const Form = (props) => {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const { interviewers, onSave, onCancel } = props;
  const reset = () => {
    setName('');
    setInterviewer(null);
    onCancel();
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={(value) => setInterviewer(value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={reset}  danger>Cancel</Button>
          <Button onClick={() => onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};
