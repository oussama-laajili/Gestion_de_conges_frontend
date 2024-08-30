import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faCalendarAlt, faComment, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

import './LeaveRequestForm.css';

const LeaveRequestForm = ({ isCollapsed, isDarkMode }) => {
  const [submitted, setSubmitted] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [allDay, setAllDay] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [supportingdoc, setSupportingdoc] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    onDrop: (acceptedFiles) => {
      // Handle the accepted files
      console.log(acceptedFiles);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email'); // Get email from local storage
  
    // Format the start and end dates
    let formattedStart, formattedEnd;
    if (allDay === 'Not all day') {
      formattedStart = new Date(`${start}T${startTime}`).toISOString();
      formattedEnd = new Date(`${start}T${endTime}`).toISOString();
    } else {
      formattedStart = new Date(start).toISOString();
      formattedEnd = new Date(end).toISOString();
    }
  
    const formData = new FormData();
    formData.append('start', formattedStart);
    formData.append('end', formattedEnd);
    formData.append('type', leaveType);
    formData.append('statut', 'en attente');
    formData.append('commentaire', commentaire);
    formData.append('email', email);
  
    if (supportingdoc) {
      formData.append('supportingdoc', supportingdoc);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/conges', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmitted(true);
      console.log('Leave request submitted successfully:', response.data);
  
      // Create a new notification
      const notificationData = {
        email: email,
        title: `New leave request from `,
      };
      await axios.post('http://localhost:5000/notifications', notificationData);
      console.log('Notification created successfully');
  
      // Add the event to the calendar
      const calendarData = {
        title: `${email} - ${leaveType}`,
        startDate: formattedStart,
        endDate: formattedEnd,
        recurrence: 'en attente',
      };
      await axios.post('http://localhost:5000/calendar', calendarData);
      console.log('Event added to calendar successfully');
  
    } catch (error) {
      console.error('Error submitting leave request or creating notification:', error);
    }
  };
  
  

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value);
    setAllDay(''); // Reset allDay when leaveType changes
  };

  const handleAllDayChange = (e) => {
    setAllDay(e.target.value);
  };

  const renderDateInputs = () => {
    return (
      <>
        <div className="form-group">
          <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <FontAwesomeIcon className='iconnnn' icon={faCalendarAlt} />
            <input
              className={`input ${isDarkMode ? 'dark-mode' : ''}`}
              type="date"
              name="startDate"
              required
              placeholder="Start Date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <FontAwesomeIcon className='iconnnn' icon={faCalendarAlt} />
            <input
              className={`input ${isDarkMode ? 'dark-mode' : ''}`}
              type="date"
              name="endDate"
              required
              placeholder="End Date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
      </>
    );
  };

  const renderSingleDayInputs = () => {
    return (
      <div className="form-group">
        <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
          <FontAwesomeIcon className='iconnnn' icon={faCalendarAlt} />
          <input
            className={`input ${isDarkMode ? 'dark-mode' : ''}`}
            type="date"
            name="date"
            required
            placeholder="Date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          <input
            className={`input ${isDarkMode ? 'dark-mode' : ''}`}
            type="time"
            name="startTime"
            required
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            className={`input ${isDarkMode ? 'dark-mode' : ''}`}
            type="time"
            name="endTime"
            required
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
    );
  };

  const renderAllDayOptions = () => {
    return (
      <div className="form-group">
        <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
          <FontAwesomeIcon className='iconnnn' icon={faExchangeAlt} />
          <select
            name="allDay"
            required
            className={`select-input ${isDarkMode ? 'dark-mode' : ''}`}
            value={allDay}
            onChange={handleAllDayChange}
          >
            <option value="" disabled>All day or not all day</option>
            <option value="All day">All day</option>
            <option value="Not all day">Not all day</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className={`leave-request-container ${isCollapsed ? 'collapsed' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className='title'>Leave Request Form</h1>

      {submitted && (
        <div className={`success-message ${isDarkMode ? 'dark-mode' : ''}`}>
          Your leave request has been submitted successfully!
        </div>
      )}

      <form className={`form ${isDarkMode ? 'dark-mode' : ''}`} onSubmit={handleSubmit}>
        <h1>Leave details</h1>
        <div className="form-group">
          <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <FontAwesomeIcon className='iconnnn' icon={faExchangeAlt} />
            <select
              name="leaveType"
              required
              className={`select-input ${isDarkMode ? 'dark-mode' : ''}`}
              value={leaveType}
              onChange={handleLeaveTypeChange}
            >
              <option value="" disabled>Select Leave Type</option>
              <option value="Congés spéciaux pour raison de famille">Congés spéciaux pour raison de famille</option>
              <option value="Congés de Maternité">Congés de Maternité</option>
              <option value="Congés exceptionnels">Congés exceptionnels</option>
              <option value="Congés de maladie">Congés de maladie</option>
              <option value="Congés pour obligations militaires">Congés pour obligations militaires</option>
              <option value="Congés sans solde">Congés sans solde</option>
              <option value="Congés payés">Congés payés</option>
            </select>
          </div>
        </div>

        {leaveType === 'Congés spéciaux pour raison de famille' && (
          <div className="form-group">
            <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
              <FontAwesomeIcon className='iconnnn' icon={faExchangeAlt} />
              <select name="familyReason" required className={`select-input ${isDarkMode ? 'dark-mode' : ''}`}>
                <option value="" disabled>Select Family Reason</option>
                <option value="Naissance d’un enfant">Naissance d’un enfant</option>
                <option value="Décès d’un conjoint">Décès d’un conjoint</option>
                <option value="Décès d’un père, d’une mère ou d’un fils">Décès d’un père, d’une mère ou d’un fils</option>
                <option value="Décès d’un frère, d’une sœur, d’un petit-fils, d’une petite fille, d’un grand père ou d’une grande mère">
                  Décès d’un frère, d’une sœur, d’un petit-fils, d’une petite fille, d’un grand père ou d’une grande mère
                </option>
                <option value="Mariage du Travailleur">Mariage du Travailleur</option>
                <option value="Mariage d’un enfant">Mariage d’un enfant</option>
                <option value="Circoncision d’un enfant">Circoncision d’un enfant</option>
              </select>
            </div>
          </div>
        )}

        {(leaveType === 'Congés payés' || leaveType === 'Congés sans solde') ? renderAllDayOptions() : renderDateInputs()}

        {allDay === 'All day' && renderDateInputs()}
        {allDay === 'Not all day' && renderSingleDayInputs()}

        <div className="form-group">
          <div className={`input-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <FontAwesomeIcon className='iconnnn' icon={faComment} />
            <textarea
              className={`input ${isDarkMode ? 'dark-mode' : ''}`}
              name="comment"
              placeholder="Comment"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group1">
          <div {...getRootProps()} onChange={(e) => setSupportingdoc(e.target.value)} className={`input-wrapper file-dropzone ${isDarkMode ? 'dark-mode' : ''}`}>
            <input {...getInputProps()} 
            />
            <FontAwesomeIcon className='iconnnn' icon={faPaperclip} />
            <p>Drag and drop a file here, or click to select a file</p>
          </div>
          {supportingdoc && <p className="file-name">Selected file: {supportingdoc.name}</p>}
        </div>


        <div className="form-group">
          <button type="submit" className={`btn-submit ${isDarkMode ? 'dark-mode' : ''}`}>
            <FontAwesomeIcon className='iconnnn' icon={faPaperPlane} />
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequestForm;
