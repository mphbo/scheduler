import React, { Fragment } from 'react';
import './styles.scss';
import { Header } from './Header';
import { Empty } from './Empty';
import { Show } from './Show';
import { Confirm } from './Confirm';
export const Appointment = props => {
  const { interview, id, time, student } = props;

  return (
    <article className="appointment">
      <Header  time={time} />
      {interview ? <Show interviewer={interview.interviewer.name} student={interview.student} /> : <Empty />}
    </article>
  )
}
