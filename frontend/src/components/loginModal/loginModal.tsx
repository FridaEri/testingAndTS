import { useState } from 'react'
import './loginModal.css'

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null
    // Handle form submission
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      onClose(); 
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='login-btn'>Login</button>
          </form>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  

export default LoginModal