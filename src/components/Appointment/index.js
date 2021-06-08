import React from 'react';
import './styles.scss';
import { Header } from './Header';
import { Empty } from './Empty';
import { Show } from './Show';
import { Confirm } from './Confirm';
export const Appointment = props => {
  const { time, onAdd, onEdit, onDelete, interviewer, student, message, onConfirm, onCancel } = props;

  return (
    <article className="appointment">
      <Header time={time} />
      <Empty onAdd={onAdd} />
      <Show student={student} interviewer={interviewer} onEdit={onEdit} onDelete={onDelete} />
      <Confirm message={message} onConfirm={onConfirm} onDelete={onCancel} />
    </article>
  )
}