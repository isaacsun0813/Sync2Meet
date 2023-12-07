import { useState } from 'react';
import Navbar from './Navbar.js';
import Add from './Add.js';
import '../styling/Home.css';

const Home = () => {
    const [showAddModal, setShowAddModal] = useState(false); // State to manage the modal display
    const syncDatabase = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token available.');
            return;
        }
    
        try {
            console.log(accessToken);
            const response = await fetch('https://lkfnvbv76h.execute-api.us-east-2.amazonaws.com/Prod/auth', {
                /*
                In the future, if we decide that we want to actually MANIPULATE data too, we would have to first 
                a) create a new resource path in API Gateway (we will have to post information to it)
                b) move this method out of auth. It honestly should not be there but right now I couldn't be bothered to shift it
                */
                method: 'GET', 
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            // Handle the received data
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
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
                <button onClick= {syncDatabase}> Sync Database</button>
            </div>
            {showAddModal && <Add onClose={handleClose} />}
        </div>
    );
}
 
export default Home;
