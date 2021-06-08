import React from 'react';
import './DayListItem.scss'
import classNames from 'classnames';


export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames(
    'day-list__item', {
      'day-list__item--selected': selected,
      'day-list__item--full': spots ? false: true
    })

    const formatSpots = (spots) => {
      if (spots === 1) {
        return '1 spot remaining';
      }
      if (spots === 0) {
        return 'no spots remaining'
      }
      else return `${spots} spots remaining`
    }
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}