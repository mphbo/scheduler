import React from 'react';
import { InterviewerListItem } from './InterviewerListItem';
import './InterviewerList.scss';

export const InterviewerList = props => {
  const { interviewers, value, onChange } = props;

  const interviewerList = interviewers.map((int) => {
    return (
      <InterviewerListItem
        key={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === value}
        setInterviewer={(event) => onChange(int.it)}
        />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"></h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}