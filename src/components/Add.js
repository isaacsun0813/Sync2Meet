import React, { useState } from 'react';
import '../styling/FormTemp.css'; // Assuming you are using the same CSS file

const Add = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the contact addition
        onClose(); // Close modal after submission
    };

    return ( 
        <div className="form-overlay">
            <div className="formtemp">
                <form onSubmit={handleSubmit}>
                    <div className="back-icon" onClick={onClose}>&times;</div>
                    <h2>Add Contact</h2>
                    <label>Email:</label>
                    <input
                        type="email" // Changed to type="email" for proper validation
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Name:</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};
 
export default Add;
