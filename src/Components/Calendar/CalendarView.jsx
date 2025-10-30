import { useMemo } from "react";
import CalendarDayCell from "./CalendarDayCell.jsx";
import useSEO from "../Hooks/useSEO.js";

const sampleDeadlines = [
  {
    id: "kickoff",
    name: "Project Kickoff",
    dateTime: "2024-12-02T09:00:00",
    color: "#0ea5e9",
  },
  {
    id: "wireframes",
    name: "Wireframe Review",
    dateTime: "2024-12-02T13:30:00",
    color: "#facc15",
  },
  {
    id: "api-contract",
    name: "API Contract Sign-off",
    dateTime: "2024-12-03T11:00:00",
    color: "#34d399",
  },
  {
    id: "copy",
    name: "Marketing Copy Due",
    dateTime: "2024-12-04T15:00:00",
    color: "#f472b6",
  },
  {
    id: "usability",
    name: "Usability Test",
    dateTime: "2024-12-04T10:30:00",
    color: "#fb7185",
  },
  {
    id: "handoff",
    name: "Design Handoff",
    dateTime: "2024-12-05T16:30:00",
    color: "#c084fc",
  },
  {
    id: "qa",
    name: "QA Regression",
    dateTime: "2024-12-06T09:30:00",
    color: "#a3e635",
  },
  {
    id: "launch",
    name: "Launch Dry Run",
    dateTime: "2024-12-06T18:00:00",
    color: "#f97316",
  },
];

const groupDeadlinesByDay = (deadlines) =>
  deadlines.reduce((acc, deadline) => {
    const date = new Date(deadline.dateTime);
    if (Number.isNaN(date.getTime())) {
      return acc;
    }

    const label = date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (!acc[label]) {
      acc[label] = [];
    }

    acc[label].push(deadline);
    return acc;
  }, {});

const CalendarView = () => {
  useSEO({
    title: "Calendar | CodeSphere",
    description: "Track upcoming deadlines across the week with a responsive calendar view.",
    canonical: "https://codes-sphere.vercel.app/calendar",
  });

  const deadlinesByDay = useMemo(
    () => groupDeadlinesByDay(sampleDeadlines),
    [],
  );

  return (
    <div className='min-h-screen w-full bg-base-100 px-6 py-16 sm:px-10 lg:px-16'>
      <header className='mx-auto flex w-full max-w-5xl flex-col gap-4 text-center'>
        <h1 className='text-3xl font-bold text-base-content sm:text-4xl'>
          Weekly Deadlines Overview
        </h1>
        <p className='text-base text-base-content/70 sm:text-lg'>
          Stay on top of upcoming work by reviewing each day’s schedule. Items are ordered by their exact
          due date and time so the most urgent work is always shown first.
        </p>
      </header>

      <div className='mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Object.entries(deadlinesByDay).map(([dayLabel, deadlines]) => (
          <CalendarDayCell key={dayLabel} dayLabel={dayLabel} deadlines={deadlines} />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
