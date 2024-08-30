import React, { useState } from "react";
import { ReactFullYearScheduler } from "react-full-year-scheduler";
import dayjs from "dayjs";
import "./CalendarStyles.css"; // Import the custom CSS

const Calender = ({ isCollapsed, isDarkMode }) => {
  const [events, setEvents] = useState([
    {
      eventName: "event 1",
      startDate: dayjs("2023-01-10"),
      endDate: dayjs("2023-02-01"),
      eventBgColor: "red", // Changed to red for example
      eventTextColor: "white",
    },
    {
      eventName: "event 2",
      startDate: dayjs("2023-04-01"),
      endDate: dayjs("2023-04-30"),
      eventBgColor: "purple",
      eventTextColor: "white",
    },
    {
      eventName: "event 3",
      startDate: dayjs("2023-05-01"),
      endDate: dayjs("2023-05-29"),
      eventBgColor: "green",
      eventTextColor: "white",
    },
  ]);

  return (
    <div className={`calendar ${isCollapsed ? "collapsed" : ""} ${isDarkMode ? "dark-mode" : ""}`}>
      <h1 className="title">Annual vacation calendar</h1>
      <ReactFullYearScheduler
        events={events}
        locale="en"
        dateTooltipTheme="material"
        weekSeparatorWidth={10}
        weekSeparatorColor="white"
        headerWeekDayBgColor="#b39cd0"
        headerWeekendBgColor="rgba(75, 68, 83, 0.69)"
        weekendCellBackgroundColor="rgba(75, 68, 83, 0.69)"
        weekendCellTextColor="white"
        weekDayCellBackgroundColor="rgba(75, 68, 83, 0.69)"
        weekDayCellTextColor="white"
        selectionColor="black"
        selectionTextColor="white"
        maxRangeSelection={50}
        minRangeSelection={5}
        firstDayOfWeek="Monday"
        minYear={2023}
        maxYear={2024}
        
        readonlyCalendar={false}
        showWeekSeparator={false}
        showTodayButton={true}
        enableYearToYearSelection={true}
        enableWeekendSelection={true}
        minCellWidth={20}
        showSeparatorInHeader={false}
        enableEventOverwriting={true}
        onDatePick={(eventDate, clearSelectedCell) => {
          console.log(eventDate.toDate());
        }}
        onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {
          console.table([eventName, date.toDate()]);
        }}
        onRangePick={(eventStartDate, eventEndDate, clearSecondSelectedCell, clearSelection) => {
          console.log("Range picked from", eventStartDate.toDate(), "to", eventEndDate.toDate());
        }}
        onEventRangePickInterception={(
          eventFirstDate,
          eventLastDate,
          eventsToBeDeleted,
          eventsToBeUpdated,
          clearSecondSelectedCell,
          clearSelection
        ) => {}}
      />
      <div className="legend">
        {events.map((event, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: event.eventBgColor }}
            ></span>
            <span className="legend-name">{event.eventName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;

