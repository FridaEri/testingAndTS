import { Link } from 'react-router-dom';
import LoginModal from '../loginModal/loginModal'; 
import './navbar.css';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    // Open and close modal functions
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false); 

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-brand">
                    <h2>RecipePlanner</h2>
                </div>
                <div className="navbar-list">
                    <Link to="/explore">Explore</Link>
                    <span>|</span>
                    <button onClick={openModal}>Login</button>
                    <span>|</span>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
            
            {/* Pass the isOpen prop and onClose handler */}
            <LoginModal isOpen={modalOpen} onClose={closeModal} />
        </div>
    );
};

export default Navbar;
