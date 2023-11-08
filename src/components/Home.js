import { useState } from 'react';
import Navbar from './Navbar.js';
import Add from './Add.js';
import '../styling/Home.css';

const Home = () => {
    const [showAddModal, setShowAddModal] = useState(false); // State to manage the modal display

    const handleAdd = () => {
        setShowAddModal(true); // When button is clicked, show the modal
    };

    const handleClose = () => {
        setShowAddModal(false); // Function to hide the modal
    }

    return (
        <div className="home">
            <Navbar />
            <div className="buttons">
                <button onClick={handleAdd}>Add Contact</button>
                <button>Sync Contacts</button>
            </div>
            {showAddModal && <Add onClose={handleClose} />}
        </div>
    );
}
 
export default Home;
