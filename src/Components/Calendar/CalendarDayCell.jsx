/* eslint-disable react/prop-types */
import { useMemo } from "react";

const MAX_VISIBLE_DOTS = 3;

const sortDeadlinesByDateTime = (deadlines) =>
  [...deadlines].sort((a, b) => {
    const first = new Date(a.dateTime).getTime();
    const second = new Date(b.dateTime).getTime();

    if (Number.isNaN(first) || Number.isNaN(second)) {
      return 0;
    }

    return first - second;
  });

const CalendarDayCell = ({ dayLabel, deadlines = [] }) => {
  const sortedDeadlines = useMemo(
    () => sortDeadlinesByDateTime(deadlines),
    [deadlines],
  );

  return (
    <div className='flex flex-col justify-between gap-3 rounded-xl border border-base-200 p-3 shadow-sm'>
      <div className='flex items-center justify-between text-sm font-semibold text-base-content/80'>
        <span>{dayLabel}</span>
        <span className='rounded-full bg-base-200 px-2 py-1 text-xs font-medium text-base-content/70'>
          {sortedDeadlines.length}
        </span>
      </div>

      <div className='flex flex-col gap-2 text-sm text-base-content/70'>
        {/* Full deadline names only on larger screens */}
        {sortedDeadlines.length > 0 ? (
          sortedDeadlines.map((deadline) => (
            <span key={deadline.id} className='hidden w-full rounded-md bg-base-200/60 px-2 py-1 text-xs font-medium sm:block'>
              <span className='block text-xs font-semibold text-base-content/80'>
                {deadline.name}
              </span>
              <span className='text-[0.65rem] text-base-content/60'>
                {new Date(deadline.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </span>
          ))
        ) : (
          <span className='hidden text-xs italic text-base-content/50 sm:block'>
            No deadlines
          </span>
        )}
      </div>

      <div className='flex items-center gap-1 sm:hidden'>
        {/* Visual dots for deadlines (max 3, then +N) */}
        {sortedDeadlines.slice(0, MAX_VISIBLE_DOTS).map((deadline) => (
          <span
            key={deadline.id}
            className='inline-flex h-2.5 w-2.5 rounded-full'
            style={{ backgroundColor: deadline.color || "var(--fallback-bc, #6b7280)" }}
            title={`${deadline.name} – ${new Date(deadline.dateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
        ))}
        {sortedDeadlines.length > MAX_VISIBLE_DOTS && (
          <span className='text-[0.7rem] font-semibold text-base-content/70'>
            +{sortedDeadlines.length - MAX_VISIBLE_DOTS}
          </span>
        )}
        {sortedDeadlines.length === 0 && (
          <span className='text-[0.7rem] italic text-base-content/50'>
            None
          </span>
        )}
      </div>
    </div>
  );
};

export default CalendarDayCell;
