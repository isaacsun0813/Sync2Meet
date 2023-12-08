// TimeInput.js
import React, { useState } from 'react';

const TimeInput = ({ userId1, onFindTimes, findMeetingTimes }) => {
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!time) {
      alert('Please enter a time frame.');
      return;
    }
    setLoading(true);
    await findMeetingTimes(time); // Call the findMeetingTimes passed as a prop
    setLoading(false);
  };

  return (
    <div>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time in minutes"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Finding...' : 'Submit'}
      </button>
    </div>
  );
};

export default TimeInput;
