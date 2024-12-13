import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginModal from '../loginModal/loginModal'; 
import './navbar.css';

const Navbar: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
    // Open and close modal functions
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Check if the user is logged in
    const token = localStorage.getItem('token');

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        navigate('/');  // Redirect to login page
    };

    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-brand">
                    <h2>RecipePlanner</h2>
                </div>
                <div className="navbar-list">
                    <Link to="/explore">Explore</Link>
                    <span>|</span>
                    
                    {/* Conditional rendering based on whether user is logged in */}
                    {token ? (
                        <>
                            <Link to="/my-account">My Account</Link>
                            <span>|</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={openModal}>Login</button>
                            <span>|</span>
                            <Link to="/signup">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
            
            {/* Pass the isOpen prop and onClose handler */}
            <LoginModal isOpen={modalOpen} onClose={closeModal} />
        </div>
    );
};

export default Navbar;
