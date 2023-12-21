// Home.js

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.js';
import Add from './Add.js';
import UniqueEmails from './UniqueEmails.js';
import TimeInput from './TimeInput.js';
import AvailableTimes from './AvailableTimes.js';
import '../styling/Home.css';


const SuccessPopup = ({ message }) => {
    return (
      <div className="success-popup">
        {message}
      </div>
    );
  };

const Home = () => {
    const [loading, setLoading] = useState(false); // Define the loading state here
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showUserEmails, setShowUserEmails] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        // Fetch the signed-in user ID from local storage when the component mounts
        const signedInUserId = localStorage.getItem('signedInUserId');
        if (signedInUserId) {
          setCurrentUser(signedInUserId);
        } else {
          // Handle the case where there is no signed-in user ID
          console.error('No signed-in user ID found in local storage.');
          // Redirect to login or handle accordingly
        }
      }, []);

    const formatDateTimeForDynamoDB = (dateTimeString) => {
        // Convert the ISO date-time string to a format suitable for DynamoDB
        return new Date(dateTimeString).toISOString();
    };

    const syncDatabase = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token available.');
            return;
        }
    
        try {
            console.log('Authorization header:', `Bearer ${accessToken}`);
            const response = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod/auth', {
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
            const events = await response.json();
            // Handle the received data
            console.log(events);
            const formattedEvents = events.map(event => {
                const { creator: { email }, start: { dateTime: startDateTime }, end: { dateTime: endDateTime } } = event;
                localStorage.setItem('signedInUserId', email); //  THIS IS A TEMPORARY FIX. THIS WILL NEED TO BE INSTANTIATED ELSEWHERE
                return {
                    userId: email,
                    start: formatDateTimeForDynamoDB(startDateTime),
                    end: formatDateTimeForDynamoDB(endDateTime)
                };
            });

            const postResponse = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedEvents)
            });

            const postData = await postResponse.json();
            console.log(postData);
            setShowSuccessPopup(true);
            setTimeout(() => {
              setShowSuccessPopup(false); // Hide the popup after 3 seconds
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleAdd = () => {
        setShowAddModal(true); // When button is clicked, show the modal
    };

    const handleClose = () => {
        setShowAddModal(false);
        setShowUserEmails(false);
        setSelectedUser(null);
        setAvailableTimes([]);
      };
    const handleScheduleTime = () => {
        setShowUserEmails(true);
      };

    const handleUserSelection = (userId) => {
        setSelectedUser(userId);
        setShowUserEmails(false);
      };
      const findMeetingTimes = async (timeFrame) => {
    // This assumes you have set the currentUser in local storage upon login.
    if (!selectedUser || !currentUser) {
      alert('No user selected or current user not set.');
      return;
    }
    setLoading(true);
    try {
        console.log(currentUser);
        console.log(selectedUser);
      const response = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod/meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId1: currentUser,
          userId2: selectedUser,
          timeFrame: parseInt(timeFrame, 10)
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAvailableTimes(data);
    } catch (error) {
      console.error('Error finding meeting times:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
        <Navbar />
      <div className="buttons">
        <button onClick={handleAdd}>Add Contact</button>
        <button onClick={handleScheduleTime}>Schedule Time</button>
        <button onClick={syncDatabase}>Sync Database</button>
      </div>
      <div className="centered-content">
        {showAddModal && <Add onClose={handleClose} />}
        {showSuccessPopup && <SuccessPopup message="Success!" />}
        {showUserEmails && <UniqueEmails onSelectUser={handleUserSelection} />}
        {selectedUser && (
          <TimeInput
            userId1={selectedUser}
            onFindTimes={setAvailableTimes}
            findMeetingTimes={findMeetingTimes} // Pass the function as a prop
          />
        )}
        {availableTimes.length > 0 && (
            <AvailableTimes times={availableTimes.map((time, index) => (
                <div key={index} className="available-time">
                <p>Start: {new Date(time.start).toLocaleString()}</p>
                <p>End: {new Date(time.end).toLocaleString()}</p>
                </div>
            ))} onClose={() => setAvailableTimes([])} />
            )}
      </div>
    </div>
  );
  
};
 
export default Home;
