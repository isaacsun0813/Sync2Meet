import clsx from 'clsx';
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from 'date-fns';
import { useMemo, useState } from 'react';
import '../styling/Calendar.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EventCalendar = ({schedule}) => {

  const [selectedDay, setSelectedDay] = useState(null);
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = useMemo(() => {
    return eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });
  }, [firstDayOfMonth, lastDayOfMonth]);

  const startingDayIndex = getDay(firstDayOfMonth);

  const handleDayClick = (day) => {
    // Here you could open a modal or another component to schedule an event
    console.log('Schedule event for:', format(day, 'yyyy-MM-dd'));
    schedule();
    setSelectedDay(day);
  };

  return (
    <div className='calendar-container'>
      <div className='calendar-header'>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
      </div>
      <div className='calendar-grid'>
        {WEEKDAYS.map((day) => (
          <div key={day} className='weekday-header'>
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} className='day-cell empty-cell' />
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={clsx('day-cell', {
              'today': isToday(day),
            })}
            onClick={() => handleDayClick(day)}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
