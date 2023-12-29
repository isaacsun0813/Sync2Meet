import React, { useState, useEffect } from 'react';
import '../styling/UserList.css';

const UniqueEmails = ({ onSelectUser, isVisible }) => {
  const [userIds, setUserIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserIds = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod/meeting');
        const data = await response.json();
        setUserIds([...new Set(data)]); 
      } catch (error) {
        console.error('Error fetching user IDs:', error);
      }
      setLoading(false);
    };

    fetchUserIds();
  }, []);

  return (
    <div className="user-list-container">
        <div className="user-list">
          <p>Select User</p>  
          {loading ? (
            <p>Loading...</p>
          ) : (
            userIds.map((userId, index) => (
              <button key={index} onClick={() => onSelectUser(userId)} className="user-button">
                {userId}
              </button>
            ))
          )}
        </div>
    </div>
  );
};

export default UniqueEmails;