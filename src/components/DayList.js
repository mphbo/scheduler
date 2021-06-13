import React from 'react';
import DayListItem from './DayListItem';
import { useApplicationData } from 'hooks/useApplicationData';

export const DayList = props => {
  
  const { days, day, setDay } = props;
  const dayList = days.map((d) => {

      return ( 
        <DayListItem 
          name={d.name}
          spots={d.spots}
          selected={d.name === day}
          setDay={setDay}
          key={d.id}
        />
      )
  })

  return (
    <ul>{dayList}</ul>
  )
}