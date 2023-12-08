import React from 'react';

const AvailableTimes = ({ times, onClose }) => {
  return (
    <div>
      <button onClick={onClose}>X</button>
      {times.length > 0 ? (
        times.map((time, index) => <div key={index}>{time}</div>)
      ) : (
        <p>No available times found.</p>
      )}
    </div>
  );
};

export default AvailableTimes;
