import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

export default function DatePicker({ value, onChange }) {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`p-2 text-center cursor-pointer rounded-xl ${isSameDay(day, value) ? 'bg-white shadow' : ''} ${!isSameMonth(day, monthStart) ? 'opacity-40' : ''}`}
          onClick={() => onChange(cloneDay)}
          key={day}
        >
          {formattedDate}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<div className="grid grid-cols-7 gap-1" key={day}>{days}</div>);
    days = [];
  }

  return (
    <div className="glass p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-2">
        <button className="px-3 py-1 rounded-xl bg-white" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>{'<'}</button>
        <div className="font-semibold">{format(currentMonth, 'MMMM yyyy')}</div>
        <button className="px-3 py-1 rounded-xl bg-white" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{'>'}</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs font-medium mb-1">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div className="text-center" key={d}>{d}</div>)}
      </div>
      {rows}
    </div>
  );
}
