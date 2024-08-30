// import React from 'react';
// import Calendar from '../calender/Calendar'; // Adjust the path if Calendar is in a different directory
// import './schdule.css';

// // Example event data
// const events = [
//     {
//         startDate: new Date(2024, 6, 15),
//         endDate: new Date(2024, 6, 16),
//         name: 'Meeting with Team',
//         color: '#ff5733' // Add a color for the legend
//     },
//     {
//         startDate: new Date(2024, 7, 1),
//         endDate: new Date(2024, 7, 1),
//         name: 'Project Deadline',
//         color: '#33c1ff' // Add a color for the legend
//     },
//     {
//         startDate: new Date(2024, 7, 10),
//         endDate: new Date(2024, 7, 12),
//         name: 'Company Retreat',
//         color: '#75ff33' // Add a color for the legend
//     }
// ];

// // Example callback functions (empty in this case)
// const handleDayClick = () => {};
// const handleDayContextMenu = () => {};
// const handleRangeSelection = () => {};
// const handleYearChanged = () => {};

// // CalendarExample component
// const CalendarExample = () => {
//     return (
//         <div className="calendar-container">
//             <Calendar
//                 dataSource={events}
//                 onDayClick={handleDayClick}
//                 onDayContextMenu={handleDayContextMenu}
//                 onSelectRange={handleRangeSelection}
//                 onYearChanged={handleYearChanged}
//                 allowOverlap={true}
//                 alwaysHalfDay={false}
//                 displayHeader={true}
//                 displayWeekNumber={true}
//                 enableContextMenu={true}
//                 enableRangeSelection={true}
//                 language="en"
//                 style="modern"
//                 weekStart={0} // Sunday
//                 year={2024}
//             />
//             <div className="legend-container">
//                 <div className="legend">
//                     <h2>Legend</h2>
//                     {events.map((event, index) => (
//                         <div key={index} className="legend-item">
//                             <span
//                                 className="legend-color"
//                                 style={{ backgroundColor: event.color }}
//                             ></span>
//                             <span className="legend-name">{event.name}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CalendarExample;








import React, { useEffect, useState } from 'react';
import Calendar from '../calender/Calendar'; // Adjust the path if Calendar is in a different directory
import Modal from 'react-modal'; // Import the modal library
import './schdule.css';

// Function to generate a random color
const getStatusColor = (recurrence) => {
    switch (recurrence) {
        case 'accepted':
            return 'green';
        case 'en attente':
            return 'orange';
        case 'refused':
            return 'red';
        default:
            return '#ccc'; // Default color if status is unknown
    }
};

const CalendarExample = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventDetails, setEventDetails] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Fetch events from backend
        fetch('http://localhost:5000/calendar') // Adjust URL if necessary
            .then(response => response.json())
            .then(data => {
                // Map the data to include status color and adjust date formats
                const eventsWithColor = data.map(event => ({
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                    name: event.title,
                    color: getStatusColor(event.recurrence),
                    recurrence: event.recurrence
                }));
                setEvents(eventsWithColor);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleDayClick = (event) => {
        // Extract the date from the event object
        const clickedDate = event.date || event.target.date; // Adjust based on the exact structure
        
        // Convert to a Date object
        const selectedDate = new Date(clickedDate);
        console.log('Clicked Date:', selectedDate); // Debug log
        
        if (isNaN(selectedDate.getTime())) {
            console.error('Invalid Date:', clickedDate);
            return;
        }
    
        // Normalize the selectedDate to start and end of the day
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
        console.log('Normalized Date Range:', startOfDay.toISOString(), endOfDay.toISOString()); // Debug log
        
        // Fetch all events from the backend
        fetch('http://localhost:5000/calendar')
            .then(response => response.json())
            .then(data => {
                // Map the data to include status color and adjust date formats
                const eventsWithColor = data.map(event => ({
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                    name: event.title,
                    color: getStatusColor(event.recurrence),
                    recurrence: event.recurrence
                }));
                setEvents(eventsWithColor);
    
                // Find events for the selected date
                const eventsOnDate = eventsWithColor.filter(event => {
                    const eventStartDate = new Date(event.startDate);
                    const eventEndDate = new Date(event.endDate);
                    console.log('Event Dates:', eventStartDate.toISOString(), eventEndDate.toISOString()); // Debug log
    
                    return (
                        (eventStartDate >= startOfDay && eventStartDate <= endOfDay) ||
                        (eventEndDate >= startOfDay && eventEndDate <= endOfDay) ||
                        (eventStartDate <= startOfDay && eventEndDate >= endOfDay)
                    );
                });
                console.log('Events on Date:', eventsOnDate); // Debug log
    
                if (eventsOnDate.length > 0) {
                    // Set event details for the selected date
                    setEventDetails(
                        eventsOnDate.map(event => (
                            <div key={event.name} style={{ textDecoration: `underline ${event.color}` }}>
                                <h3>{event.name}</h3>
                                <p>Start Date: {event.startDate.toDateString()}</p>
                                <p>End Date: {event.endDate.toDateString()}</p>
                            </div>
                        ))
                    );
                } else {
                    // No events found
                    setEventDetails('There is no event on this date.');
                }
    
                // Set the selected date
                setSelectedDate(selectedDate);
                // Open the modal
                setModalIsOpen(true);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setEventDetails('An error occurred while fetching event details.');
                setModalIsOpen(true);
            });
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="calendar-container">
            <div className="legend-container">
                <h2>Legend</h2>
                <div className="legend">
                    <div className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: getStatusColor('accepted') }}
                        ></span>
                        <span className="legend-name">Accepted</span>
                    </div>
                    <div className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: getStatusColor('en attente') }}
                        ></span>
                        <span className="legend-name">Pending</span>
                    </div>
                    <div className="legend-item">
                        <span
                            className="legend-color"
                            style={{ backgroundColor: getStatusColor('refused') }}
                        ></span>
                        <span className="legend-name">Refused</span>
                    </div>
                </div>
            </div>

            <Calendar
                dataSource={events}
                onDayClick={handleDayClick}
                // other props...
            />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Event Details"
                className="modal"
                overlayClassName="overlay"
            >
                <h2>Details for {selectedDate?.toDateString()}</h2>
                <div>{eventDetails}</div>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default CalendarExample;






// export default CalendarExample;





// import React, { useEffect, useState } from 'react';
// import Calendar from '../calender/Calendar'; // Adjust the path if Calendar is in a different directory
// import Modal from 'react-modal';
// import './schdule.css';

// Modal.setAppElement('#root'); // Set the root element for accessibility

// const CalendarExample = () => {
//     const [events, setEvents] = useState([]);
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const [modalIsOpen, setModalIsOpen] = useState(false);

//     useEffect(() => {
//         fetch('http://localhost:5000/calendar')
//             .then(response => response.json())
//             .then(data => {
//                 const eventsWithColor = data.map(event => {
//                     let eventColor;
//                     if (event.recurrence === "accepted") {
//                         eventColor = "green";
//                     } else if (event.recurrence === "refused") {
//                         eventColor = "red";
//                     }
//                     return {
//                         ...event,
//                         startDate: new Date(event.startDate),
//                         endDate: new Date(event.endDate),
//                         name: event.title,
//                         color: eventColor
//                     };
//                 });
    
//                 console.log(eventsWithColor); // Log events to check data
//                 setEvents(eventsWithColor);
//             })
//             .catch(error => {
//                 console.error('Error fetching events:', error);
//             });
//     }, []);
    

//     const handleDayClick = (date, events) => {
//         if (events && events.length > 0) {
//             setSelectedEvent(events[0]); // Assuming one event per day, adjust as needed
//             setModalIsOpen(true); // Open the modal
//         } else {
//             setSelectedEvent(null);
//             setModalIsOpen(false);
//         }
//     };

//     const closeModal = () => {
//         setModalIsOpen(false);
//         setSelectedEvent(null);
//     };

//     // Example callback functions (empty in this case)
//     const handleDayContextMenu = () => {};
//     const handleRangeSelection = () => {};
//     const handleYearChanged = () => {};

//     return (
//         <div className="calendar-container">
//             <div className="legend-container">
//                 <h2>Legend</h2>
//                 <div className="legend">
//                     <div className="legend-item">
//                         <span
//                             className="legend-color"
//                             style={{ backgroundColor: "green" }}
//                         ></span>
//                         <span className="legend-name">Accepted</span>
//                     </div>
//                     <div className="legend-item">
//                         <span
//                             className="legend-color"
//                             style={{ backgroundColor: "red" }}
//                         ></span>
//                         <span className="legend-name">Refused</span>
//                     </div>
//                 </div>
//             </div>

//             <Calendar
//                 dataSource={events}
//                 onDayClick={handleDayClick}
//                 onDayContextMenu={handleDayContextMenu}
//                 onSelectRange={handleRangeSelection}
//                 onYearChanged={handleYearChanged}
//                 allowOverlap={true}
//                 alwaysHalfDay={false}
//                 displayHeader={true}
//                 displayWeekNumber={true}
//                 enableContextMenu={true}
//                 enableRangeSelection={true}
//                 language="en"
//                 style="modern"
//                 weekStart={0} // Sunday
//                 year={2024}
//             />

//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Event Details"
//                 className="modal"
//                 overlayClassName="modal-overlay"
//             >
//                 {selectedEvent && (
//                     <div className="event-details">
//                         <h3>Event Details</h3>
//                         <p><strong>Title:</strong> {selectedEvent.title}</p>
//                         <p><strong>Start Date:</strong> {selectedEvent.startDate.toLocaleDateString()}</p>
//                         <p><strong>End Date:</strong> {selectedEvent.endDate.toLocaleDateString()}</p>
//                         <p><strong>Status:</strong> {selectedEvent.recurrence}</p>
//                         <p><strong>Description:</strong> {selectedEvent.description}</p>
//                         <button onClick={closeModal}>Close</button>
//                     </div>
//                 )}
//             </Modal>
//         </div>
//     );
// };

// export default CalendarExample;



