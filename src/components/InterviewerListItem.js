import React from 'react';
import './InterviewerListItem.scss';
import classNames from 'classnames';

export const InterviewerListItem = props => {
  const { key, name, avatar, selected, onChange } = props;
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
    'interviewers__item-image': avatar
  })
  
  return (
    <li className={interviewerClass} onClick={onChange}>
      <img
         className='interviewers__item-image'
         src={avatar}
         alt={name}
         />
         {selected && name}
    </li>
  )
}