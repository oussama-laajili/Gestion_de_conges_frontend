import React, { useEffect, useState, useCallback } from 'react';
import { Scheduler, View, Editing } from 'devextreme-react/scheduler';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './styles.css';

function Calendaar() {
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch('http://localhost:5000/calendar'); // Adjust the URL as necessary
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }

    fetchAppointments();
  }, []);

  const handlePropertyChange = useCallback((e) => {
    if (e.name === 'currentDate') {
      setCurrentDate(e.value);
    }
  }, []);

  return (
    <div className="App">
      <Scheduler id="scheduler"
        dataSource={appointments}
        textExpr="title"
        startDateExpr="startDate"
        endDateExpr="endDate"
        recurrenceRuleExpr="recurrence"
        currentDate={currentDate}
        onOptionChanged={handlePropertyChange}
        defaultCurrentView="week"
        timeZone="Europe/Berlin"
        adaptivityEnabled={true}>
        <View
          type="day"
          startDayHour={10}
          endDayHour={22}
        />
        <View
          type="week"
          startDayHour={10}
          endDayHour={22}
        />
        <View type="month" />
        <Editing
          allowTimeZoneEditing={true}
          allowDragging={false}
        />
      </Scheduler>
    </div>
  );
}

export default Calendaar;
