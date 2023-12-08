import React, { useState, useEffect } from 'react';

const SuccessPopup = ({ trigger }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000); // Popup shows for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return visible ? (
    <div className="success-popup">
      Success!
    </div>
  ) : null;
};

export default SuccessPopup;
