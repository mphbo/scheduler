import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';

export const InterviewerListItem = props => {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
    'interviewers__item-image': avatar
  })
  
  return (
    <li className={interviewerClass} key={id} onClick={setInterviewer}>
      <img
         className='interviewers__item-image'
         src={avatar}
         alt={name}
         />
         {props.selected && props.name}
    </li>
  )
}