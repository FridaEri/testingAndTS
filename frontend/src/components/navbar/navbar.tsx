import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar: React.FC = () => 
    {
return (
    <div className="navbar-container">
        <div className="navbar-content">
            <div className="navbar-brand">
                <h2>ReceptPlaneraren</h2>
            </div>
            <div className="navbar-list">
                <Link to="/explore">Utforska</Link>
                <span>|</span>
                <span>|</span>
                <Link to="/signup"> Bli medlem</Link>
            </div>
        </div>
    </div>
)
}
export default Navbar